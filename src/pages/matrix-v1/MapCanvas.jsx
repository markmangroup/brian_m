import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';
import { SceneNode } from './CustomNode';

const testNodes = [
  {
    id: 'test1',
    type: 'scene',
    position: { x: 100, y: 100 },
    data: {
      title: 'Forced Scene',
      description: 'This is a known-good render',
      setting: 'Override test'
    }
  }
];

const nodeTypes = {
  scene: SceneNode
};

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
