import React from 'react';
import { useMetricsStore } from '../../store/metricsSlice';
import { selectProgressMetrics } from '../../store/metricsSlice';

export default function BarsVisualizer() {
  const { worldMetrics } = useMetricsStore(selectProgressMetrics);
  const worlds = Object.keys(worldMetrics);

  return (
    <div className="flex items-end justify-around w-full h-full">
      {worlds.map((w) => {
        const ratio =
          worldMetrics[w].total > 0
            ? worldMetrics[w].enhanced / worldMetrics[w].total
            : 0;
        return (
          <div key={w} className="flex flex-col items-center h-full">
            <div
              className="w-6 bg-gradient-to-t from-green-700 to-green-400 rounded"
              style={{
                height: `${Math.round(ratio * 100)}%`,
                transition: 'height 1s',
              }}
            />
            <span className="text-xs mt-1 capitalize">{w}</span>
          </div>
        );
      })}
    </div>
  );
}
