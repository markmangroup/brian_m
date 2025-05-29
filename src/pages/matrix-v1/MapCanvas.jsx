import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';

const nodeTypes = {
  scene: () => (
    <div style={{ background: 'lime', color: 'black', padding: 20 }}>
      ✅ It works
    </div>
  )
};

const testNodes = [
  {
    id: 'test1',
    type: 'scene',
    position: { x: 0, y: 0 },
    data: {}
  }
];

export default function MapCanvas() {
  return (
    <ReactFlowProvider>
      <div className="pt-24">
        <ReactFlow
          nodes={testNodes}
          edges={[]}
          nodeTypes={nodeTypes}
          fitView
          style={{ height: '80vh', backgroundColor: '#111' }}
        />
      </div>
      <ZoomHUD />
    </ReactFlowProvider>
  );
}
