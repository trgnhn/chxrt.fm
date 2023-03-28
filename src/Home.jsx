import ArtistChart from "./ArtistChart";
import SongChart from "./SongChart";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <ArtistChart />
      <Link to="./top-artists" className="see-more">
        {"See the full list >>"}
      </Link>
      <SongChart />
      <Link to="./top-songs" className="see-more">
        {"See the full list >>"}
      </Link>
    </>
  );
}
