import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  isloading: false,
  selectedBook: null,
};

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
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteBook = createAsyncThunk(
  "deleteBook/Books",
  async (bookID, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `https://6734e6385995834c8a914b17.mockapi.io/api/v1/Books/${bookID}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const Bookslice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    viewBook: (state, action) => {
      const bookId = action.payload;
      state.selectedBook = state.data.find(book => book.id === bookId) || null;
    },
  },
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

    builder.addCase(deleteBook.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = state.data.filter(book => book.id !== action.payload.id);
      toast.success("Book deleted successfully");
    });
    builder.addCase(deleteBook.rejected, (state) => {
      state.isloading = false;
    });
  },
});

export const { viewBook } = Bookslice.actions;

export default Bookslice.reducer;
