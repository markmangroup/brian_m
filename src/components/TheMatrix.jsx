import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TheMatrix() {
  const [name, setName] = useState('');
  const [entered, setEntered] = useState(false);
  const [pill, setPill] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
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

  return (
    <div className="flex flex-col items-center justify-center py-20 text-green-500 font-mono space-y-6">
      <h1 className="text-5xl font-bold animate-pulse">Welcome, {name}</h1>
      {pill === null && (
        <>
          <p className="text-xl">You are now inside the Matrix.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/matrix-terminal')}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
            >
              Red Pill
            </button>
            <button
              onClick={() => setPill('blue')}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Blue Pill
            </button>
          </div>
        </>
      )}


      {pill === 'blue' && (
        <p className="text-xl">You take the blue pill and wake up in your bed.</p>
      )}

      {(pill === 'red' || pill === 'blue') && (
        <button
          onClick={() => setPill(null)}
          className="px-4 py-2 mt-4 rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      )}
    </div>
  );
}
