import axios from 'axios';

const url = import.meta.env.VITE_API_URL + 'common/';

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