import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';
import CustomNode from './CustomNode';

const nodeTypes = {
  npc: (props) => <CustomNode {...props} type="npc" />,
  choice: (props) => <CustomNode {...props} type="choice" />,
  end: (props) => <CustomNode {...props} type="end" />,
};

export default function MapPage() {
  // Placeholder: highlight logic can be added here
  return (
    <div style={{ height: '90vh', background: '#0f0f0f' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
}
