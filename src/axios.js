import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004/',
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default api;
