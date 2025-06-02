import React from 'react';

export default function DetailPanel({ node, onClose }) {
  if (!node) return null;
  return (
    <div className="absolute top-20 right-4 w-80 bg-black/95 border border-green-400/30 rounded p-4 text-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-green-400 font-bold">{node.data?.title || node.id}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-gray-400">Status:</span> {node.data?.status || 'unknown'}
        </div>
        {node.data?.characters && (
          <div>
            <span className="text-gray-400">Characters:</span> {node.data.characters.join(', ')}
          </div>
        )}
        {node.data?.puzzles && (
          <div>
            <span className="text-gray-400">Puzzles:</span> {node.data.puzzles.join(', ')}
          </div>
        )}
        {node.data?.summary && (
          <div>
            <span className="text-gray-400">Summary:</span> {node.data.summary}
          </div>
        )}
      </div>
    </div>
  );
}

