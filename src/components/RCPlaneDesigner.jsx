import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const planeTypes = [
  { id: 'glider', name: 'Glider' },
  { id: 'stunt', name: 'Stunt' },
  { id: 'speed', name: 'Speed' }
];

const colors = [
  { id: 'red', name: 'Red', value: '#f87171' },
  { id: 'blue', name: 'Blue', value: '#60a5fa' },
  { id: 'green', name: 'Green', value: '#34d399' }
];

export default function RCPlaneDesigner() {
  const [type, setType] = useState('glider');
  const [color, setColor] = useState(colors[0].value);

  return (
    <div className="p-4 space-y-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-300 flex items-center gap-2">
        <FaPaperPlane /> RC Plane Designer
      </h1>
      <div className="bg-gray-800 p-4 rounded-xl space-y-4 w-full max-w-sm">
        <div>
          <h2 className="font-semibold mb-2">1. Choose a plane type</h2>
          <div className="flex gap-2">
            {planeTypes.map(p => (
              <button
                key={p.id}
                onClick={() => setType(p.id)}
                className={`flex-1 py-1 rounded-lg text-sm ${
                  type === p.id ? 'bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">2. Pick a color</h2>
          <div className="flex gap-2">
            {colors.map(c => (
              <button
                key={c.id}
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c.value ? 'border-white' : 'border-gray-700'
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-40 h-40 bg-gray-800 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
        <FaPaperPlane className="text-6xl" />
      </div>
      <p className="text-sm text-gray-400 text-center max-w-xs">
        This is a simple starting point. Choose a type and color for your plane. More build options will go here soon!
      </p>
    </div>
  );
}
