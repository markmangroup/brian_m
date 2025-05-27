import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const INSULTS = [
  "Agent Smith: 'You call that memory? My grandma could do better.'",
  "Agent Shadow: 'You DED. Try not to embarrass yourself next time.'",
  "Agent Echo: 'The Matrix is disappointed in you.'",
  "Agent Smith: 'Maybe stick to Tic-Tac-Toe.'",
  "Agent Shadow: 'You DED. But at least you tried... sort of.'",
  "Agent Echo: 'You DED. The Oracle is laughing.'",
  "Agent Smith: 'You DED. Reload and try again, rookie.'",
];

export default function Ded() {
  const navigate = useNavigate();
  const insult = useMemo(() => INSULTS[Math.floor(Math.random() * INSULTS.length)], []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-400 font-mono">
      <h1 className="text-6xl font-extrabold mb-6 animate-pulse">You DED</h1>
      <div className="text-2xl mb-8 text-center max-w-xl">{insult}</div>
      <div className="flex space-x-6">
        <button
          className="px-6 py-3 rounded bg-red-700 text-white text-xl font-bold hover:bg-red-600 shadow-lg"
          onClick={() => navigate('/matrix-v1/stabilize')}
        >
          Try Again
        </button>
        <button
          className="px-6 py-3 rounded bg-gray-700 text-white text-xl font-bold hover:bg-gray-600 shadow-lg"
          onClick={() => navigate('/matrix-v1/map')}
        >
          Return to Map
        </button>
      </div>
    </div>
  );
} 