import React from 'react';
import { useMetricsStore } from '../../store/metricsSlice';
import { selectProgressMetrics } from '../../store/metricsSlice';

function Donut({ ratio }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ratio);
  return (
    <svg width="48" height="48" className="rotate-[-90deg]">
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="transparent"
        stroke="#374151"
        strokeWidth="6"
      />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="transparent"
        stroke="#22c55e"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s' }}
      />
    </svg>
  );
}

export default function NodesVisualizer() {
  const { worldMetrics } = useMetricsStore(selectProgressMetrics);
  const worlds = Object.keys(worldMetrics);

  return (
    <div className="flex items-center justify-around w-full h-full">
      {worlds.map((w) => {
        const ratio =
          worldMetrics[w].total > 0
            ? worldMetrics[w].enhanced / worldMetrics[w].total
            : 0;
        return (
          <div key={w} className="flex flex-col items-center">
            <Donut ratio={ratio} />
            <span className="text-xs mt-1 capitalize">{w}</span>
          </div>
        );
      })}
    </div>
  );
}
