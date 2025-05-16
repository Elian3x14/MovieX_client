import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import movieReducer from '../features/movie/movieSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
