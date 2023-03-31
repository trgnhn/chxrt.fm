import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function Tags({ artistName, n = 5 }) {
  const [tags, setTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "TRGNHN",
    });
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&artist=${artistName}&api_key=${API_KEY}&format=json`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTags(res.toptags.tag.slice(0, n));
        setIsLoaded(true);
      });
  }, [artistName]);

  const listTags = tags.map((tag, index) => {
    return (
      <Link
        key={index}
        to={`/tag/${tag.name}`}
        className="tag"
      >{`${tag.name}`}</Link>
    );
  });

  if (isLoaded) return listTags;
  return <Loading />;
}
