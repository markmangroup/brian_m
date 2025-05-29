import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, useReactFlow, useStore } from 'reactflow';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import CustomNode from './CustomNode';

const nodeTypes = {
  npc: (props) => <CustomNode {...props} type="npc" selected={props.id === 'start'} />,
  choice: (props) => <CustomNode {...props} type="choice" selected={false} />,
  end: (props) => <CustomNode {...props} type="end" selected={false} />,
};

export default function MapPage() {
  const [devView, setDevView] = useState(false);
  const [currentId, setCurrentId] = useState('start');
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('currentNodeId') || 'start';
    let visitedList = [];
    try {
      visitedList = JSON.parse(localStorage.getItem('visitedNodes') || '[]');
    } catch {
      visitedList = [];
    }
    setCurrentId(id);
    setVisited(visitedList);
  }, []);

  const nodeTypes = createNodeTypes(currentId, visited);

  // Phase 1B: Zoom Utility Overlay
  const zoom = useStore((s) => s.transform[2]);
  const { setViewport } = useReactFlow();
  const handleReset = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 1, duration: 400 });
  }, [setViewport]);

  return (
    <ReactFlowProvider>
      <div className="relative h-[90vh] bg-gradient-to-b from-black via-neutral-900 to-black">
        <h1 className="absolute top-2 left-4 text-xl font-bold">Matrix Story Map</h1>
        <div className="absolute top-2 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setDevView((v) => !v)}
            style={{
              background: devView ? '#222' : '#111',
              color: devView ? '#00ff00' : '#fff',
              border: '1px solid #00ff00',
              borderRadius: 8,
              padding: '6px 16px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: devView ? '0 0 8px #00ff00' : 'none',
            }}
          >
            🧪 Dev View
          </button>
          {/* Phase 1B: Zoom Utility Overlay */}
          <div className="text-sm text-white bg-black/50 px-2 py-1 rounded shadow mt-2" title="Zoom level">
            Zoom: {(zoom * 100).toFixed(0)}%
            <button
              onClick={handleReset}
              className="ml-2 px-2 py-1 rounded bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 text-xs"
              style={{ fontSize: 12 }}
              title="Reset zoom"
            >
              Reset
            </button>
          </div>
        </div>
        {devView && (
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              background: '#111',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 14,
              zIndex: 10,
            }}
          >
            <div className="font-bold mb-1">Legend</div>
            <div>✅ built, 🛠 in progress, ❌ planned</div>
          </div>
        )}
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView className="w-full h-full">
          <Background color="#222" />
          <MiniMap className="bg-black/60" />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
