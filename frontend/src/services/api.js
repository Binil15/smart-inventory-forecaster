import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://smart-inventory-forecaster.onrender.com/api",
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - the server took too long to respond.';
    }
    return Promise.reject(error);
  }
);

export default api;
