import axios from 'axios';
import store from './Store'
import Router from './Router'

const HttpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL.toString(),
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

HttpRequest.interceptors.request.use(
  (config) => {
    let token = store.getters['authStorage/getToken'];

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpRequest.interceptors.response.use(null, error => {
  let path;
  switch (error.response.status) {
    case 401: path = '/login'; break;
    case 403: path = '/login'; break;
    default: path = '/login';
  }
  Router.push(path);
  return Promise.reject(error);
});

export default HttpRequest;