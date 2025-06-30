import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cinema } from "@/data/type";
import {
  fetchAllCinemasAPI,
  fetchCinemaByIdAPI,
  createCinemaAPI,
  updateCinemaAPI,
  deleteCinemaAPI,
} from "./cinemaAPI";
import { CinemaFormValues } from "@/schemas/cinemaSchema";

interface CinemaState {
  cinemas: Record<number, Cinema>;
  loading: boolean;
  error: string | null;
}

const initialState: CinemaState = {
  cinemas: {},
  loading: false,
  error: null,
};

// FETCH ALL
export const fetchCinemas = createAsyncThunk<Cinema[]>(
  "cinema/fetchCinemas",
  async (_, thunkAPI) => {
    try {
      return await fetchAllCinemasAPI();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Lỗi khi tải danh sách rạp");
    }
  }
);

// FETCH ONE
export const fetchCinemaById = createAsyncThunk<Cinema, number>(
  "cinema/fetchCinemaById",
  async (id, thunkAPI) => {
    try {
      return await fetchCinemaByIdAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không tìm thấy rạp");
    }
  }
);

// CREATE
export const createCinema = createAsyncThunk<Cinema, CinemaFormValues>(
  "cinema/createCinema",
  async (data, thunkAPI) => {
    try {
      return await createCinemaAPI(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể tạo rạp");
    }
  }
);

// UPDATE
export const updateCinema = createAsyncThunk<Cinema, { id: number; data: Partial<CinemaFormValues> }>(
  "cinema/updateCinema",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateCinemaAPI(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể cập nhật rạp");
    }
  }
);

// DELETE
export const deleteCinema = createAsyncThunk<void, number>(
  "cinema/deleteCinema",
  async (id, thunkAPI) => {
    try {
      await deleteCinemaAPI(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Không thể xóa rạp");
    }
  }
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action: PayloadAction<Cinema[]>) => {
        state.loading = false;
        state.cinemas = {};
        action.payload.forEach((cinema) => {
          state.cinemas[cinema.id] = cinema;
        });
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchCinemaById.fulfilled, (state, action: PayloadAction<Cinema>) => {
        state.cinemas[action.payload.id] = action.payload;
      })

      // CREATE
      .addCase(createCinema.fulfilled, (state, action: PayloadAction<Cinema>) => {
        state.cinemas[action.payload.id] = action.payload;
      })

      // UPDATE
      .addCase(updateCinema.fulfilled, (state, action: PayloadAction<Cinema>) => {
        state.cinemas[action.payload.id] = action.payload;
      })

      // DELETE
      .addCase(deleteCinema.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        delete state.cinemas[deletedId];
      });
  },
});

export default cinemaSlice.reducer;
