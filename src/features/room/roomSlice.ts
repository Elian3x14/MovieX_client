// features/room/roomSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "@/data/type";
import {
  fetchAllRoomsAPI,
  fetchRoomByIdAPI,
  createRoomAPI,
  updateRoomAPI,
  deleteRoomAPI,
} from "./roomAPI";
import { RoomFormValues } from "@/schemas/roomSchema";

interface RoomState {
  rooms: Record<number, Room>;
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: {},
  loading: false,
  error: null,
};

// FETCH ALL
export const fetchRooms = createAsyncThunk<Room[]>(
  "room/fetchRooms",
  async (_, thunkAPI) => {
    try {
      return await fetchAllRoomsAPI();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Lỗi khi tải danh sách phòng");
    }
  }
);

// FETCH ONE
export const fetchRoomById = createAsyncThunk<Room, number>(
  "room/fetchRoomById",
  async (id, thunkAPI) => {
    try {
      return await fetchRoomByIdAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không tìm thấy phòng");
    }
  }
);

// CREATE
export const createRoom = createAsyncThunk<Room, RoomFormValues>(
  "room/createRoom",
  async (data, thunkAPI) => {
    try {
      return await createRoomAPI(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể tạo phòng");
    }
  }
);

// UPDATE
export const updateRoom = createAsyncThunk<Room, { id: number; data: Partial<RoomFormValues> }>(
  "room/updateRoom",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateRoomAPI(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể cập nhật phòng");
    }
  }
);

// DELETE
export const deleteRoom = createAsyncThunk<void, number>(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      await deleteRoomAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể xóa phòng");
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false;
        state.rooms = {};
        action.payload.forEach((room) => {
          state.rooms[room.id] = room;
        });
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchRoomById.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms[action.payload.id] = action.payload;
      })

      // CREATE
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms[action.payload.id] = action.payload;
      })

      // UPDATE
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms[action.payload.id] = action.payload;
      })

      // DELETE
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        delete state.rooms[deletedId];
      });
  },
});

export default roomSlice.reducer;
