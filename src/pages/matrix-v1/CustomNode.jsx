import React from 'react';

export const SceneNode = ({ data = {} }) => {
  return (
    <div className="bg-purple-200 border border-purple-600 text-sm p-4 rounded shadow-lg w-72">
      <h3 className="font-bold mb-2">🎬 {data.title || 'Untitled Scene'}</h3>
      <p className="text-gray-700 mb-2">{data.description || 'No description.'}</p>
      {data.setting && (
        <div className="text-xs text-gray-600 italic">📍 Setting: {data.setting}</div>
      )}
    </div>
  );
};

const DialogueNode = ({ data }) => {
  const { character = 'Unknown', dialogue = '...', emotion = 'neutral' } = data;
  
  return (
    <div className="bg-gray-800 border-2 border-blue-500 rounded-lg p-4 w-64 shadow-lg">
      <div className="text-blue-400 text-sm mb-1">{character}</div>
      <p className="text-white mb-2">{dialogue}</p>
      <div className="text-gray-400 text-xs">{emotion}</div>
    </div>
  );
};

const ChoiceNode = ({ data }) => {
  const { prompt = 'Make a choice...', options = [] } = data;
  
  return (
    <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-4 w-64 shadow-lg">
      <h3 className="text-green-400 font-bold mb-2">{prompt}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="text-gray-300 text-sm bg-gray-700 p-2 rounded">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const EndingNode = ({ data }) => {
  const { title = 'Untitled Ending', outcome = 'Unknown', description = 'No description' } = data;
  
  return (
    <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-4 w-64 shadow-lg">
      <div className="text-red-400 text-sm mb-1">{outcome}</div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export { DialogueNode, ChoiceNode, EndingNode }; 