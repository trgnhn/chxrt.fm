import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

const initialState = {
  albums: [],
};

let headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent": "TRGNHN",
});

export const getAlbums = createAsyncThunk(
  "album/getAlbums",
  ({ artistName, tagName, n = 1 }) => {
    let url = "";
    if (tagName) {
      url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tagName}&api_key=${API_KEY}&format=json`;
    }
    if (artistName) {
      url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${API_KEY}&format=json`;
    }
    console.log(url);
    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (tagName) {
          return res.albums.album.slice(0, n);
        } else {
          return res.topalbums.album.slice(0, n);
        }
      });
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: {
    [getAlbums.fulfilled]: (state, action) => {
      console.log(action);
      state.albums = action.payload;
    },
  },
});

export default albumSlice.reducer;
