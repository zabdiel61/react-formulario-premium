import axios from 'axios';

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:9090/api-felsv';
// axios.defaults.baseURL = 'http://172.17.72.100:8081/api-felsv';
// axios.defaults.baseURL = 'http://172.19.71.200:8081/api-felsv';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== 'null') {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};
