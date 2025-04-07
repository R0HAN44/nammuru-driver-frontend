import axios, { AxiosInstance } from 'axios';

const cApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_C,
  headers: {
    'Content-Type': 'application/json',
  },
});

const dApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_D,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addToken = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
};

addToken(cApi);
addToken(dApi);

export { cApi, dApi };
