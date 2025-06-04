import React, { Suspense } from 'react';
import TilesVisualizer from './TilesVisualizer';
import BarsVisualizer from './BarsVisualizer';
const NodesVisualizer = React.lazy(() => import('./NodesVisualizer'));

export default function VisualizerFrame({ mode }) {
  return (
    <div className="rounded-2xl bg-white/90 shadow-lg backdrop-blur p-4 h-64 flex items-center justify-center">
      {mode === 'tiles' && <TilesVisualizer />}
      {mode === 'bars' && <BarsVisualizer />}
      {mode === 'nodes' && (
        <Suspense fallback={<div>Loading...</div>}>
          <NodesVisualizer />
        </Suspense>
      )}
    </div>
  );
}
