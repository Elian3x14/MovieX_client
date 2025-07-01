// store/slices/seatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShowtimeSeat } from "@/data/type";
import { fetchSeatsByShowtime } from "@/features/seat/seatAPI";

interface SeatState {
  seats: ShowtimeSeat[];
  selectedSeats: ShowtimeSeat[];
  loading: boolean;
  error: string | null;
}

const initialState: SeatState = {
  seats: [],
  selectedSeats: [],
  loading: false,
  error: null,
};

export const fetchShowtimeSeats = createAsyncThunk(
  "seats/fetchSeats",
  async (showtimeId: string, { rejectWithValue }) => {
    try {
      const data = await fetchSeatsByShowtime(showtimeId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seats");
    }
  }
);

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSelectedSeats(state, action: PayloadAction<ShowtimeSeat[]>) {
      state.selectedSeats = action.payload;
    },
    clearSelectedSeats(state) {
      state.selectedSeats = [];
    },
    updateSeatsStatusByIds(state, action: PayloadAction<{ ids: number[]; status: ShowtimeSeat["status"] }>) {
      const { ids, status } = action.payload;
      state.seats = state.seats.map(seat =>
        ids.includes(seat.id) ? { ...seat, status } : seat
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimeSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeSeats.fulfilled, (state, action: PayloadAction<ShowtimeSeat[]>) => {
        state.loading = false;
        state.seats = action.payload;
        state.selectedSeats = action.payload.filter(seat => seat.status === "selected");
      })
      .addCase(fetchShowtimeSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedSeats,
  clearSelectedSeats,
  updateSeatsStatusByIds,
} = seatSlice.actions;

export default seatSlice.reducer;
