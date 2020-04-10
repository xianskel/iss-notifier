import React from "react";
import * as moment from "moment";
import { Button, Icon } from "semantic-ui-react";

class PathInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isFetching: false,
      data: []
    };
  }
  render() {
    return this.state.isLoaded ? (
      <div>
        <h4>The ISS will next pass your location on:</h4>
        {this.state.data.map((pass, i) => (
          <div className="passes" key={i}>
            {this.formatDate(pass.risetime)} Duration:{" "}
            {this.formatDuration(pass.duration)}
          </div>
        ))}
      </div>
    ) : (
      <Button
        size="small"
        color="blue"
        onClick={this.getData}
        loading={this.state.isFetching}
        disabled={this.state.isFetching}
      >
        <Icon name="compass" />
        Get Location Pass Info
      </Button>
    );
  }

  formatDuration(milli) {
    var duration = parseInt(milli);
    return `${Math.floor(duration / 60)} mins, ${duration % 66} secs`;
  }

  formatDate(milli) {
    var date = moment.unix(parseInt(milli));
    return date.format("MMMM Do YYYY, h:mm:ss a");
  }

  getData = () => {
    this.setState({ ...this.state, isFetching: true });
    fetch(
      `http://localhost:8080/iss?lat=${this.props.lat}&lon=${this.props.lon}`
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result.passes);
          this.setState({
            isLoaded: true,
            isFetching: false,
            data: result.passes
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            isFetching: false,
            error
          });
        }
      );
  };
}

export default PathInfo;
