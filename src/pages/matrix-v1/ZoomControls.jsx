import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function ZoomControls({ svgRef }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (!svgRef.current) return;
    const zoomBehavior = d3.zoom().on('zoom', (event) => {
      d3.select(svgRef.current).select('g').attr('transform', event.transform);
      setZoomLevel(event.transform.k);
    });
    d3.select(svgRef.current).call(zoomBehavior);
    return () => {
      d3.select(svgRef.current).on('.zoom', null);
    };
  }, [svgRef]);

  const zoomBy = (factor) => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().scaleBy, factor);
  };

  const resetZoom = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(d3.zoom().transform, d3.zoomIdentity);
  };

  return (
    <div className="absolute top-6 right-8 z-50 flex items-center gap-2 font-mono">
      <button
        onClick={() => zoomBy(0.8)}
        className="rounded border bg-black/50 px-3 text-white text-xs hover:bg-[#222] border-cyan-400"
        title="Zoom out"
      >
        -
      </button>
      <span className="rounded border bg-black/50 px-3 text-cyan-400 text-xs border-cyan-400 select-none">
        {(zoomLevel * 100).toFixed(0)}%
      </span>
      <button
        onClick={() => zoomBy(1.25)}
        className="rounded border bg-black/50 px-3 text-white text-xs hover:bg-[#222] border-cyan-400"
        title="Zoom in"
      >
        +
      </button>
      <button
        onClick={resetZoom}
        className="rounded border bg-black/50 px-3 text-cyan-400 text-xs border-cyan-400 ml-2 hover:bg-[#222]"
        title="Reset zoom"
      >
        Reset
      </button>
    </div>
  );
}

