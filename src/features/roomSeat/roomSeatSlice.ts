// roomSeat/roomSeatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RoomSeat, Seat } from '@/data/type';
import { fetchSeatsByRoomAPI, updateSeatsByRoomAPI } from './roomSeatAPI';

interface RoomSeatState {
  roomSeats: Record<string, Record<number, RoomSeat>>; 
  loading: boolean;
  error: string | null;
}

const initialState: RoomSeatState = {
  roomSeats: {},
  loading: false,
  error: null,
};

// Lấy danh sách ghế theo roomId
export const fetchSeatsByRoom = createAsyncThunk<RoomSeat[], string>(
  'roomSeat/fetchSeatsByRoom',
  async (roomId, thunkAPI) => {
    try {
      return await fetchSeatsByRoomAPI(roomId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Không thể lấy danh sách ghế');
    }
  }
);

// Cập nhật danh sách ghế của phòng
export const updateSeatsByRoom = createAsyncThunk<RoomSeat[], { roomId: string; seats: Seat[] }>(
  'roomSeat/updateSeatsByRoom',
  async ({ roomId, seats }, thunkAPI) => {
    try {
      return await updateSeatsByRoomAPI(roomId, seats);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Không thể cập nhật ghế');
    }
  }
);

const roomSeatSlice = createSlice({
  name: 'roomSeat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch seats
      .addCase(fetchSeatsByRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatsByRoom.fulfilled, (state, action) => {
        const roomId = action.meta.arg;
        const seatsById: Record<number, RoomSeat> = {};
        action.payload.forEach(seat => {
          seatsById[seat.id] = seat;
        });
        state.roomSeats[roomId] = seatsById;
        state.loading = false;
      })
      .addCase(fetchSeatsByRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không thể lấy danh sách ghế';
      })

      // Update seats
      .addCase(updateSeatsByRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeatsByRoom.fulfilled, (state, action) => {
        const roomId = action.meta.arg.roomId;
        const updatedSeats: Record<number, RoomSeat> = {};
        action.payload.forEach(seat => {
          updatedSeats[seat.id] = seat;
        });
        state.roomSeats[roomId] = {
          ...state.roomSeats[roomId],
          ...updatedSeats,
        };
        state.loading = false;
      })
      .addCase(updateSeatsByRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Không thể cập nhật ghế';
      });
  },
});

export default roomSeatSlice.reducer;
