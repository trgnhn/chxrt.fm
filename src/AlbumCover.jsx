import { useState, useEffect } from "react";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function albumCovers({ artistName, n = 1 }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "TRGNHN",
    });

    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${API_KEY}&format=json`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setAlbums(res.topalbums.album.slice(0, n));
      });
  }, [artistName]);

  const albumCovers = albums.map((album, index) => {
    return (
      <img key={index} src={Object.values(album.image[2])[0]} width="300px" />
    );
  });

  return albumCovers;
}
