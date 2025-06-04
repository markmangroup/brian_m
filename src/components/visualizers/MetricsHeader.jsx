import React from 'react';
import { useMetricsStore } from '../../store/metricsSlice';
import { selectProgressMetrics } from '../../store/metricsSlice';

function Donut({ ratio }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - ratio);
  return (
    <svg width="40" height="40" className="rotate-[-90deg]">
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="transparent"
        stroke="#374151"
        strokeWidth="4"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="transparent"
        stroke="#22c55e"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MetricsHeader() {
  const { cleanliness, stubRatio, rulesApplied } = useMetricsStore(selectProgressMetrics);
  const percent = Math.round(cleanliness);
  const livePercent = Math.round(stubRatio * 100);
  return (
    <div className="rounded-2xl bg-theme-overlay shadow-lg p-6 backdrop-blur flex justify-around">
      <div className="text-center">
        <div className="text-2xl font-bold text-theme-bright">{percent}%</div>
        <div className="text-sm text-theme-muted">Cleanliness</div>
      </div>
      <div className="text-center flex flex-col items-center">
        <Donut ratio={stubRatio} />
        <div className="text-sm text-theme-muted mt-1">{livePercent}% live</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-theme-bright">{rulesApplied}</div>
        <div className="text-sm text-theme-muted">Rules</div>
      </div>
    </div>
  );
}
