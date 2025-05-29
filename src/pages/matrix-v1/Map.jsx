import React, { useState } from 'react';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import { SceneNode, DialogueNode, ChoiceNode, EndingNode } from './CustomNode';
import MapCanvas from './MapCanvas';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';

const nodeTypes = {
  scene: SceneNode,
  dialogue: DialogueNode,
  choice: ChoiceNode,
  ending: EndingNode
};

const commit = process.env.REACT_APP_GIT_SHA;

export default function MapPage() {
  const [devView, setDevView] = useState(false);

  console.log('Rendering nodes:', nodes);

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
      <div className="absolute top-0 right-4 text-xs text-gray-400 z-50">
        Build: {commit || 'dev'}
      </div>
      <MapCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
