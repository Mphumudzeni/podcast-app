import React, { useState } from "react";
import logo from "../data/elogo_icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
//import searchIcon from "../data/search_icon.svg";
import profileImg from "../data/login.png";
import caretIcon from "../data/caret_icon.svg";
import { Dehaze } from "@mui/icons-material";

const SearchBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate(); // React Router hook for navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchQuery.trim()) {
      // Navigate to the search results page or log query
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img className="logo" src={logo} alt="Logo" />
        <NavLink className="navlink" to="/">
          Home
        </NavLink>
        <NavLink className="navlink" to="/podcasts">
          Podcasts
        </NavLink>
        <NavLink className="navlink" to="/favorites">
          My Favorites
        </NavLink>
      </div>

      <div className="navbar-right">
        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
          
          </button>
        </form>
        <div className="navbar-profile">
          <img className="profile" src={profileImg} alt="Profile" />
          <img className="caret" src={caretIcon} alt="Caret" />
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <Dehaze />
      </div>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isMenuOpen ? "active" : ""}`}>
        <NavLink className="dropdown-link" to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink className="dropdown-link" to="/podcasts" onClick={toggleMenu}>
          Podcasts
        </NavLink>
        <NavLink className="dropdown-link" to="/favorites" onClick={toggleMenu}>
          My Favorites
        </NavLink>
        <div className="dropdown-profile">
          <img className="caret" src={caretIcon} alt="Caret" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

