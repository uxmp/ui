import axios from 'axios';

const url = 'http://localhost:8888/common/';

export default {
  login(credentials) {
    return axios
      .post(url + 'login', credentials)
      .then(response => response.data);
  },
  logout(callback) {
    return axios
      .post(url + 'logout')
      .then(callback);
  },
};