import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./features/artist/artistSlice";
import albumReducer from "./features/album/albumSlice";
import songReducer from "./features/song/songSlice";
import tagReducer from "./features/tag/tagSlice";

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    song: songReducer,
    tag: tagReducer,
  },
});
