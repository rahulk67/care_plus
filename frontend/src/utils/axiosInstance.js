import axios from "axios";
const backUrl = process.env.REACT_APP_BACKEND_URL || "https://care-plus-backend-alpha.vercel.app";
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