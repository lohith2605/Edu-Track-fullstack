import axios from 'axios';
import { API_BASE } from './theme';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('et_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
