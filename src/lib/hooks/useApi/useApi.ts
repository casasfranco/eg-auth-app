import axios, { AxiosRequestConfig } from 'axios';
import config from '../../../config';

interface Options extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

const getHeaders = (options: Options = {}, secure = false) => {
  const headers = { ...options.headers };
  if (secure) {
    const token = sessionStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const api = {
  get: (path: string, options: Options = {}) =>
    axios.get(config.api.baseUrl + path, {
      ...options,
      headers: getHeaders(options),
    }),
  post: (path: string, body: any, options: Options = {}) =>
    axios.post(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  put: (path: string, body: any, options: Options = {}) =>
    axios.put(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  patch: (path: string, body: any, options: Options = {}) =>
    axios.patch(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  delete: (path: string, options: Options = {}) =>
    axios.delete(config.api.baseUrl + path, {
      ...options,
      headers: getHeaders(options),
    }),
};

const secureApi = {
  get: (path: string, options: Options = {}) =>
    api.get('/' + path, {
      ...options,
      headers: getHeaders(options, true),
    }),
  post: (path: string, body: any, options: Options = {}) =>
    api.post('/' + path, body, {
      ...options,
      headers: getHeaders(options, true),
    }),
  put: (path: string, body: any, options: Options = {}) =>
    api.put('/' + path, body, {
      ...options,
      headers: getHeaders(options, true),
    }),
  patch: (path: string, body: any, options: Options = {}) =>
    api.patch('/' + path, body, {
      ...options,
      headers: getHeaders(options, true),
    }),
  delete: (path: string, options: Options = {}) =>
    api.delete('/' + path, {
      ...options,
      headers: getHeaders(options, true),
    }),
};

const useApi = () => api;

export { api, secureApi, useApi };
