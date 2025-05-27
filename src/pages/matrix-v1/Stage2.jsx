import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';

const MESSAGES = [
  'Interference Detected',
  '...g1i7ch... S3nt1n3l pr0t0c0l engaged...',
  'Sentinel: "Do you believe reality is a choice?"'
];

export default function Stage2() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [typed, done] = useTypewriterEffect(MESSAGES[msgIndex], 50);
  const [showQuestion, setShowQuestion] = useState(false);

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
    if (done && msgIndex === MESSAGES.length - 1) {
      setShowQuestion(true);
    }
  }, [done, msgIndex]);

  const handleAnswer = (answer) => {
    localStorage.setItem('matrixV1Answer_stage2', answer);
    navigate('/matrix-v1/stage-3');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 animate-pulse" style={{ mixBlendMode: 'screen', opacity: 0.2 }}>
        <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-black/80" />
      </div>
      <div className="relative z-30 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold">{msgIndex === 0 ? typed : 'Interference Detected'}</h1>
        {msgIndex > 0 && <p className="text-lg text-center whitespace-pre-line">{typed}</p>}
        {showQuestion && (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xl font-mono">Do you believe reality is a choice?</div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer('yes')}
                className="px-6 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="px-6 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 