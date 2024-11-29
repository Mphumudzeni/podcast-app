// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastList from "./components/PodcastList";
import Podcasts from "./components/Podcasts";
import Favorites from "./components/Favorites";
import PodcastDetails from "./components/PodcastDetails";
import SearchResults from "./components/SearchResults"; 
import SearchBar from "./components/SearchBar";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      {/* Add the SearchBar component at the top */}
      <SearchBar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<PodcastList />}>
          <Route index element={<HomePage />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="podcasts/:id" element={<PodcastDetails />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        {/* Add a route for search results */}
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
