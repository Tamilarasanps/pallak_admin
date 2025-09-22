// src/utils/axiosInstance.js
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://pallaku-backend.onrender.com/api",
  withCredentials: true,
});

// Automatically attach token to every request
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
