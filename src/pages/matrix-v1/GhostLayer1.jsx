import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

const TYPEWRITER_LINES = [
  'GHOST PROTOCOL LAYER 1',
  `IDENTITY MATCH: 0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
  'TRACE SIGNAL: WEAKENED',
  'DECRYPTION PATH: UNSTABLE',
  'INPUT REQUIRED: SELECT AN OVERRIDE MODULE',
];

export default function GhostLayer1() {
  const navigate = useNavigate();
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (lineIdx >= TYPEWRITER_LINES.length) return;
    if (charIdx < TYPEWRITER_LINES[lineIdx].length) {
      const t = setTimeout(() => setCharIdx(charIdx + 1), 22);
      return () => clearTimeout(t);
    } else {
      setDisplayed((prev) => [...prev, TYPEWRITER_LINES[lineIdx]]);
      setTimeout(() => {
        setLineIdx(lineIdx + 1);
        setCharIdx(0);
      }, 300);
    }
  }, [lineIdx, charIdx]);

  const linesToShow = [...displayed];
  if (lineIdx < TYPEWRITER_LINES.length) {
    linesToShow.push(TYPEWRITER_LINES[lineIdx].slice(0, charIdx));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full animate-fade-in">
        <div className="bg-black/90 rounded-lg px-8 py-10 shadow-2xl border-2 border-green-700 max-w-xl w-full text-center space-y-2 mb-12">
          {linesToShow.map((line, i) => (
            <div key={i} className="text-lg md:text-2xl tracking-widest font-mono text-green-400 animate-typewriter whitespace-pre-line">{line}</div>
          ))}
        </div>
        {lineIdx >= TYPEWRITER_LINES.length && (
          <div className="flex flex-col md:flex-row gap-8 mt-2">
            <button
              className="px-10 py-4 text-2xl font-bold rounded-lg bg-black border-2 border-cyan-400 text-cyan-300 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 animate-glow"
              style={{ textShadow: '0 0 12px #22d3ee, 0 0 2px #fff' }}
              onClick={() => navigate('/matrix-v1/shard-init')}
            >
              [ SHARD.EXE ]
            </button>
            <button
              className="px-10 py-4 text-2xl font-bold rounded-lg bg-black border-2 border-purple-400 text-purple-300 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-purple-400/60 focus:outline-none focus:ring-4 focus:ring-purple-400/40 animate-glow"
              style={{ textShadow: '0 0 12px #a78bfa, 0 0 2px #fff' }}
              onClick={() => navigate('/matrix-v1/echo-loop')}
            >
              [ ECHO.BIN ]
            </button>
          </div>
        )}
      </div>
      <style>{`
        .animate-typewriter {
          animation: typewriter-blink 1.1s steps(1) infinite alternate;
        }
        @keyframes typewriter-blink {
          0% { border-right: 2px solid #22d3ee; }
          100% { border-right: 2px solid transparent; }
        }
        .animate-glow {
          box-shadow: 0 0 16px 2px #22d3ee44, 0 0 2px #fff;
        }
      `}</style>
    </div>
  );
} 