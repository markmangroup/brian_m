import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';

const MSG_YES = [
  'Forking Reality',
  'You chose to believe in choice. The path ahead is uncertain, but yours to shape.'
];
const MSG_NO = [
  'Forking Reality',
  'You denied choice. The system will attempt to guide you, but resistance is possible.'
];

export default function Stage3() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [typed, done] = useTypewriterEffect(
    answer === 'yes' ? MSG_YES[msgIndex] : MSG_NO[msgIndex],
    50
  );
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('matrixV1Access')) {
      navigate('/matrix-v1');
    }
    setAnswer(localStorage.getItem('matrixV1Answer_stage2'));
  }, [navigate]);

  useEffect(() => {
    if (done && msgIndex < 1) {
      const t = setTimeout(() => setMsgIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    }
    if (done && msgIndex === 1) {
      setShowChoices(true);
    }
  }, [done, msgIndex]);

  const handlePath = (path) => {
    localStorage.setItem('matrixV1Fork', path);
    if (path === 'A') {
      navigate('/profile-report');
    } else {
      navigate('/hidden-path');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold">Forking Reality</h1>
        <p className="text-lg text-center whitespace-pre-line">{typed}</p>
        {showChoices && (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xl font-mono">Choose your path:</div>
            <div className="flex space-x-4">
              <button
                onClick={() => handlePath('A')}
                className="px-6 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
              >
                Path A
              </button>
              <button
                onClick={() => handlePath('B')}
                className="px-6 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
              >
                Path B
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 