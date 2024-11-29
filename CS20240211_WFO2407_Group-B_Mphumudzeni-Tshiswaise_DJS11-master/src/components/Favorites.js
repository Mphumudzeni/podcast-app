import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [setSortOption] = useState("A-Z"); // Default sorting option

  useEffect(() => {
    // Retrieve the stored favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteEpisodes"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Unknown Date"; // Fallback for invalid dates
    }
    return date.toLocaleDateString(); // Formats the date to a readable format (MM/DD/YYYY)
  };

  // Handle sorting based on different criteria
  const handleSort = (option) => {
    setSortOption(option);
    let sortedFavorites = [...favorites];

    switch (option) {
      case "A-Z":
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Newest":
        sortedFavorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      case "Oldest":
        sortedFavorites.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
        break;
      default:
        break;
    }

    setFavorites(sortedFavorites);
  };

  // Remove an episode from favorites
  const handleRemoveFavorite = (episodeToRemove) => {
    const updatedFavorites = favorites.filter((episode) => episode.episode !== episodeToRemove.episode);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updatedFavorites));
  };

  // Group favorites by show or season
  const groupedFavorites = favorites.reduce((groups, episode) => {
    const groupKey = `${episode.showName} - Season ${episode.season}`;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(episode);
    return groups;
  }, {});

  // Function to handle clearing all favorites
  const handleClearAllFavorites = () => {
    if (window.confirm("Are you sure you want to clear all your favorites?")) {
      setFavorites([]);
      localStorage.removeItem("favoriteEpisodes"); // Remove all from localStorage
    }
  };

  return (
    <div className="favorites-list-container">
      <h1>My Favorites</h1>

      {/* Clear All Button */}
      <button onClick={handleClearAllFavorites} className="clear-all-btn">
        Clear All Favorites
      </button>

      {/* Sorting options */}
      <div className="sort-options">
        <button onClick={() => handleSort("A-Z")}>Sort A-Z</button>
        <button onClick={() => handleSort("Z-A")}>Sort Z-A</button>
        <button onClick={() => handleSort("Newest")}>Sort by Newest</button>
        <button onClick={() => handleSort("Oldest")}>Sort by Oldest</button>
      </div>

      {favorites.length === 0 ? (
        <p>No Favorites</p>
      ) : (
        <div className="favorites-grouped-list">
          {Object.keys(groupedFavorites).map((group) => (
            <div key={group} className="group-card">
              <h2>{group}</h2> {/* Group Title: Show Name - Season */}
              <div className="episodes-container">
                {groupedFavorites[group].map((episode) => (
                  <div key={episode.episode} className="podcast-card">
                    <h3>{episode.title}</h3>
                    <audio controls>
                      <source src={episode.file} type="audio/mpeg" />
                    </audio>
                    <p>Added on: {formatDate(episode.addedAt)}</p>
                    <button onClick={() => handleRemoveFavorite(episode)}>Remove from Favorites</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
