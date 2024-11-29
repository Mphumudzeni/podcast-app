import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import backButton from "../data/back-button.png";
import { CircularProgress } from "@mui/material";

const Podcasts = () => {
  const [shows, setShows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true); // Initializing loading state to true
  const [sortOption, setSortOption] = useState("A-Z");
  const genresFilter = searchParams.get("genres");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const res = await fetch(`https://podcast-api.netlify.app/`);
        const data = await res.json();

        // Simulate a delay for loading
        setTimeout(() => {
          setShows(data);
          setLoading(false); // Set loading to false after data is fetched
        }, 2000); // 2 seconds delay
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchData();
  }, []);

  // Handle genre filter
  const genreFilterNumber = genresFilter ? parseInt(genresFilter, 10) : null;

  const filteredShows = genreFilterNumber
    ? shows.filter((genre) => genre.genres.includes(genreFilterNumber))
    : shows;

  // Sort shows based on selected sort option
  const sortedShows = [...filteredShows].sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    if (sortOption === "Newest") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    if (sortOption === "Oldest") {
      return new Date(a.updated_at) - new Date(b.updated_at);
    }
    return 0;
  });

  const showsCards = sortedShows.map((show) => (
    <div className="show-card" key={show.id}>
      <Link to={`/podcasts/${show.id}`}>
        <img src={show.image} alt={show.title} />
        <p>{show.title}</p>
      </Link>
    </div>
  ));

  const handleGenreChange = (event) => {
    const genreValue = event.target.value;
    if (genreValue === "") {
      setSearchParams({});
    } else {
      setSearchParams({ genres: genreValue });
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <>
      <div className="podcast-list-container">
        <Link to=".." relative="path">
          <img src={backButton} alt="Back" />
        </Link>
        <h1>All Podcasts</h1>
        <div className="filters">
          <div className="select-genre">
            <h2>Select Genre</h2>
            <select onChange={handleGenreChange} defaultValue="">
              <option value="">All Shows</option>
              <option value="1">Personal Growth</option>
              <option value="2">Investigative Journalism</option>
              <option value="3">History</option>
              <option value="4">Comedy</option>
              <option value="5">Entertainment</option>
              <option value="6">Business</option>
              <option value="7">Fiction</option>
              <option value="8">News</option>
              <option value="9">Kids & Family</option>
            </select>
          </div>
          <div className="select-sort">
            <h2>Sort By</h2>
            <select onChange={handleSortChange} value={sortOption}>
              <option value="A-Z">Title (A-Z)</option>
              <option value="Z-A">Title (Z-A)</option>
              <option value="Newest">Newest Updates</option>
              <option value="Oldest">Oldest Updates</option>
            </select>
          </div>
        </div>
        
        {/* Show the loading state while fetching */}
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <div className="podcast-card-list">{showsCards}</div>
        )}
      </div>
    </>
  );
};

export default Podcasts;
