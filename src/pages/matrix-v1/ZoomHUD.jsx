import React from 'react';
import { useStore, useReactFlow } from 'reactflow';

export default function ZoomHUD() {
  const zoom = useStore((s) => s.transform[2]);
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  const handleReset = () => setViewport({ x: 0, y: 0, zoom: 1, duration: 400 });

  return (
    <div className="absolute top-6 right-8 z-50 flex items-center gap-2 font-mono">
      <button
        onClick={zoomOut}
        className="rounded border bg-black/50 px-3 text-white text-xs hover:bg-[#222] border-cyan-400"
        title="Zoom out"
      >
        -
      </button>
      <span className="rounded border bg-black/50 px-3 text-cyan-400 text-xs border-cyan-400 select-none">
        {(zoom * 100).toFixed(0)}%
      </span>
      <button
        onClick={zoomIn}
        className="rounded border bg-black/50 px-3 text-white text-xs hover:bg-[#222] border-cyan-400"
        title="Zoom in"
      >
        +
      </button>
      <button
        onClick={handleReset}
        className="rounded border bg-black/50 px-3 text-cyan-400 text-xs border-cyan-400 ml-2 hover:bg-[#222]"
        title="Reset zoom"
      >
        Reset
      </button>
    </div>
  );
} 