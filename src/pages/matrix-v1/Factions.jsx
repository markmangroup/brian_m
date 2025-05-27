import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

const FACTIONS = [
  {
    id: 'signal-brokers',
    name: 'Signal Brokers',
    quote: 'We study deviations.',
    symbol: '📡',
    mission: 'Catalog anomalies and map patterns in the Matrix.',
  },
  {
    id: 'oblivion-hand',
    name: 'Oblivion Hand',
    quote: 'We erase threats.',
    symbol: '🖐️',
    mission: 'Silence any entity that endangers system order.',
  },
  {
    id: 'architects-silence',
    name: 'Architects of Silence',
    quote: 'We predate the system.',
    symbol: '🏛️',
    mission: 'Shape reality from the shadows beyond the code.',
  },
];

export default function Factions() {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/matrix-v1/align-${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold">Who Watches You</h1>
        <ul className="space-y-4 w-full">
          {FACTIONS.map((f) => (
            <li key={f.id} className="bg-black/60 backdrop-blur-sm border border-green-700 p-4 rounded-lg flex items-start">
              <div className="text-2xl mr-4" aria-hidden="true">{f.symbol}</div>
              <div className="flex-1">
                <div className="font-bold">{f.name}</div>
                <div className="italic text-sm mb-1">"{f.quote}"</div>
                <div className="text-sm">{f.mission}</div>
              </div>
              <button
                aria-label={`select ${f.name}`}
                onClick={() => handleSelect(f.id)}
                className="ml-4 px-3 py-1 rounded bg-green-900 text-green-500 hover:bg-green-800"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/matrix-v1')}
          className="px-4 py-2 rounded bg-red-900 text-red-400 hover:bg-red-800"
        >
          Return
        </button>
      </div>
    </div>
  );
}
