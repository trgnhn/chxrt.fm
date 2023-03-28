import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import SongChart from "./SongChart";
import TopAlbums from "./TopAlbums";
import { getTag } from "./features/tag/tagSlice";
import { useSelector, useDispatch } from "react-redux";

const API_KEY = "91f5405e62bf1dbb6d0497eda5a50ab0";

export default function Tag() {
  const dispatch = useDispatch();
  const { tag, isLoaded } = useSelector((store) => store.tag);
  const param = useParams();
  const tagName = param.name;

  useEffect(() => {
    if (window.scrollY > 400) {
      document.querySelector(".container").scrollIntoView(true);
    }
    dispatch(getTag({ tagName }));
  }, [tagName]);

  if (isLoaded)
    return (
      <section className="tag-info info">
        <h2 className="tag-name">{tagName}</h2>
        <div className="albums">
          <TopAlbums tagName={tagName} n={5} />
        </div>
        <section className="tag-desc">
          <h2>Description</h2>
          {tag.wiki.content.length > 1
            ? tag.wiki.content.split("\n").map((s) => <p>{s}</p>)
            : "Empty"}
        </section>
        <SongChart tagName={tagName} />
      </section>
    );
  return <Loading />;
}
