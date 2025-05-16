// movie/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/data/type';
import axiosInstance from '@/lib/axios';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const fetchMovies = createAsyncThunk<Movie[]>(
  'movie/fetchMovies',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get<Movie[]>('movies/');
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Lỗi server');
    }
  }
);

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      });
  },
});

export default movieSlice.reducer;
