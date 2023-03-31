import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Home from "./Home";
import ArtistChart from "./ArtistChart";
import SongChart from "./SongChart";
import Artist from "./Artist";
import Tag from "./Tag";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-artists" element={<ArtistChart n={50} />} />
          <Route path="/top-songs" element={<SongChart n={50} />} />
          <Route path="/artist/:name" element={<Artist />} />
          <Route path="/tag/:name" element={<Tag />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
        <small>
          Data provided by <a href="https://www.last.fm/api">Last.fm API</a>.
          Created by Trọng Nhân.
        </small>
      </div>
    </>
  );
}

export default App;
