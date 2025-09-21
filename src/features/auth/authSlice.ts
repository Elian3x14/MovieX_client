import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/data/type";
import axiosInstance from "@/lib/axios";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
/**
 * Lấy dữ liệu từ localStorage nếu có (giúp giữ trạng thái đăng nhập khi reload trang)
 */
const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  isAuthenticated: !!storedAccessToken,
  isLoading: false, // lúc khởi tạo thì coi như đã biết trạng thái
};

// Thunk login thường
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/login/", { email, password });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      const userResponse = await axiosInstance.get("/me/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
        user: userResponse.data as User,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

// Thunk login với Google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (code: string, { rejectWithValue }) => {
    try {
      // Gửi code cho backend để backend lấy token và trả user
      const response = await axiosInstance.post("/auth/google/exchange/", {
        code,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      const userResponse = await axiosInstance.get("/me/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
        user: userResponse.data as User,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      return rejectWithValue("Google login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login thường
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isLoading = false;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })

      // login bằng Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isLoading = false;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
