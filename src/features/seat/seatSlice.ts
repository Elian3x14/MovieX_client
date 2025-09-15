// store/slices/seatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RoomSeat, ShowtimeSeat } from "@/data/type";
import { fetchSeatsByShowtimeAPI } from "@/features/seat/seatAPI";

interface SeatState {
  showtimeSeats: ShowtimeSeat[];
  roomSeats: Record<number, RoomSeat[]>;
  selectedSeats: ShowtimeSeat[];
  loading: boolean;
  error: string | null;
}

const initialState: SeatState = {
  showtimeSeats: [],
  roomSeats: {},
  selectedSeats: [],
  loading: false,
  error: null,
};

export const fetchShowtimeSeats = createAsyncThunk(
  "seats/fetchSeats",
  async (showtimeId: string, { rejectWithValue }) => {
    try {
      const data = await fetchSeatsByShowtimeAPI(showtimeId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seats");
    }
  }
);

export const fetchRoomSeats = createAsyncThunk(
  "seats/fetchRoomSeats",
  async (roomId: number, { rejectWithValue }) => {
    try {
      const response = await fetchSeatsByShowtimeAPI(roomId.toString());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch room seats");
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
      state.showtimeSeats = state.showtimeSeats.map(seat =>
        ids.includes(seat.id) ? { ...seat, status } : seat
      );
    }
  },
  extraReducers: (builder) => {
    builder
    // Fetch showtime seats
      .addCase(fetchShowtimeSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeSeats.fulfilled, (state, action: PayloadAction<ShowtimeSeat[]>) => {
        state.loading = false;
        state.showtimeSeats = action.payload;
        state.selectedSeats = action.payload.filter(seat => seat.status === "selected");
      })
      .addCase(fetchShowtimeSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const {
  setSelectedSeats,
  clearSelectedSeats,
  updateSeatsStatusByIds,
} = seatSlice.actions;

export default seatSlice.reducer;
