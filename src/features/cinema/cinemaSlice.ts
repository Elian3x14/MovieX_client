import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { Cinema } from "@/data/type";

interface CinemaState {
  cinemas: Record<number, Cinema>; // lưu dưới dạng object để dễ truy cập theo ID
  loading: boolean;
  error: string | null;
}

const initialState: CinemaState = {
  cinemas: {},
  loading: false,
  error: null,
};

// Thunk để fetch danh sách rạp chiếu
export const fetchCinemas = createAsyncThunk(
  "cinemas/fetchCinemas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cinemas/");
      return response.data as Cinema[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cinemas");
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinemas",
  initialState,
  reducers: {
    // Nếu cần thêm reducer nội bộ, có thể thêm ở đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action: PayloadAction<Cinema[]>) => {
        state.loading = false;
        state.error = null;
        state.cinemas = {};
        action.payload.forEach((cinema) => {
          state.cinemas[cinema.id] = cinema;
        });
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cinemaSlice.reducer;
