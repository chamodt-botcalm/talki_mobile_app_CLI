import axios from 'axios';

const API_BASE_URL = 'http://10.226.59.223:3001'; // Change to your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;