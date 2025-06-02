import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixSceneWrapper from '../../components/MatrixSceneWrapper';

export default function GuardianCall({ testSequence }) {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState([]); // two tile indexes
  const [highlighted, setHighlighted] = useState([]); // tiles shown during preview
  const [userInput, setUserInput] = useState([]); // tiles clicked by user
  const [inputEnabled, setInputEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [successFlash, setSuccessFlash] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const alreadyLinked = localStorage.getItem('guardianLinked') === 'true';

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  const randomPair = () => {
    const options = Array.from({ length: 9 }, (_, i) => i);
    const first = options.splice(Math.floor(Math.random() * options.length), 1)[0];
    const second = options[Math.floor(Math.random() * options.length)];
    return [first, second];
  };

  const preview = useCallback((seq) => {
    setInputEnabled(false);
    setHighlighted(seq);
    setTimeout(() => {
      setHighlighted([]);
      setInputEnabled(true);
    }, 1500);
  }, []);

  const startRound = useCallback(() => {
    const seq = testSequence || randomPair();
    setSequence(seq);
    setUserInput([]);
    setSuccessFlash(false);
    setShowRetry(false);
    setMessage('');
    preview(seq);
  }, [preview, testSequence]);

  useEffect(() => {
    if (!alreadyLinked) {
      startRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (index) => {
    if (!inputEnabled || userInput.includes(index)) return;
    const updated = [...userInput, index];
    setUserInput(updated);
    if (updated.length === 2) {
      setInputEnabled(false);
      const sortedInput = [...updated].sort();
      const sortedSeq = [...sequence].sort();
      if (sortedInput[0] === sortedSeq[0] && sortedInput[1] === sortedSeq[1]) {
        setSuccessFlash(true);
        setMessage('Guardian Link Established');
        localStorage.setItem('guardianLinked', 'true');
      } else {
        setShake(true);
        setMessage('Try Again');
        setShowRetry(true);
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  const tiles = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="min-h-screen flex flex-col bg-black text-green-500 font-mono relative">
      <MatrixSceneWrapper
        title="Synchronize with Guardian"
        subtitle="Identify the sync points"
        status="🧠 Active"

      />
      <div className="mt-8 flex flex-col items-center min-h-[60vh]">
        {alreadyLinked ? (
          <p className="text-green-400 text-xl">Already Linked</p>
        ) : (
          <>
            <div
              className={`grid grid-cols-3 gap-4 ${shake ? 'animate-shake' : ''} ${
                successFlash ? 'animate-flash-green' : ''
              }`}
            >
              {tiles.map((t) => (
                <div
                  key={t}
                  role="button"
                  aria-label={`square-${t}`}
                  onClick={() => handleSelect(t)}
                  className={`w-16 h-16 border-2 border-green-500 transition-all ${
                    highlighted.includes(t) ? 'bg-green-400 animate-glow-green' : 'bg-gray-800'
                  } ${inputEnabled ? 'cursor-pointer hover:brightness-110 active:scale-95' : ''}`}
                />
              ))}
            </div>
            <div className="h-6 text-center">
              {message && (
                <p className={`${successFlash ? 'text-green-400 animate-pulse' : 'text-red-400'}`}>{message}</p>
              )}
            </div>
            {showRetry && (
              <button
                onClick={startRound}
                className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
              >
                Retry
              </button>
            )}
          </>
        )}
      </div>

      >
        <div className="mt-8 flex flex-col items-center min-h-[60vh] space-y-4">
          {alreadyLinked ? (
            <p className="text-green-400 text-xl">Already Linked</p>
          ) : (
            <>
              <div
                className={`grid grid-cols-3 gap-4 ${shake ? 'animate-shake' : ''} ${
                  successFlash ? 'animate-flash-green' : ''
                }`}
              >
                {tiles.map((t) => (
                  <div
                    key={t}
                    role="button"
                    aria-label={`square-${t}`}
                    onClick={() => handleSelect(t)}
                    className={`w-16 h-16 border-2 border-green-500 transition-all ${
                      highlighted.includes(t) ? 'bg-green-400 animate-glow-green' : 'bg-gray-800'
                    } ${inputEnabled ? 'cursor-pointer hover:brightness-110 active:scale-95' : ''}`}
                  />
                ))}
              </div>
              <div className="h-6 text-center">
                {message && (
                  <p className={`${successFlash ? 'text-green-400 animate-pulse' : 'text-red-400'}`}>{message}</p>
                )}
              </div>
              {showRetry && (
                <button
                  onClick={startRound}
                  className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
                >
                  Retry
                </button>
              )}
            </>
          )}
        </div>
      </MatrixSceneWrapper>

    </div>
  );
}
