import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAOE_QUOTES } from '../../data/naoeQuotes';
import Rain from './components/Rain';

export default function Puzzle() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = answer.trim().toLowerCase();
    if (clean === 'yes' || clean === 'y') {
      const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
      setResponse(`${q.text} — ${q.attribution}`);
    } else {
      setResponse('*** SYSTEM GLITCH ***');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold">Do you believe in fate?</h1>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="px-4 py-2 rounded bg-black border border-green-700 text-green-500 placeholder-green-700 focus:outline-none"
            placeholder="your answer"
          />
          <button className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600">Submit</button>
        </form>
        {response && <p className="text-lg text-center max-w-md">{response}</p>}
        {response && (
          <button onClick={() => navigate('/matrix-v1/portal')} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-500">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
