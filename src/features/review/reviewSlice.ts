// review/reviewSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import { Review } from '@/data/type';

interface PaginatedReviewResponse {
  count: number;
  results: Review[];
}

interface ReviewState {
  reviews: Record<string, Review[]>; // Mỗi movieId sẽ có một mảng review riêng
  totalPages: Record<string, number>; // Tổng số trang cho từng movieId
  loading: boolean;
  error: string | null;
}

const PAGE_SIZE = 3;

const initialState: ReviewState = {
  reviews: {},
  totalPages: {},
  loading: false,
  error: null,
};

// Async thunk: Lấy review theo movieId và page
export const fetchReviewsByMovieId = createAsyncThunk<
  { movieId: string; reviews: Review[]; totalPages: number },
  { movieId: string; page: number },
  { rejectValue: string }
>('review/fetchReviewsByMovieId', async ({ movieId, page }, thunkAPI) => {
  try {
    const res = await axiosInstance.get<PaginatedReviewResponse>(
      `/movies/${movieId}/reviews/?page=${page}&page_size=${PAGE_SIZE}`
    );
    return {
      movieId,
      reviews: res.data.results,
      totalPages: Math.ceil(res.data.count / PAGE_SIZE),
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || 'Lỗi khi tải đánh giá'
    );
  }
});

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByMovieId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviewsByMovieId.fulfilled,
        (
          state,
          action: PayloadAction<{
            movieId: string;
            reviews: Review[];
            totalPages: number;
          }>
        ) => {
          const { movieId, reviews, totalPages } = action.payload;
          state.reviews[movieId] = reviews;
          state.totalPages[movieId] = totalPages;
          state.loading = false;
        }
      )
      .addCase(fetchReviewsByMovieId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải đánh giá';
      });
  },
});

export default reviewSlice.reducer;
