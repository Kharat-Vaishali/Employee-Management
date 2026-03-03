

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca3"
      );

      return response.data.map((country) => ({
        id: country.cca3,
        name: country.name.common,
      }));

    } catch (error) {
      return rejectWithValue("Failed to fetch countries",error);
    }
  }
);

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default countrySlice.reducer;