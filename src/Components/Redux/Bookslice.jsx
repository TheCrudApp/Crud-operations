import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState={
  data: [],
  isloading: false,
};

// thunk لجلب الكتب
// eslint-disable-next-line react-refresh/only-export-components
export const getbooks = createAsyncThunk(
  "getbooks/Books",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        "https://6734e6385995834c8a914b17.mockapi.io/api/v1/Books"
      );
      return response.data;
    } catch (error) {
        if(error instanceof Error){
                 return rejectWithValue(error.message);
        }
 
    }
  }
);

// slice
export const Bookslice = createSlice({
  name: "Book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getbooks.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getbooks.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });
    builder.addCase(getbooks.rejected, (state) => {
      state.isloading = false;
    });
  },
});

export default Bookslice.reducer;

