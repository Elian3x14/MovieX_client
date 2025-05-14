import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com', // URL gốc của API
  timeout: 10_000, // Thời gian chờ request (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor cho request để thêm token nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Xử lý lỗi từ API (status code không phải 2xx)
      console.error('API Error:', error.response.data.message || error.response.statusText);
    } else if (error.request) {
      // Xử lý lỗi không nhận được phản hồi từ server
      console.error('No response received:', error.request);
    } else {
      // Xử lý lỗi khác
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;