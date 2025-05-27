import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import Rain from './components/Rain';
import NPC from './components/NPC';

export default function Entry() {
  const [name, setName] = useState(() => localStorage.getItem('matrixV1Name') || '');
  const [entered, setEntered] = useState(!!name);
  const navigate = useNavigate();
  const [intro] = useTypewriterEffect('Welcome to the Matrix', 50);
  const [prompt] = useTypewriterEffect('Enter your name to begin:', 50);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      localStorage.setItem('matrixV1Name', trimmed);
      setEntered(true);
    }
  };

  const red = () => navigate('/matrix-v1/terminal', { state: { name } });
  const blue = () => navigate('/');

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 min-h-screen relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {!entered && (
          <>
            <h1 className="text-4xl font-bold text-green-500 font-mono">{intro}</h1>
            <p className="text-xl">{prompt}</p>
            <form onSubmit={submit} className="flex space-x-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Player Name"
                className="px-4 py-2 rounded bg-black border border-green-700 text-green-500 placeholder-green-700 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600">
                Enter
              </button>
            </form>
          </>
        )}
        {entered && (
          <>
            <NPC
              name="Morpheus"
              quote={`I've been waiting for you, ${name}. You've felt it, haven't you?`}
              style="mentor"
              className="mb-2"
            />
            <p className="text-lg">Hello, {name}. Choose your destiny.</p>
            <div className="flex space-x-4">
              <button onClick={red} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500">
                Red Pill
              </button>
              <button onClick={blue} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500">
                Blue Pill
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
