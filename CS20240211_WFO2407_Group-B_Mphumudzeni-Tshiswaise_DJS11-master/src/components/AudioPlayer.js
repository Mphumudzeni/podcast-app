import React, { useState, useRef } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} />
      <div className="audio-controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <progress value={audioRef.current ? audioRef.current.currentTime : 0} max={audioRef.current ? audioRef.current.duration : 100}></progress>
      </div>
    </div>
  );
};

export default AudioPlayer;
