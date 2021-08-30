import ServerRequest from "../Lib/ServerRequest";

export default {
  login(credentials) {
    return ServerRequest.request(
      'common/login',
      'POST',
      credentials
    ).then(response => response.json());
  },
  logout(callback) {
    ServerRequest.request(
      'common/logout',
      'POST'
    ).then(callback());
  },
};