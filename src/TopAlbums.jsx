import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAlbums } from "./features/album/albumSlice";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function TopAlbums({ artistName, tagName, n = 5 }) {
  const { albums } = useSelector((store) => store.album);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbums({ artistName, tagName, n }));
  }, [artistName]);

  if (albums.length < 2) return;
  return (
    <div className="top-albums">
      <h2>Top Albums</h2>
      <ol className="top-albums-list">
        {albums.map((album, index) => (
          <li key={index}>
            <div className="preload">
              <img
                src={
                  Object.values(album.image[2])[0].length > 1
                    ? Object.values(album.image[2])[0]
                    : "/src/assets/empty.png"
                }
                alt=""
                width="200px"
                height="200px"
              />
            </div>
            <span className="top-albums-title">{album.name}</span>
            {tagName && (
              <span className="top-albums-artist">
                <Link to={`/artist/${album.artist.name}`}>
                  {album.artist.name}
                </Link>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
