import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/base.css';
import { nodes } from './nodes';
import { edges } from './edges';

export default function MapPage() {
  return (
    <div style={{ height: '90vh', background: '#0f0f0f' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
