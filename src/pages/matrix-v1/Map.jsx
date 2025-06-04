import React, { useState, useMemo, useRef } from 'react';
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

// Simulated story paths for demonstration
const STORY_PATHS = {
  'night-city': [
    { id: 'nc-entry', label: 'Night City Entry', status: 'completed' },
    { id: 'nc-bouncer', label: 'Afterlife Bouncer', status: 'completed' },
    { id: 'nc-netdiver', label: 'Netrunner Dive', status: 'current' },
    { id: 'nc-file', label: 'Data Theft', status: 'upcoming' },
    { id: 'nc-final-protocol', label: 'Final Protocol', status: 'upcoming' }
  ],
  'matrix-main': [
    { id: 'scene-1', label: 'The Matrix', status: 'completed' },
    { id: 'dialogue-1', label: 'Morpheus Introduction', status: 'completed' },
    { id: 'choice-1', label: 'Red/Blue Pill Choice', status: 'current' },
    { id: 'training-hub', label: 'Training Entry', status: 'upcoming' },
    { id: 'ending-1', label: 'The One', status: 'upcoming' }
  ],
  'training': [
    { id: 'training-hub', label: 'Training Entry', status: 'completed' },
    { id: 'guardian-call', label: 'AWAKEN Challenge', status: 'completed' },
    { id: 'data-filter', label: 'Signal Filtering', status: 'current' },
    { id: 'code-match', label: 'Memory Puzzle', status: 'upcoming' }
  ]
};

export default function MapPage() {
  const [devView, setDevView] = useState(false);
  const [selectedTier, setSelectedTier] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('night-city');
  const mapCanvasRef = useRef(null);

  console.log('Rendering nodes:', nodes);

  // Filter nodes based on selected narrative tier
  const filteredNodes = useMemo(() => {
    if (selectedTier === 'all') {
      return nodes;
    }
    return nodes.filter(node => node.narrativeTier === selectedTier);
  }, [selectedTier]);

  const currentStoryPath = STORY_PATHS[selectedPath] || [];

  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
  };

  const handlePathChange = (event) => {
    setSelectedPath(event.target.value);
  };

  const handleNodeClick = (nodeId) => {
    // Find the node and center it in the map
    const targetNode = nodes.find(node => node.id === nodeId);
    if (targetNode && mapCanvasRef.current) {
      mapCanvasRef.current.centerNode(nodeId);
    }
  };

  const getNodeIcon = (nodeType, status) => {
    const icons = {
      'scene': '🎬',
      'dialogue': '💬', 
      'choice': '🤔',
      'ending': '🏁',
      'npc': '👤',
      'faction': '⚔️',
      'training': '🧪',
      'end': '🛑'
    };
    
    const statusIcons = {
      'completed': '✅',
      'current': '👁️',
      'upcoming': '⏳'
    };
    
    return `${statusIcons[status] || '📍'} ${icons[nodeType] || '📄'}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400/60 bg-green-900/20';
      case 'current': return 'text-cyan-400 border-cyan-400/60 bg-cyan-900/30 shadow-[0_0_4px_cyan]';
      case 'upcoming': return 'text-gray-400 border-gray-600/60 bg-gray-900/20';
      default: return 'text-purple-400 border-purple-400/60 bg-purple-900/20';
    }
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

      {/* Scene Path View Drawer */}
      <div className={`fixed top-0 right-0 h-full z-40 transition-transform duration-300 ease-in-out ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Drawer Toggle Button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full 
                     bg-[#111] border border-orange-400/60 text-orange-400 px-3 py-4 
                     font-mono text-sm font-semibold shadow-[0_0_8px_orange] 
                     hover:bg-[#222] hover:shadow-[0_0_12px_orange] transition-all
                     ${drawerOpen ? 'rounded-l-lg' : 'rounded-l-lg'}`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">🗺️</span>
            <span className="text-xs writing-mode-vertical transform -rotate-90">
              {drawerOpen ? 'Close' : 'Path'}
            </span>
          </div>
        </button>

        {/* Drawer Content */}
        <div className="w-80 h-full bg-[#111] border-l border-orange-400/60 shadow-[-8px_0_16px_rgba(255,165,0,0.2)] backdrop-blur-sm">
          <div className="p-4 border-b border-orange-400/30">
            <h2 className="text-orange-400 font-mono font-bold text-lg mb-2 flex items-center gap-2">
              🗺️ Scene Path View
            </h2>
            <p className="text-orange-300/80 font-mono text-xs mb-4">
              Live tracking of story progression
            </p>
            
            {/* Path Selector */}
            <div className="mb-4">
              <label htmlFor="path-selector" className="block text-orange-400 font-mono text-sm font-semibold mb-2">
                Current Story Path:
              </label>
              <select
                id="path-selector"
                value={selectedPath}
                onChange={handlePathChange}
                className="w-full bg-[#1a1a1a] text-white border border-orange-400/60 rounded px-3 py-2 font-mono text-sm
                         focus:outline-none focus:border-orange-400 focus:shadow-[0_0_4px_orange] 
                         hover:border-orange-400/80 transition-all cursor-pointer"
              >
                <option value="night-city">🌆 Night City Arc</option>
                <option value="matrix-main">🔴 Matrix Main Path</option>
                <option value="training">🧪 Training Sequence</option>
              </select>
            </div>
          </div>

          {/* Path Timeline */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {currentStoryPath.map((pathNode, index) => {
                const nodeData = nodes.find(n => n.id === pathNode.id);
                const nodeType = nodeData?.type || 'scene';
                
                return (
                  <div key={pathNode.id} className="relative">
                    {/* Connection Line */}
                    {index < currentStoryPath.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-6 bg-orange-400/30"></div>
                    )}
                    
                    {/* Node Item */}
                    <button
                      onClick={() => handleNodeClick(pathNode.id)}
                      className={`w-full text-left p-3 rounded-lg border font-mono text-sm transition-all
                                 hover:scale-105 hover:shadow-lg group ${getStatusColor(pathNode.status)}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg flex-shrink-0 mt-0.5">
                          {getNodeIcon(nodeType, pathNode.status)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm mb-1 truncate">
                            {pathNode.label}
                          </div>
                          <div className="text-xs opacity-60 mb-1">
                            ID: {pathNode.id}
                          </div>
                          <div className="text-xs opacity-80 capitalize">
                            {pathNode.status} • {nodeType}
                          </div>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs">🎯</span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Path Stats */}
            <div className="mt-6 pt-4 border-t border-orange-400/30">
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-green-900/30 border border-green-400/30 rounded p-2">
                  <div className="text-green-400 font-semibold">
                    {currentStoryPath.filter(n => n.status === 'completed').length}
                  </div>
                  <div className="text-green-300/80">Done</div>
                </div>
                <div className="bg-cyan-900/30 border border-cyan-400/30 rounded p-2">
                  <div className="text-cyan-400 font-semibold">
                    {currentStoryPath.filter(n => n.status === 'current').length}
                  </div>
                  <div className="text-cyan-300/80">Active</div>
                </div>
                <div className="bg-gray-900/30 border border-gray-400/30 rounded p-2">
                  <div className="text-gray-400 font-semibold">
                    {currentStoryPath.filter(n => n.status === 'upcoming').length}
                  </div>
                  <div className="text-gray-300/80">Next</div>
                </div>
              </div>
            </div>
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
        ref={mapCanvasRef}
        nodes={filteredNodes}
        edges={edges}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
