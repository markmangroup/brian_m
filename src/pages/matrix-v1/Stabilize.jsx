import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Stabilize({ testSequence }) {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [active, setActive] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [successFlash, setSuccessFlash] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  const playPreview = useCallback((seq) => {
    setInputEnabled(false);
    let i = 0;
    function flash() {
      setActive(seq[i]);
      setTimeout(() => {
        setActive(null);
        i += 1;
        if (i < seq.length) {
          setTimeout(flash, 400);
        } else {
          setTimeout(() => {
            setInputEnabled(true);
          }, 400);
        }
      }, 300);
    }
    flash();
  }, []);

  const startRound = useCallback(() => {
    const len = testSequence ? testSequence.length : Math.floor(Math.random() * 3) + 3;
    const seq = testSequence || Array.from({ length: len }, () => Math.floor(Math.random() * 4));
    setSequence(seq);
    setUserInput([]);
    setSuccessFlash(false);
    setMessage('');
    playPreview(seq);
  }, [playPreview, testSequence]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const handleSelect = (index) => {
    if (!inputEnabled) return;
    const next = userInput.length;
    if (sequence[next] === index) {
      const updated = [...userInput, index];
      setUserInput(updated);
      if (updated.length === sequence.length) {
        setInputEnabled(false);
        setSuccessFlash(true);
        localStorage.setItem('matrixV1Stabilize', 'complete');
        setMessage('System stabilized!');
      }
    } else {
      setInputEnabled(false);
      setShake(true);
      setMessage('Try Again');
      setTimeout(() => {
        setShake(false);
        setMessage('');
        startRound();
      }, 700);
    }
  };

  const squares = [0, 1, 2, 3];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-4">
      <div className="bg-gray-800 px-4 py-2 rounded shadow-md text-center space-y-1">
        <h1 className="text-xl font-bold">Stabilize the System</h1>
        <div className="text-sm text-green-400">Sequence: {userInput.length} of {sequence.length}</div>
      </div>
      <div className={`grid grid-cols-2 gap-4 ${shake ? 'animate-shake' : ''} ${successFlash ? 'animate-flash-green' : ''}`}>
        {squares.map((sq) => (
          <div
            key={sq}
            role="button"
            aria-label={`square-${sq}`}
            onClick={() => handleSelect(sq)}
            className={`w-20 h-20 border-2 border-green-500 transition-all ${active === sq ? 'bg-green-400 animate-glow-green' : 'bg-gray-800'} ${inputEnabled ? 'cursor-pointer hover:brightness-110 active:scale-95' : ''}`}
          />
        ))}
      </div>
      <div className="h-6 text-center">
        {message && (
          <p className={`${successFlash ? 'text-green-400 animate-pulse' : 'text-red-400'}`}>{message}</p>
        )}
      </div>
      {successFlash && (
        <button
          onClick={startRound}
          className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
        >
          Try another sequence
        </button>
      )}
    </div>
  );
}
