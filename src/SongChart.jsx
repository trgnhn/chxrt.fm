import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { getSongChart } from "./features/song/songSlice";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function SongChart({ tagName, artistName, n = 10 }) {
  const { songChart } = useSelector((store) => store.song);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSongChart({ tagName, artistName, n }));
  }, []);

  return (
    <section className="song-chart">
      <h1 className="header">
        Top {n} {tagName || artistName} Songs{" "}
        {!tagName && !artistName && "of the Week"}
      </h1>
      <div className="text-background">
        <table>
          <tbody>
            {songChart.map((song, index) => (
              <tr key={index}>
                <td className="song-index">{index + 1}. </td>
                <td className="song-artist">
                  <Link to={`/artist/${song.artist.name}`}>
                    {song.artist.name}
                  </Link>
                </td>
                <td className="song-title">{song.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
