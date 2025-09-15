// movie/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/data/type';
import axiosInstance from '@/lib/axios';
import { MovieFormValues } from '@/schemas/movieSchema';
import { createMovieAPI, deleteMovieAPI, fetchAllMoviesAPI, fetchMovieByIdAPI, updateMovieAPI } from './movieAPI';

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

export const fetchMovies = createAsyncThunk<Movie[]>(
  "movie/fetchMovies",
  async (_, thunkAPI) => {
    try {
      return await fetchAllMoviesAPI();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Lỗi server");
    }
  }
);

export const fetchMovieById = createAsyncThunk<Movie, string>(
  "movie/fetchMovieById",
  async (id, thunkAPI) => {
    try {
      return await fetchMovieByIdAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không tìm thấy phim");
    }
  }
);

export const createMovie = createAsyncThunk<Movie, MovieFormValues>(
  "movie/createMovie",
  async (movieData, thunkAPI) => {
    try {
      return await createMovieAPI(movieData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể tạo phim mới");
    }
  }
);

export const updateMovie = createAsyncThunk<Movie, { id: string; data: MovieFormValues }>(
  "movie/updateMovie",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateMovieAPI(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể cập nhật phim");
    }
  }
);

// Xóa phim không cần tạo thunk riêng vì không cần quản lý state, chỉ cần gọi API
export const deleteMovie = createAsyncThunk<void, string>(
  "movie/deleteMovie",
  async (id, thunkAPI) => {
    try {
      await deleteMovieAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể xóa phim");
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
      })

      // CREATE MOVIE
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        const newMovie = action.payload;
        state.movies[newMovie.id] = newMovie;
        state.loading = false;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không thể tạo phim mới';
      })
      // UPDATE MOVIE
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        const updatedMovie = action.payload;
        state.movies[updatedMovie.id] = updatedMovie;
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không thể cập nhật phim';
      })
      // DELETE MOVIE
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const movieId = action.meta.arg; // Lấy id từ arg của action
        delete state.movies[movieId]; // Xóa phim khỏi state
        state.loading = false;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không thể xóa phim'
      });
  },
});

export default movieSlice.reducer;
