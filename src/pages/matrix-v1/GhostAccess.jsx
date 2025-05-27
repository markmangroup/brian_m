import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

const LINES = [
  'ACCESS GRANTED',
  'You are now cleared for Ghost Protocol Layer 1.'
];

export default function GhostAccess() {
  const [typedLines, setTypedLines] = useState([]); // lines that are fully typed
  const [currentLine, setCurrentLine] = useState(''); // currently typing line
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Typewriter effect: type one line at a time
  useEffect(() => {
    if (lineIdx >= LINES.length) {
      setDone(true);
      setTimeout(() => setShowButton(true), 2500);
      return;
    }
    if (charIdx < LINES[lineIdx].length) {
      const t = setTimeout(() => {
        setCurrentLine(LINES[lineIdx].slice(0, charIdx + 1));
        // Play beep for each char (optional)
        // if (audioRef.current && LINES[lineIdx][charIdx] && LINES[lineIdx][charIdx] !== ' ') {
        //   audioRef.current.currentTime = 0;
        //   audioRef.current.play();
        // }
        setCharIdx(charIdx + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => {
        setTypedLines((prev) => [...prev, LINES[lineIdx]]);
        setCurrentLine('');
        setLineIdx(lineIdx + 1);
        setCharIdx(0);
      }, 350);
    }
  }, [lineIdx, charIdx]);

  // Blinking cursor
  const showCursor = !done || (done && !showButton);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Dimmed, blurred Matrix rain */}
      {typeof window !== 'undefined' && (
        <>
          <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(2px) brightness(0.7)' }} />
          <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
        </>
      )}
      {/* <audio ref={audioRef} src="/terminal-beep.mp3" preload="auto" /> */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="mx-auto px-10 py-14 max-w-2xl w-full flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: 'rgba(0,0,0,0.92)',
            boxShadow: '0 0 40px 8px #00FF00, 0 0 80px 0 #00FF0044',
            borderRadius: '1.5rem',
            border: 'none',
            minHeight: '320px',
            position: 'relative',
          }}
        >
          <div className="text-3xl md:text-4xl font-bold text-green-400 text-center tracking-widest mb-6 select-none">
            {typedLines[0] || (lineIdx === 0 ? currentLine : null)}
            {lineIdx === 0 && showCursor && <span className="animate-blink">_</span>}
          </div>
          <div className="text-xl md:text-2xl text-green-300 text-center tracking-wide min-h-[2.5em] select-none">
            {typedLines[1] || (lineIdx === 1 ? currentLine : null)}
            {lineIdx === 1 && showCursor && <span className="animate-blink">_</span>}
          </div>
          {showButton && (
            <button
              className="mt-12 px-10 py-4 rounded-lg border-2 border-green-400 text-green-200 text-2xl font-bold shadow-[0_0_20px_#00FF00] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#00FF00] focus:outline-none focus:ring-4 focus:ring-green-400/40 animate-fade-in flex items-center gap-2"
              style={{
                textShadow: '0 0 12px #00FF00, 0 0 2px #fff',
                animationDelay: '0.2s',
              }}
              onClick={() => navigate('/matrix-v1/ghost-layer-1')}
            >
              <span className="animate-flicker">&rarr; Enter the Ghost Layer</span>
              <span className="animate-blink">_</span>
            </button>
          )}
        </div>
      </div>
      <style>{`
        .animate-blink {
          animation: blink-cursor 1.1s steps(1) infinite alternate;
        }
        @keyframes blink-cursor {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-flicker {
          animation: flicker 1.2s infinite alternate;
        }
        @keyframes flicker {
          0% { opacity: 1; }
          80% { opacity: 0.85; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
