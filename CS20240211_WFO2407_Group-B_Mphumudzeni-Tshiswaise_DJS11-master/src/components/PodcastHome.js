import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const HomePodcasts = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://podcast-api.netlify.app/shows");
        const data = await res.json();

        /*created a varible that will sort the data in alphabetical order*/
        const sortedPodcats = data.sort((a,b)=> {
          const titleA = a.title.toUpperCase()
          const titleB = b.title.toUpperCase()
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0

        })
        setShows(sortedPodcats);
      } catch (error) {
        console.error("Fetch error:" + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading"><CircularProgress/></div>;
  }

  /**
   * Maps out shows imgs and titles along with there ids
   */
  const showsCards = shows.map((show) => (
    <Link to={`/podcasts/${show.id}`} className="card" key={show.id}>
      <img src={show.image} alt="" />
      <p>{show.title}</p>
    </Link>
  ));

  return (
    <div className="title-cards">
      <h2>Popular Shows</h2>
      <div className="card-list">{showsCards}</div>
    </div>
  );
};

export default HomePodcasts;
