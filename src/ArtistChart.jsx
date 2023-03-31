import { useState, useEffect } from "react";
import ChartPosition from "./ChartPosition";
import { useSelector, useDispatch } from "react-redux";
import { getTopArtists } from "./features/artist/artistSlice";
const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function ArtistChart({ n = 10 }) {
  const { topArtists } = useSelector((store) => store.artist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopArtists({ n }));
  }, []);

  return (
    <section className="artist-chart">
      <h1 className="header">Popular Artists of the Week</h1>
      <div className="text-background">
        <ol>
          {topArtists.map((artist, index) => (
            <li key={index}>
              <ChartPosition artist={artist} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
