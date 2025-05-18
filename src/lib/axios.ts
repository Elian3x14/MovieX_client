import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface JwtPayload {
  exp: number;
}

// Hàm kiểm tra token còn hạn hay không
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000); // tính theo giây
    return decoded.exp < now;
  } catch (err) {
    return true; // nếu lỗi thì xem như hết hạn
  }
}

// Hàm refresh access token
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}token/refresh/`,
      { refresh: refreshToken }
    );
    const newAccessToken = res.data.access;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return null;
  }
}

// Interceptor request
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken && isTokenExpired(accessToken)) {
      accessToken = await refreshAccessToken();
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response – fallback nếu token hết hạn mà không phát hiện ở request
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
