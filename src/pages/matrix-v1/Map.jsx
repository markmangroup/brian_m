import React, { useState, useEffect } from 'react';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import CustomNode from './CustomNode';
import MapCanvas from './MapCanvas';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getVisited, getCurrentNode } from './MatrixRouteMemory';

function createNodeTypes(currentId, visited) {
  return {
    npc: (props) => (
      <CustomNode
        {...props}
        type="npc"
        selected={props.id === currentId}
        visited={Array.isArray(visited) && visited.includes(props.id)}
      />
    ),
    choice: (props) => (
      <CustomNode
        {...props}
        type="choice"
        selected={props.id === currentId}
        visited={Array.isArray(visited) && visited.includes(props.id)}
      />
    ),
    end: (props) => (
      <CustomNode
        {...props}
        type="end"
        selected={props.id === currentId}
        visited={Array.isArray(visited) && visited.includes(props.id)}
      />
    ),
    faction: (props) => (
      <CustomNode
        {...props}
        type="faction"
        selected={props.id === currentId}
        visited={Array.isArray(visited) && visited.includes(props.id)}
      />
    ),
    training: (props) => (
      <CustomNode
        {...props}
        type="training"
        selected={props.id === currentId}
        visited={Array.isArray(visited) && visited.includes(props.id)}
      />
    ),
  };
}

export default function MapPage() {
  const [devView, setDevView] = useState(false);
  const [currentId, setCurrentId] = useState('start');
  const [visited, setVisited] = useState([]);
  const [trailEdges, setTrailEdges] = useState(edges);

  useEffect(() => {
    function updateStatus() {
      const current = getCurrentNode() || 'start';
      const visitedNodes = getVisited();
      const safeVisited = Array.isArray(visitedNodes) ? visitedNodes : [];
      console.log('visited', safeVisited, 'currentId', current);
      setCurrentId(current);
      setVisited(safeVisited);
    }
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updated = edges.map((e) => {
      if (
        Array.isArray(visited) &&
        visited.includes(e.source) &&
        visited.includes(e.target)
      ) {
        return {
          ...e,
          style: { ...(e.style || {}), stroke: '#22c55e88' },
        };
      }
      return e;
    });
    setTrailEdges(updated);
  }, [visited]);

  const nodeTypes = createNodeTypes(currentId, visited);


  return (
    <div className="relative bg-black bg-gradient-to-br from-gray-900 to-black min-h-screen p-8 overflow-hidden">
      <Navigation />
      <Breadcrumbs />
      <h1 className="sr-only">Matrix Story Map</h1>
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
      <MapCanvas nodes={nodes} edges={trailEdges} nodeTypes={nodeTypes} />
    </div>
  );
}
