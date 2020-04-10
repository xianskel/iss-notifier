import axios from "axios";

const BASE_URL = "http://api.open-notify.org/iss-pass.json?";

export default class ISSApi {
  fetch(coordinates) {
    return axios.get(`${BASE_URL}`, {
      params: coordinates
    });
  }
}
