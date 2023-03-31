import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

const initialState = {
  artist: [],
  isLoaded: false,
  topArtists: [],
  artistSearches: [],
};

let headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent": "TRGNHN",
});

export const getArtist = createAsyncThunk(
  "artist/getArist",
  ({ artistName }) => {
    let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`;

    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => res.artist);
  }
);

export const getTopArtists = createAsyncThunk(
  "artist/getTopArtists",
  ({ n }) => {
    let url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json`;

    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => res.artists.artist)
      .then((res) => res.sort((a, b) => b.playcount - a.playcount))
      .then((res) => res.slice(0, n));
  }
);

export const searchArtists = createAsyncThunk(
  "artist/searchArtists",
  ({ artistName }) => {
    return fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${API_KEY}&format=json`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((res) =>
        res.results.artistmatches.artist
          .filter((arist) => !arist.name.includes("&"))
          .filter((arist) => arist.name.length < 20)
          .slice(0, 6)
      );
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.artistSearches = [];
    },
  },
  extraReducers: {
    [getArtist.pending]: (state) => {
      state.isLoaded = false;
    },
    [getArtist.fulfilled]: (state, action) => {
      state.isLoaded = true;
      state.artist = action.payload;
    },
    [getArtist.rejected]: (state) => {
      state.isLoaded = false;
    },

    [getTopArtists.fulfilled]: (state, action) => {
      state.isLoaded = true;
      state.topArtists = action.payload;
    },
    [searchArtists.fulfilled]: (state, action) => {
      state.artistSearches = action.payload;
    },
  },
});

export const { clearSearch } = artistSlice.actions;

export default artistSlice.reducer;
