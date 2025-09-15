// src/features/showtime/showtimeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShowtimesByMovieId, fetchShowtimeById } from "./showtimeAPI";
import { Showtime } from "@/data/type";
import { RootState } from "@/app/store";

interface ShowtimeState {
  data: { [movieId: string]: Showtime[] };
  selectedShowtime: Showtime | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShowtimeState = {
  data: {},
  selectedShowtime: null,
  loading: false,
  error: null,
};

export const fetchShowtimes = createAsyncThunk(
  "showtime/fetchShowtimes",
  async (movieId: string) => {
    const result = await fetchShowtimesByMovieId(movieId);
    return { movieId, showtimes: result };
  }
);

export const fetchShowtime = createAsyncThunk(
  "showtime/fetchShowtime",
  async (showtimeId: string) => {
    const result = await fetchShowtimeById(showtimeId);
    return result;
  }
);

const showtimeSlice = createSlice({
  name: "showtime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        const { movieId, showtimes } = action.payload;
        state.data[movieId] = showtimes;
        state.loading = false;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch showtimes";
      })

      // Handle fetching a single showtime
      .addCase(fetchShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedShowtime = null;
      })
      .addCase(fetchShowtime.fulfilled, (state, action) => {
        state.selectedShowtime = action.payload;
        state.loading = false;
      })
      .addCase(fetchShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch showtime";
      });
  },
});

export const selectShowtimesByMovieId = (state: RootState, movieId: string) =>
  state.showtime.data[movieId] || [];

export const selectSelectedShowtime = (state: RootState) =>
  state.showtime.selectedShowtime;

export const selectShowtimeLoading = (state: RootState) =>
  state.showtime.loading;

export default showtimeSlice.reducer;
