import React from 'react';

const baseCard =
  'rounded shadow-lg p-4 w-72 font-sans transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-90 hover:scale-105 transition-transform';

const accent = {
  scene: 'border-2 border-purple-500 bg-purple-100',
  dialogue: 'border-2 border-blue-500 bg-blue-100',
  choice: 'border-2 border-green-500 bg-green-100',
  ending: 'border-2 border-red-500 bg-red-100',
  npc: 'border-2 border-yellow-900 bg-yellow-100',
  faction: 'border-2 border-yellow-500 bg-yellow-50',
  training: 'border-2 border-pink-500 bg-pink-100',
  end: 'border-2 border-gray-500 bg-gray-100',
};

export const SceneNode = ({ data = {}, type = 'scene' }) => (
  <div className={`${baseCard} ${accent[type || 'scene'] || accent.scene}`}> 
    <h3 className="font-bold mb-2">🎬 {data.title || 'Untitled Scene'}</h3>
    <p className="text-gray-700 mb-2">{data.description || 'No description.'}</p>
    {data.setting && (
      <div className="text-xs text-gray-600 italic">📍 Setting: {data.setting}</div>
    )}
  </div>
);

export const DialogueNode = ({ data = {}, type = 'dialogue' }) => (
  <div className={`${baseCard} ${accent[type || 'dialogue'] || accent.dialogue}`}>
    <div className="text-blue-700 text-sm mb-1 font-semibold">{data.character || 'Unknown'}</div>
    <p className="text-black mb-2">{data.dialogue || '...'}</p>
    <div className="text-gray-500 text-xs">{data.emotion || 'neutral'}</div>
  </div>
);

export const ChoiceNode = ({ data = {}, type = 'choice' }) => (
  <div className={`${baseCard} ${accent[type || 'choice'] || accent.choice}`}>
    <h3 className="text-green-700 font-bold mb-2">{data.prompt || 'Make a choice...'}</h3>
    <div className="space-y-2">
      {(data.options || []).map((option, index) => (
        <div key={index} className="text-gray-800 text-sm bg-white/80 p-2 rounded border border-green-300">
          {option}
        </div>
      ))}
    </div>
  </div>
);

export const EndingNode = ({ data = {}, type = 'ending' }) => (
  <div className={`${baseCard} ${accent[type || 'ending'] || accent.ending}`}>
    <div className="text-red-700 text-sm mb-1 font-semibold">{data.outcome || 'Unknown'}</div>
    <h3 className="font-bold mb-2">{data.title || 'Untitled Ending'}</h3>
    <p className="text-gray-700 text-sm">{data.description || 'No description.'}</p>
  </div>
); 