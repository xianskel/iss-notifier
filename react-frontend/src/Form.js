import React from "react";
import { geolocated } from "react-geolocated";
import formatcoords from "formatcoords";
import PathInfo from "./PathInfo";
import { Input, Button, Icon } from "semantic-ui-react";
import * as EmailValidator from "email-validator";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      successMessage: "",
      isSubscribing: false,
      isDeleting: false,
      email: null
    };
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is disabled on your browser</div>
    ) : this.props.coords ? (
      <div>
        <div className="error">{this.state.errorMessage}</div>
        <div className="success">{this.state.successMessage}</div>
        <Input
          type="email"
          fluid
          size="mini"
          placeholder="Email"
          onChange={this.handleFormChange}
        />
        <Button.Group>
          <Button
            loading={this.state.isDeleting}
            disabled={this.state.isDeleting || this.state.isSubscribing}
            onClick={this.deleteSubscription}
          >
            <Icon name="trash" />
            Unsubscribe
          </Button>
          <Button.Or />
          <Button
            color="teal"
            loading={this.state.isSubscribing}
            disabled={this.state.isSubscribing || this.state.isDeleting}
            onClick={this.createSubscription}
          >
            <Icon name="paper plane" />
            Subscribe
          </Button>
        </Button.Group>
        <div style={{ margin: "15px" }}>
          Your are at{" "}
          {formatcoords(
            this.props.coords.latitude,
            this.props.coords.longitude
          ).format()}
        </div>
        <PathInfo
          lat={this.props.coords.latitude}
          lon={this.props.coords.longitude}
        ></PathInfo>
      </div>
    ) : (
      <div>Fetching the location data&hellip; </div>
    );
  }

  handleFormChange = input => {
    this.setState({ ...this.state, email: input.target.value });
  };

  createSubscription = () => {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid email!",
        successMessage: ""
      });
      return;
    }
    this.setState({ ...this.state, isSubscribing: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        lat: this.props.coords.latitude,
        lon: this.props.coords.longitude
      })
    };
    fetch("http://localhost:8080/subscription", requestOptions)
      .then(res => {
        this.setState({
          ...this.state,
          successMessage: "Successfully subscribed to email notifications!",
          errorMessage: "",
          isSubscribing: false
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          successMessage: "",
          errorMessage: "Could not create subscription!",
          isSubscribing: false
        });
      });
  };

  deleteSubscription = () => {
    if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        ...this.state,
        errorMessage: "Invalid email!",
        successMessage: ""
      });
      return;
    }
    this.setState({ ...this.state, isDeleting: true });
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        lat: this.props.coords.latitude,
        lon: this.props.coords.longitude
      })
    };
    fetch("http://localhost:8080/subscription", requestOptions)
      .then(res => {
        this.setState({
          ...this.state,
          successMessage: "Success removed email subscription!",
          errorMessage: "",
          isDeleting: false
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          successMessage: "",
          errorMessage: "Could not remove subscription!",
          isDeleting: false
        });
      });
  };
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Form);
