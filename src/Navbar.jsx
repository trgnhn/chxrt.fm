import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>chxrt.fm</h1>
      </Link>
      <Link to="./top-artists">
        <h3>Artists</h3>
      </Link>
      <Link to="./top-songs">
        <h3>Songs</h3>
      </Link>
    </nav>
  );
}
