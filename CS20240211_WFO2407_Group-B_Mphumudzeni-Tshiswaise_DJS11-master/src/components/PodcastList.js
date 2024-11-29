import React from "react";
import { Outlet } from "react-router-dom";

const PodcastList = () => {
  return (
    <div className="site-wrapper">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PodcastList;

