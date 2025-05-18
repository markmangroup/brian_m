import React, { useState } from 'react';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';
import { useNavigate } from 'react-router-dom';

export default function MatrixTerminal() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [typedMessage, done] = useTypewriterEffect(message);
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();
  const secret = 'thereisnospoon';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase() === secret) {
      const newQuote = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
      setQuote(newQuote);
      setMessage('Access granted. Welcome to the real world.');
      navigate('/matrix-transition', { state: { quote: newQuote } });
    } else {
      setMessage('Access denied. Try again.');
    }
  };

  const success = message.startsWith('Access granted');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6">
      <h1 className="text-4xl font-bold">Matrix Terminal</h1>
      <p className="text-lg">You take the red pill and follow the white rabbit...</p>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter passcode"
          className="px-4 py-2 rounded bg-black border border-green-700 placeholder-green-700 focus:outline-none"
        />
        <button type="submit" className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600">
          Hack
        </button>
      </form>
      {message && (
        <p
          className="text-xl text-green-400"
          style={success ? { textShadow: '0 0 8px #00ff00' } : undefined}
        >
          {success ? typedMessage : message}
        </p>
      )}
    </div>
  );
}
