import React, { useState } from 'react';
import ReactFlow from 'reactflow';
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
  // For now, only highlight the start node as current
  return (
    <div style={{ height: '90vh', background: '#0f0f0f', position: 'relative' }}>
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
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
}
