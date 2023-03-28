import { Link } from "react-router-dom";
import AlbumCover from "./AlbumCover";
import Tags from "./Tags";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function ChartPosition({ artist, index }) {
  return (
    <>
      <div className="info">
        <h2>
          <span className="rank">{`${index + 1}. `}</span>
          <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
        </h2>
        <div>{Intl.NumberFormat().format(artist.playcount)} total play</div>
        <div>{Intl.NumberFormat().format(artist.listeners)} listeners</div>
        <div>
          Avg. play: {Math.ceil(artist.playcount / artist.listeners)} / person
        </div>
      </div>
      <Link className="album-cover" to={`/artist/${artist.name}`}>
        <div>
          <AlbumCover artistName={artist.name} n={3} />
        </div>
      </Link>
      <div className="tag-list">
        <Tags artistName={artist.name} />{" "}
      </div>
    </>
  );
}
