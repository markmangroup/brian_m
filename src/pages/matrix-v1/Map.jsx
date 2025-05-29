import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, useReactFlow, useStore } from 'reactflow';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import CustomNode from './CustomNode';

function createNodeTypes(currentId, visited) {
  return {
    npc: (props) => (
      <CustomNode
        {...props}
        type="npc"
        selected={props.id === currentId}
        visited={visited.includes(props.id)}
      />
    ),
    choice: (props) => (
      <CustomNode
        {...props}
        type="choice"
        selected={props.id === currentId}
        visited={visited.includes(props.id)}
      />
    ),
    end: (props) => (
      <CustomNode
        {...props}
        type="end"
        selected={props.id === currentId}
        visited={visited.includes(props.id)}
      />
    ),
    faction: (props) => (
      <CustomNode
        {...props}
        type="faction"
        selected={props.id === currentId}
        visited={visited.includes(props.id)}
      />
    ),
    training: (props) => (
      <CustomNode
        {...props}
        type="training"
        selected={props.id === currentId}
        visited={visited.includes(props.id)}
      />
    ),
  };
}

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
      <div className="relative bg-black bg-gradient-to-br from-gray-900 to-black min-h-screen p-8 overflow-hidden">
        <div style={{ position: 'absolute', top: 10, right: 20, zIndex: 10 }}>
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
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          style={{ height: '80vh', backgroundColor: '#111' }}
        />
      </div>
    </ReactFlowProvider>
  );
}
