import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../lib/axios';
import { useNavigate } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthorized: (requiredRole: string) => boolean;
}

// Tạo context mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider để bọc các component con
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage khi ứng dụng khởi chạy
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });

      const loggedInUser = response.data.user;
      const token = response.data.token;

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      setIsAuthenticated(true);

      // Điều hướng sau khi đăng nhập thành công
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Kiểm tra quyền của người dùng
  const isAuthorized = (requiredRole: string): boolean => {
    return user?.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};