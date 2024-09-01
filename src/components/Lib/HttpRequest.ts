import axios, { InternalAxiosRequestConfig } from 'axios';
import Router from './Router'
import {useUserStore} from "../Store/UserStore";

const HttpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL.toString(),
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

HttpRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();

    let token = userStore.token;

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpRequest.interceptors.response.use(
  response => { return response},
  error => {
    let path;
    switch (error.response.status) {
      case 401: path = '/login'; break;
      case 403: path = '/login'; break;
      default: path = null;
    }
    if (path !== null) {
      Router.push(path);
    }
    return Promise.reject(error);
  }
);

export default HttpRequest;
