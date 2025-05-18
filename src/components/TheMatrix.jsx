import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function TheMatrix() {
  const { userName, setUserName } = useContext(UserContext);
  const [name, setName] = useState(userName || '');
  const [entered, setEntered] = useState(!!userName);
  const navigate = useNavigate();

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
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-4xl font-bold text-green-500 font-mono">Enter the Matrix</h1>

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
    );
  }

  /* ───────────── 2. inside the Matrix ───────────── */
  const displayName = userName || name;
  return (
    <div className="flex flex-col items-center justify-center py-20 text-green-500 font-mono space-y-6">
      <h1 className="text-5xl font-bold animate-pulse">Welcome, {displayName}</h1>
      <p className="text-xl">You are now inside the Matrix.</p>
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
    </div>
  );
}
