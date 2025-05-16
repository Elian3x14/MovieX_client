// movie/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/data/type';
import axiosInstance from '@/lib/axios';

interface MovieState {
  movies: Record<string, Movie>;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: {},      // Đổi từ array sang object để truy cập theo id nhanh hơn
  loading: false,
  error: null,
};

// Lấy tất cả movies
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

// Lấy movie theo ID
export const fetchMovieById = createAsyncThunk<Movie, string>(
  'movie/fetchMovieById',
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get<Movie>(`movies/${id}/`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Không tìm thấy phim');
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL MOVIES
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = {};
        action.payload.forEach(movie => {
          state.movies[movie.id] = movie;
        });
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Đã xảy ra lỗi';
      })

      // FETCH MOVIE BY ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
        const movie = action.payload;
        state.movies[movie.id] = movie;
        state.loading = false;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không tìm thấy phim';
      });
  },
});

export default movieSlice.reducer;
