import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlbumCover from "./AlbumCover";
import Tags from "./Tags";
import TopAlbums from "./TopAlbums";
import SongChart from "./SongChart";
import Error from "./Error";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { getArtist } from "./features/artist/artistSlice";

export default function Artist() {
  const dispatch = useDispatch();
  const param = useParams();
  const artistName = param.name;

  const { artist, isLoaded } = useSelector((store) => store.artist);
  useEffect(() => {
    if (window.scrollY > 400) {
      document.querySelector(".container").scrollIntoView(true);
    }
    dispatch(getArtist({ artistName }));
  }, [artistName]);

  if (!artist) {
    return (
      <Error
        msg={"Artist requested could not be found. Please try another artist."}
      />
    );
  }

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <section className="artist-info info">
      <div className="artist-image">
        <AlbumCover artistName={artistName} />
      </div>
      <h2 className="artist-name">{artist.name}</h2>
      <div className="tags">
        <Tags artistName={artistName} n={10} />
      </div>
      <div className="albums">
        <TopAlbums artistName={artistName} n={5} />
      </div>
      <div className="bio">
        <h2>Biography</h2>
        {artist.bio?.content ? (
          artist.bio.content
            .split("\n")
            .slice(0, 10)
            .map((s) => <p>{s}</p>)
        ) : (
          <>Empty</>
        )}
      </div>
      <div className="song-chart">
        <SongChart artistName={artistName} n={10} />
      </div>
    </section>
  );
}
