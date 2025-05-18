import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MatrixPuzzle() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const navigate            = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'red') {
      setSolved(true);
      setTimeout(() => navigate('/portal'), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-green-500 font-mono space-y-6">
      {!solved ? (
        <>
          <p className="text-xl">Answer this to prove you are The One:</p>
          <p>Which pill does Neo take?</p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="px-4 py-2 rounded bg-black border border-green-700 text-green-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <p className="text-xl">Correct! Welcome to the real world...</p>
      )}
    </div>
  );
}
