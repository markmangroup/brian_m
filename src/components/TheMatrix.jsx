import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixRain from './MatrixRain';

export default function TheMatrix() {
  const { userName, setUserName } = useContext(UserContext);
  const [name, setName] = useState(userName || '');
  const [entered, setEntered] = useState(!!userName);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [welcomeText] = useTypewriterEffect('Welcome to the Matrix', 50);
  const [promptText] = useTypewriterEffect('Enter your name to begin:', 50);

  const displayName = userName || name;

  const story = [
    { speaker: '😎 Morpheus', text: `Hello, ${displayName}. I am Morpheus.` },
    { speaker: '👓 Trinity', text: 'We have been looking for you.' },
    { speaker: '😎 Morpheus', text: 'This is your chance to learn the truth.' }
  ];
>>> master

  /* ───────────── 1. name prompt ───────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      setUserName(trimmed);
      setEntered(true);
    }
  };

  if (!entered) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 min-h-screen relative overflow-hidden">
        {/* Matrix Rain background for name prompt (client-only) */}
        {typeof window !== 'undefined' && (
          <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        )}
        {/* Storyboard: User sees welcome and prompt, enters name */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold text-green-500 font-mono">{welcomeText}</h1>
          <p className="text-xl">{promptText}</p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Player Name"
              className="px-4 py-2 rounded bg-black border border-green-700 text-green-500 placeholder-green-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ───────────── 2. story steps ───────────── */

  return (
    <div className="flex flex-col items-center justify-center py-20 text-green-500 font-mono space-y-6 min-h-screen relative overflow-hidden">
      {/* Matrix Rain background for inside the Matrix (client-only) */}
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-4">
        <p className="text-xl">
          <span className="font-bold mr-2">{current.speaker}:</span> {storyText}
        </p>
        {step < story.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
            disabled={!storyDone}
          >
            Next
          </button>
        )}
        {step === story.length - 1 && storyDone && (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/the-matrix/terminal', { state: { name: displayName } })}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
            >
              Red Pill
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Blue Pill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
