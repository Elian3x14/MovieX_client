import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SeatType } from "@/data/type"; 
import { fetchAllSeatTypesAPI } from "@/features/seatType/seatTypeAPI";

interface SeatTypeState {
  seatTypes: SeatType[];
  loading: boolean;
  error: string | null;
}

const initialState: SeatTypeState = {
  seatTypes: [],
  loading: false,
  error: null,
};

export const fetchAllSeatTypes = createAsyncThunk(
  "seatTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllSeatTypesAPI();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seat types");
    }
  }
);

const seatTypeSlice = createSlice({
  name: "seatTypes",
  initialState,
  reducers: {
    // Nếu bạn muốn thêm các xử lý nội bộ, thêm tại đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSeatTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSeatTypes.fulfilled, (state, action: PayloadAction<SeatType[]>) => {
        state.loading = false;
        state.seatTypes = action.payload;
      })
      .addCase(fetchAllSeatTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default seatTypeSlice.reducer;
