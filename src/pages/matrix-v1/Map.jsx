import React, { useState, useMemo } from 'react';
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

// Narrative tier filter options
const NARRATIVE_TIER_OPTIONS = [
  { value: 'all', label: 'All Tiers', icon: '🌟' },
  { value: 'intro', label: 'Introduction', icon: '🎬' },
  { value: 'mid', label: 'Mid-Story', icon: '⚡' },
  { value: 'climax', label: 'Climax', icon: '🔥' },
  { value: 'finale', label: 'Finale', icon: '🏆' }
];

export default function MapPage() {
  const [devView, setDevView] = useState(false);
  const [selectedTier, setSelectedTier] = useState('all');

  console.log('Rendering nodes:', nodes);

  // Filter nodes based on selected narrative tier
  const filteredNodes = useMemo(() => {
    if (selectedTier === 'all') {
      return nodes;
    }
    return nodes.filter(node => node.narrativeTier === selectedTier);
  }, [selectedTier]);

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  return (
    <div className="relative bg-black bg-gradient-to-br from-gray-900 to-black min-h-screen p-8 overflow-hidden">
      <h1 className="sr-only">Matrix Story Map</h1>
      
      {/* Narrative Tier Filter */}
      <div className="fixed top-6 left-6 z-50">
        <div className="bg-[#111] border border-purple-400/60 rounded-lg p-4 shadow-[0_0_8px_purple] backdrop-blur-sm">
          <label htmlFor="tier-filter" className="block text-purple-400 font-mono text-sm font-semibold mb-2">
            📖 Narrative Tier Filter
          </label>
          <select
            id="tier-filter"
            value={selectedTier}
            onChange={handleTierChange}
            className="bg-[#1a1a1a] text-white border border-purple-400/60 rounded px-3 py-2 font-mono text-sm
                     focus:outline-none focus:border-purple-400 focus:shadow-[0_0_4px_purple] 
                     hover:border-purple-400/80 transition-all cursor-pointer min-w-[160px]"
          >
            {NARRATIVE_TIER_OPTIONS.map(option => (
              <option key={option.value} value={option.value} className="bg-[#1a1a1a] text-white">
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          
          {/* Tier Info Display */}
          <div className="mt-2 text-xs text-gray-400 font-mono">
            Showing: {filteredNodes.length} / {nodes.length} nodes
          </div>
        </div>
      </div>

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
        nodes={filteredNodes}
        edges={edges}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
