import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

const initialState = {
  songChart: [],
  isLoaded: false,
};
let headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent": "TRGNHN",
});

export const getSongChart = createAsyncThunk(
  "song/getSongChart",
  ({ tagName, artistName, n }) => {
    let url = "";
    if (tagName) {
      url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=${API_KEY}&format=json`;
    } else if (artistName) {
      url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json`;
    } else {
      url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json`;
    }

    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (artistName) {
          return res.toptracks.track.slice(0, n);
        }
        return res.tracks.track.slice(0, n);
      });
  }
);

const songSlice = createSlice({
  name: "song",
  initialState,
  extraReducers: {
    [getSongChart.pending]: (state) => {
      state.isLoaded = false;
    },
    [getSongChart.fulfilled]: (state, action) => {
      state.isLoaded = true;
      state.songChart = action.payload;
    },
    [getSongChart.rejected]: (state) => {
      state.isLoaded = false;
    },
  },
});

export default songSlice.reducer;
