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

// Interceptor để xử lý lỗi 401 và tự refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu là lỗi 401 và chưa từng retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem('access', newAccessToken);

          // Gắn token mới vào request gốc
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // gửi lại request
        } catch (refreshError) {
          // Refresh token hết hạn → logout
          localStorage.removeItem('access');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // chuyển về trang login
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;