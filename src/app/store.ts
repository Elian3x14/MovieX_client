import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';
import reviewReducer from '../features/review/reviewSlice';
import seatReducer from '../features/seat/seatSlice';
import cinemaReducer from '../features/cinema/cinemaSlice';
import roomReducer from '../features/room/roomSlice';
import seatTypeReducer from '../features/seatType/seatTypeSlice'; 

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    showtime: showtimeReducer,
    review: reviewReducer,
    seat: seatReducer,
    cinema: cinemaReducer,
    room: roomReducer,
    seatType: seatTypeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
