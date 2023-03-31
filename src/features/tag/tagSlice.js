import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

const initialState = {
  tag: [],
  isLoaded: false,
};
let headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent": "TRGNHN",
});

export const getTag = createAsyncThunk("tag/getTag", ({ tagName }) => {
  return fetch(
    `https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${tagName}&api_key=${API_KEY}&format=json`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((res) => res.tag);
});

const tagSlice = createSlice({
  name: "tag",
  initialState,
  extraReducers: {
    [getTag.pending]: (state) => {
      state.isLoaded = false;
    },
    [getTag.fulfilled]: (state, action) => {
      state.isLoaded = true;
      state.tag = action.payload;
    },
    [getTag.rejected]: (state) => {
      state.isLoaded = false;
    },
  },
});

export default tagSlice.reducer;
