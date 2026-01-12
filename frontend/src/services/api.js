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
  
  // Debug logging
  console.log("API Request:", {
    method: config.method?.toUpperCase(),
    url: config.url,
    baseURL: config.baseURL,
    fullURL: `${config.baseURL}${config.url}`,
    headers: config.headers,
    origin: window.location.origin
  });
  
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error("API Error Interceptor:", {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      } : null,
      request: error.request ? {
        status: error.request.status,
        readyState: error.request.readyState
      } : null,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL
      } : null
    });
    
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - the server took too long to respond.';
    }
    return Promise.reject(error);
  }
);

export default api;
