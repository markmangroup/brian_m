import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

const MORPHEUS_GLITCH = "MORPHEUS (signal-jammed): 'You're too deep. They're watching. Finish what you started.'";

export default function ShardInsert() {
  const navigate = useNavigate();
  const showGlitch = useMemo(() => Math.random() < 0.5, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-red-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(2px) brightness(0.5) hue-rotate(-30deg)' }} />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="mx-auto px-10 py-14 max-w-2xl w-full flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: 'rgba(0,0,0,0.92)',
            boxShadow: '0 0 40px 8px #ff0033, 0 0 80px 0 #ff003344',
            borderRadius: '1.5rem',
            border: 'none',
            minHeight: '320px',
            position: 'relative',
          }}
        >
          <div className="text-2xl md:text-3xl font-bold text-red-400 text-center tracking-widest mb-6 select-none">
            SHARD.EXE: Insert Shard (Placeholder)
          </div>
          <div className="text-lg md:text-xl text-red-200 text-center tracking-wide min-h-[2.5em] select-none mb-8">
            Timed click minigame coming soon.<br/>
            {showGlitch && (
              <div className="mt-6 text-pink-300 animate-pulse text-center">{MORPHEUS_GLITCH}</div>
            )}
          </div>
          <button
            className="mt-8 px-8 py-3 rounded-lg border-2 border-red-400 text-red-200 text-xl font-bold shadow-[0_0_20px_#ff0033] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#ff0033] focus:outline-none focus:ring-4 focus:ring-red-400/40 animate-fade-in"
            onClick={() => navigate('/matrix-v1/ghost-layer-2')}
          >
            Next: Ghost Layer 2
          </button>
        </div>
      </div>
    </div>
  );
} 