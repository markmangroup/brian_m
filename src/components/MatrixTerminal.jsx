import React, { useState, useEffect } from 'react';
import { NAOE_QUOTES } from '../data/naoeQuotes';

export default function MatrixTerminal() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const secret = 'thereisnospoon';

  // check localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem('matrixAccess');
    if (stored === 'true') {
      const quote = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
      setMessage(
        `Access granted. Welcome to the real world. ${quote.text} — ${quote.attribution}`
      );
      setHasAccess(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase() === secret) {
      const quote = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
      setMessage(
        `Access granted. Welcome to the real world. ${quote.text} — ${quote.attribution}`
      );
      localStorage.setItem('matrixAccess', 'true');
      setHasAccess(true);
    } else {
      setMessage('Access denied. Try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('matrixAccess');
    setHasAccess(false);
    setMessage('');
    setCode('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6">
      <h1 className="text-4xl font-bold">Matrix Terminal</h1>
      <p className="text-lg">You take the red pill and follow the white rabbit...</p>
      {!hasAccess && (
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
      )}
      {message && <p className="text-xl">{message}</p>}
      {hasAccess && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          Log out
        </button>
      )}
    </div>
  );
}
