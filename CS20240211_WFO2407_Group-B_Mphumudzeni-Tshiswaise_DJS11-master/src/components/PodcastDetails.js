// src/components/PodcastDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import backButton from "../data/back-button.png";
import { CircularProgress } from "@mui/material";
import savepng from "../data/save.png";

const PodcastDetails = () => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await res.json();
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:" + error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    setFavorites(storedFavorites);
  }, []);

  /** HANDLE DESCRIPTION TOGGLE */
  const handleDescriptionToggle = () => {
    setExpandedDescriptions((prev) => !prev);
  };

  /** HANDLE EPISODE CLICK */
  const handleEpisodeClick = (episode) => {
    setCurrentEpisode({
      ...episode,
      title: episode.title,
      image: episode.image,
    });
  };

  /** HANDLE FAVORITES CLICK */
  const handleFavoriteClick = (episode, season, showName) => {
    // Check if episode, season, and showName are defined
    if (!episode || !season || !showName) {
      console.error('Invalid data in handleFavoriteClick:', { episode, season, showName });
      return;
    }
  
    const isFavorite = favorites.some((fav) => fav.title === episode.title);
  
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.title !== episode.title);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites with addedAt timestamp, Show and Season details
      const updatedFavorites = [
        ...favorites,
        {
          ...episode,
          addedAt: new Date().toISOString(), // Store the date the episode was added to favorites
          showName: showName, // Add Show name
          season: season.title, // Add Season title
        },
      ];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    }
  };  
    

  /** CHECK IF EPISODE IS A FAVORITE */
  const isFavorite = (episode) => {
    return favorites.some((fav) => fav.title === episode.title);
  };

  /** HANDLE SEASON CLICK */
  const HandleSeasonClick = (index) => {
    setSelectedSeason(selectedSeason === index ? null : index);
  };

  return (
    <div className="podcast-list-container">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Link to=".." relative="path">
            <img src={backButton} alt="" />
          </Link>
          <div>
            <h2>{show.title}</h2>
            <div className="podcast-details">
              <div>
                <img src={show.image} alt={show.title} />
                <p>{show.updated}</p>
              </div>
              <p>
                {expandedDescriptions
                  ? show.description
                  : `${show.description.slice(0, 150)}...`}
                <button onClick={handleDescriptionToggle}>
                  {expandedDescriptions ? "Show Less" : "Read More"}
                </button>
              </p>
            </div>
          </div>

          <h1>Seasons</h1>
          {show.seasons && show.seasons.length > 0 && (
            <div className="podcast-seasons-container">
              {show.seasons.map((season, index) => (
                <div className="podcast-seasons" key={season.season}>
                  <h3>{season.title}</h3>
                  <img
                    src={season.image}
                    alt={season.title}
                    onClick={() => HandleSeasonClick(index)}
                  />

                  {selectedSeason === index && (
                    <>
                      <h1>Episodes</h1>
                      {season.episodes.map((episode) => (
                        <div
                          className="episodes"
                          key={episode.episode}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={season.image}
                            alt=""
                            onClick={() => handleEpisodeClick(episode)}
                          />
                          <h6>{episode.title}</h6>
                          <button onClick={() => handleFavoriteClick(episode, season, show.title)}>
                            {isFavorite(episode) ? "❤️" : "♡"}
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {currentEpisode && (
        <div className="audio-player">
          <img src={show.image} alt="" />
          <audio controls autoPlay>
            <source src={currentEpisode.file} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <h5>{currentEpisode.title}</h5>
        </div>
      )}
    </div>
  );
};

export default PodcastDetails;
