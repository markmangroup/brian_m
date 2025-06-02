import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import { SceneNode, DialogueNode, ChoiceNode, EndingNode } from './CustomNode';
import MapCanvas from './MapCanvas';

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
      <h1 className="sr-only">Matrix Story Map</h1>
      <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 50 }}>
        <div className="flex gap-2">
          <Link
            to="/matrix-v1/map-d3"
            className="bg-[#111] text-white border border-cyan-400 rounded px-4 py-1 font-mono font-semibold text-sm hover:bg-[#222] hover:text-cyan-400 shadow-[0_0_8px_cyan] transition-all"
          >
            🧠 New D3 Story Map
          </Link>
          <button
            onClick={() => setDevView((v) => !v)}
            className={
              'bg-[#111] text-white border border-[#00ff00] rounded px-4 py-1 font-mono font-semibold text-sm hover:bg-[#222] hover:text-[#00ff00] shadow-[0_0_8px_#00ff00]'
            }
          >
            🧪 Dev View
          </button>
        </div>
      </div>
      {devView && (
        <div
          className="fixed bottom-16 left-5 bg-[#111] text-[#00ff00] px-4 py-2 rounded font-mono text-xs border border-[#00ff00] shadow-[0_0_8px_#00ff00] z-50"
        >
          <div className="font-bold mb-1">Legend</div>
          <div>✅ built, 🛠 in progress, ❌ planned</div>
        </div>
      )}
      <div className="fixed bottom-2 right-4 font-mono text-xs text-gray-500 bg-black/60 px-2 py-1 rounded shadow z-50">
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
