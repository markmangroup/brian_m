import { useStore, useReactFlow } from 'reactflow';

export default function ZoomHUD() {
  const zoom = useStore((s) => s.transform[2]);
  const { setViewport } = useReactFlow();
  const handleReset = () => setViewport({ x: 0, y: 0, zoom: 1, duration: 400 });

  return (
    <div className="absolute top-6 right-8 z-50 text-sm text-white bg-black/50 px-2 py-1 rounded shadow flex items-center gap-2">
      <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
      <button
        onClick={handleReset}
        className="px-2 py-1 rounded bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 text-xs"
        title="Reset zoom"
      >
        Reset
      </button>
    </div>
  );
} 