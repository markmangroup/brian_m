import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

const MESSAGE = 'ACCESS GRANTED\nYou are now cleared for Ghost Protocol Layer 1.';

export default function GhostAccess() {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    let i = 0;
    setTyped('');
    setDone(false);
    setShowButton(false);
    const interval = setInterval(() => {
      setTyped((t) => t + MESSAGE[i]);
      // Optional: play beep for each char
      // if (audioRef.current && MESSAGE[i] && MESSAGE[i] !== '\n' && MESSAGE[i] !== ' ') {
      //   audioRef.current.currentTime = 0;
      //   audioRef.current.play();
      // }
      i++;
      if (i >= MESSAGE.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => setShowButton(true), 3000);
      }
    }, 32);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      {/* <audio ref={audioRef} src="/terminal-beep.mp3" preload="auto" /> */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-black/80 border border-green-700 rounded-xl shadow-2xl px-10 py-12 max-w-lg w-full flex flex-col items-center animate-fade-in">
          <pre className="text-2xl whitespace-pre-line tracking-wide select-none min-h-[4.5em]">{typed}</pre>
          {showButton && (
            <button
              className="mt-10 px-8 py-3 rounded bg-green-700 text-black text-xl font-bold hover:bg-green-600 shadow-lg transition-opacity duration-700 animate-fade-in"
              onClick={() => navigate('/matrix-v1/ghost-layer-1')}
            >
              &rarr; Enter the Ghost Layer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
