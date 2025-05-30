// store/slices/seatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import { Seat } from "@/data/type";


interface SeatState {
  seats: Seat[];
  selectedSeats: Seat[]; // Danh sách ghế đã chọn
  loading: boolean;
  error: string | null;
}

const initialState: SeatState = {
  seats: [],
  selectedSeats: [],
  loading: false,
  error: null,
};

export const fetchSeats = createAsyncThunk(
  "seats/fetchSeats",
  async (showtimeId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`showtimes/${showtimeId}/seats/`);
      return response.data as Seat[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seats");
    }
  }
);

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSelectedSeats(state, action: PayloadAction<Seat[]>) {
      state.selectedSeats = action.payload;
    },
    clearSelectedSeats(state) {
      state.selectedSeats = [];
    },

    updateSeatsStatusByIds(state, action: PayloadAction<{ ids: number[]; status: "available" | "reserved" | "selected" | "unavailable" }>) {
      const { ids, status } = action.payload;
      state.seats = state.seats.map(seat =>
        ids.includes(seat.id) ? { ...seat, status } : seat
      );
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeats.fulfilled, (state, action: PayloadAction<Seat[]>) => {
        state.loading = false;
        state.seats = action.payload;
        state.selectedSeats = action.payload.filter((seat) => ["selected"].includes(seat.status));
      })
      .addCase(fetchSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedSeats, clearSelectedSeats, updateSeatsStatusByIds } = seatSlice.actions;
export default seatSlice.reducer;
