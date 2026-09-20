import axios from "axios";
const backUrl = process.env.BACKEND_URL || "http://localhost:8000";
const axiosInstance = axios.create({
    baseURL: backUrl,
    headers: { "Content-Type": "application/json" }
});

// Automatically attach token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careplus_token');
    // console.log("token",token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;