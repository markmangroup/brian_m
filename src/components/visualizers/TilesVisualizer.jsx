import React, { useEffect, useState } from 'react';
import { realMatrixNodes } from '../../pages/matrix-v1/realMatrixFlow';

const cols = 16;
const statuses = realMatrixNodes.map((n) => n.data?.status || 'stub');
const rows = Math.ceil(statuses.length / cols);

export default function TilesVisualizer() {
  const [cells, setCells] = useState(statuses);

  useEffect(() => {
    const interval = setInterval(() => {
      setCells((c) =>
        c.map((state) => {
          if (state === 'stub' && Math.random() < 0.05) return 'wip';
          if (state === 'wip' && Math.random() < 0.1) return 'live';
          return state;
        })
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const getColor = (state) => {
    if (state === 'live') return 'bg-green-500';
    if (state === 'wip') return 'bg-yellow-400 animate-pulse';
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
