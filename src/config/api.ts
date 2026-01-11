import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT_MS } from './env';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
