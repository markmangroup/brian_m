import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import NPC from './components/NPC';

function reverse(str) {
  return str.split('').reverse().join('');
}

const MESSAGES = [
  '...sign4l br3ach...',
  'Misfire: ::NPC:: //??',
  'You are no longer being tracked.'
];

export default function Interference() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [typed, done] = useTypewriterEffect(reverse(MESSAGES[index] || ''), 50);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && index < MESSAGES.length - 1) {
      const t = setTimeout(() => setIndex(i => i + 1), 800);
      return () => clearTimeout(t);
    }
    if (done && index === MESSAGES.length - 1) {
      setShowOptions(true);
    }
  }, [done, index]);

  const stabilize = () => navigate('/matrix-v1/stabilize');
  const descend = () => navigate('/matrix-v1/error-loop');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <p className="text-xl text-center whitespace-pre">{typed}</p>
        {showOptions && (
          <>
            <NPC name="Archivist?" quote="Sy$t3m err..." style="oracle" />
            <NPC name="Agent Shadow" quote="T-r-a-c-k-l-o-s-t" style="agent" />
            <div className="flex space-x-4 mt-4">
              <button onClick={stabilize} className="px-6 py-2 rounded bg-purple-900 text-purple-400 hover:bg-purple-800">
                Try to stabilize
              </button>
              <button onClick={descend} className="px-6 py-2 rounded bg-red-900 text-red-400 hover:bg-red-800">
                Descend further
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
