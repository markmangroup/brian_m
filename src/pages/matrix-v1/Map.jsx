import React, { useState, useEffect } from 'react';
import ReactFlow from 'reactflow';
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

  // Debug: Log nodes and edges to verify they are present
  console.log("NODES:", nodes, "EDGES:", edges);

  // TEMP: Test with a simple node and edge (clear visibility)
  const testNodes = [
    {
      id: '1',
      position: { x: 250, y: 250 },
      data: { label: '🧪 Test Node' },
      type: 'default',
      style: {
        backgroundColor: '#00ff00',
        color: '#000',
        padding: 10,
        borderRadius: 6,
        fontWeight: 'bold',
        border: '2px solid #fff',
      },
    },
  ];
  const testEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'Fake Edge', type: 'default' },
  ];

  return (
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
      {/* TEMP: Render test node and edge only */}
      <ReactFlow
        nodes={testNodes}
        edges={testEdges}
        fitView
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        fitViewOptions={{ padding: 0.5 }}
        style={{ height: '80vh', backgroundColor: '#111' }}
      />
    </div>
  );
}
