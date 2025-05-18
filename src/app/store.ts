import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';
import reviewReducer from '../features/review/reviewSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    showtime: showtimeReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
