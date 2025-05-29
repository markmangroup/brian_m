import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';

export default function MapCanvas({ nodes, edges, nodeTypes }) {
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={{ height: '80vh', backgroundColor: '#111' }}
      />
      <ZoomHUD />
    </ReactFlowProvider>
  );
}
