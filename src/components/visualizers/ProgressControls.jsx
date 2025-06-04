import React from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

export default function ProgressControls({ playing, onPlay, onPause, onReset, speed, onSpeed }) {
  return (
    <div className="flex items-center space-x-3">
      {playing ? (
        <button onClick={onPause} aria-label="pause">
          <FaPause className="w-5 h-5" />
        </button>
      ) : (
        <button onClick={onPlay} aria-label="play">
          <FaPlay className="w-5 h-5" />
        </button>
      )}
      <button onClick={onReset} aria-label="reset">
        <FaStop className="w-5 h-5" />
      </button>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeed(parseFloat(e.target.value))}
      />
    </div>
  );
}
