import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    showtime: showtimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
