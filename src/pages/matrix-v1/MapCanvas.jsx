import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';

const testNodes = [
  {
    id: 'test1',
    type: 'scene',
    position: { x: 100, y: 100 },
    data: {
      title: 'Test Scene',
      description: 'This is a test scene.',
      setting: 'Forest'
    }
  }
];

export default function MapCanvas({ edges, nodeTypes }) {
  console.log('MapCanvas nodes:', testNodes);
  console.log('MapCanvas nodeTypes:', nodeTypes);
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={testNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={{ height: '80vh', backgroundColor: '#111' }}
      />
      <ZoomHUD />
    </ReactFlowProvider>
  );
}
