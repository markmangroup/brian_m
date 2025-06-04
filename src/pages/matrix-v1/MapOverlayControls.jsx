import React from 'react';

export default function MapOverlayControls({ hideEdges, setHideEdges, showRealPath, setShowRealPath }) {
  return (
    <div className="fixed md:top-4 md:right-4 bottom-4 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-30 bg-black/80 border border-cyan-400 rounded-md p-2 text-xs font-mono space-y-1 pointer-events-auto">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hideEdges}
          onChange={(e) => setHideEdges(e.target.checked)}
          className="accent-cyan-500"
        />
        <span className="text-cyan-300">Hide Edges</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showRealPath}
          onChange={(e) => setShowRealPath(e.target.checked)}
          className="accent-cyan-500"
        />
        <span className="text-cyan-300">Show Real Path</span>
      </label>
    </div>
  );
}
