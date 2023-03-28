import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchArtists, clearSearch } from "./features/artist/artistSlice";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  let { artistSearches } = useSelector((store) => store.artist);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (inputValue.length < 3) {
      dispatch(clearSearch());
      return;
    }
    dispatch(searchArtists({ artistName: inputValue }));
  }, [inputValue]);

  return (
    <section className="search">
      <h2>Search For Artist</h2>
      <span className="search-button">
        <input
          type="text"
          name="tag"
          value={inputValue}
          placeholder="Artist name..."
          onChange={handleInput}
          className="search-bar"
        ></input>
      </span>
      <div className="searches">
        <>
          {artistSearches.map((artist) => {
            return (
              <Link to={`/artist/${artist.name}`}>
                <li
                  className="search-result"
                  onClick={() => {
                    dispatch(clearSearch());
                  }}
                >
                  {artist.name}
                </li>
              </Link>
            );
          })}
        </>
      </div>
    </section>
  );
}
