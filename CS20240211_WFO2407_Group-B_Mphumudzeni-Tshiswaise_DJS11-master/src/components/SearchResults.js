import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  return (
    <div>
      <h1>Search Results</h1>
      <p>Showing results for: <strong>{searchQuery}</strong></p>
      {/* Replace the placeholder below with logic to fetch and display results */}
      <p>(Here, you can display search results based on the query.)</p>
    </div>
  );
};

export default SearchResults;