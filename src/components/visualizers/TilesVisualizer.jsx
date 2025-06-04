import React, { useEffect, useState } from 'react';

const rows = 8;
const cols = 16;

function randomState() {
  const states = ['dirty', 'processing', 'clean'];
  return states[Math.floor(Math.random() * states.length)];
}

export default function TilesVisualizer() {
  const [cells, setCells] = useState(() => Array(rows * cols).fill('dirty'));
  useEffect(() => {
    const interval = setInterval(() => {
      setCells((c) =>
        c.map((state) => {
          if (state === 'dirty' && Math.random() < 0.2) return 'processing';
          if (state === 'processing' && Math.random() < 0.3) return 'clean';
          return state;
        })
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getColor = (state) => {
    if (state === 'clean') return 'bg-green-500 scale-105';
    if (state === 'processing') return 'bg-yellow-400 animate-pulse';
    return 'bg-red-500';
  };

  return (
    <div
      className="grid gap-0.5 w-full h-full"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {cells.map((state, idx) => (
        <div
          key={idx}
          className={`w-full h-full ${getColor(state)}`}
          style={{ aspectRatio: '1 / 1' }}
        />
      ))}
    </div>
  );
}
