import axios from 'axios';
import {TOKEN} from "../context/SignInContext.jsx";

console.log(import.meta.env.VITE_BACKEND_URL)

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem(TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem(TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
