import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from './MatrixRain';
import MatrixSceneWrapper from './MatrixSceneWrapper';

export default function EchoLoop() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(null);
  const [message, setMessage] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSelect = (option) => {
    setSelection(option);
    if (option === 'A') {
      setMessage('Access granted');
      setTimeout(() => navigate('/matrix-v1/echo-verify'), 500);
    } else if (option === 'B') {
      setMessage('Signal distortion detected');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    } else if (option === 'C') {
      setMessage('SYSTEM ERROR');
      setTimeout(() => {
        setMessage('');
        setSelection(null);
      }, 800);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-black text-green-500 font-mono relative overflow-hidden ${shaking ? 'shake' : ''}`}
    >
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <MatrixSceneWrapper
        title="Echo System Diagnostic"
        subtitle="Choose your path:"
        status="🧠 Active"
      >
        <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
          <div className="flex space-x-4">
            <button onClick={() => handleSelect('A')} className="px-4 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors">Option A</button>
            <button onClick={() => handleSelect('B')} className="px-4 py-2 rounded bg-yellow-900 text-yellow-500 hover:bg-yellow-800 transition-colors">Option B</button>
            <button onClick={() => handleSelect('C')} className="px-4 py-2 rounded bg-red-900 text-red-500 hover:bg-red-800 transition-colors">Option C</button>
          </div>
          {message && (
            <div className={`mt-4 text-lg ${selection === 'C' ? 'text-red-500' : ''}`}>{message}</div>
          )}
        </div>
      </MatrixSceneWrapper>
    </div>
  );
}
