// src/pages/HomePage.js
import { Link } from "react-router-dom";
import playIcon from "../data/play_icon.png"; 
import PodcastHome from "../components/PodcastHome";

const HomePage = () => {

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-caption">
          {/* Play Button */}
          <div className="hero-btns">
            <Link to="/podcasts" relative="path"><button className="btn">
              <img src={playIcon} alt="" />
              Play
            </button>
            </Link>
          </div>
          {/* You can keep PodcastHome component or replace it with others */}
          <PodcastHome />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
