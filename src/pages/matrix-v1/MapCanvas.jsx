import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';
import {
  SceneNode,
  DialogueNode,
  ChoiceNode,
  EndingNode
} from './CustomNode';

const nodeTypes = {
  scene: SceneNode,
  dialogue: DialogueNode,
  choice: ChoiceNode,
  ending: EndingNode,
  npc: SceneNode,
  end: EndingNode,
  faction: SceneNode,
  training: DialogueNode,
};

const testNodes = [
  {
    id: 'test1',
    type: 'scene',
    position: { x: 0, y: 0 },
    data: {}
  }
];

export default function MapCanvas({ nodes, edges }) {
  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 1 }}
          style={{ height: '100%', backgroundColor: '#111' }}
        />
      </div>
      <ZoomHUD />
    </ReactFlowProvider>
  );
}
