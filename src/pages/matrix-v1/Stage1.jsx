import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';

const MESSAGES = [
  'The First Gate',
  'Beyond the simulation, reality is stranger than fiction.',
  'To proceed, you must unlock access. Choose the keyword that breaks the illusion.'
];

const OPTIONS = ['Matrix', 'Awake', 'Rabbit', 'Control'];
const CORRECT = 'Awake';

export default function Stage1() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [typed, done] = useTypewriterEffect(MESSAGES[msgIndex], 50);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('matrixV1Access')) {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && msgIndex < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    }
  }, [done, msgIndex]);

  const handleSelect = (option) => {
    if (option === CORRECT) {
      navigate('/matrix-v1/stage-2');
    } else {
      setError('Access denied. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold">{msgIndex === 0 ? typed : 'The First Gate'}</h1>
        {msgIndex > 0 && <p className="text-lg text-center whitespace-pre-line">{typed}</p>}
        {msgIndex === 2 && done && (
          <div className="flex flex-col items-center space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
} 