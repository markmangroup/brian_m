import React from 'react';
import { Play, Pause, Square } from 'lucide-react';

export default function ProgressControls({
  playing,
  onPlay,
  onPause,
  onReset,
  speed,
  onSpeed,
}) {
  return (
    <div className="flex items-center space-x-3">
      {playing ? (
        <button onClick={onPause} aria-label="pause">
          <Pause className="w-5 h-5" />
        </button>
      ) : (
        <button onClick={onPlay} aria-label="play">
          <Play className="w-5 h-5" />
        </button>
      )}

      <button onClick={onReset} aria-label="reset">
        <Square className="w-5 h-5" />
      </button>

      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeed(parseFloat(e.target.value))}
        aria-label="animation speed"
        className="w-24"
      />
    </div>
  );
}
