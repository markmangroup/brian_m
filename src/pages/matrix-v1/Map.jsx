import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, useReactFlow } from 'reactflow';
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

  const ResetControl = () => {
    const { fitView } = useReactFlow();
    const handleReset = useCallback(() => fitView(), [fitView]);
    return (
      <button
        onClick={handleReset}
        className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black/70"
        aria-label="Reset view"
      >
        Reset
      </button>
    );
  };

  // For now, only highlight the start node as current
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
          <ResetControl />
        </div>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView className="w-full h-full">
          <Background color="#222" />
          <MiniMap className="bg-black/60" />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
