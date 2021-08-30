const url = import.meta.env.VITE_API_URL + 'common/';

export default {
  login(credentials) {
    return fetch(
      url + 'login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      }
    ).then(response => response.json());
  },
  logout(callback) {
    return fetch(
      url + 'logout', {
        method: 'POST'
      }
    ).then(callback);
  },
};