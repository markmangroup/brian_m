import React, { useEffect, useState } from 'react';

const BAR_COUNT = 5;

export default function BarsVisualizer() {
  const [levels, setLevels] = useState(() => Array(BAR_COUNT).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setLevels((lvls) => lvls.map(() => Math.random()));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-around w-full h-full">
      {levels.map((lvl, idx) => (
        <div
          key={idx}
          className="w-6 bg-gradient-to-t from-blue-500 to-cyan-400"
          style={{ height: `${Math.round(lvl * 100)}%`, transition: 'height 0.5s' }}
        />
      ))}
    </div>
  );
}
