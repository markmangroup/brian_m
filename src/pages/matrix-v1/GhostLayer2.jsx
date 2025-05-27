import React from 'react';
import MatrixRain from '../../components/MatrixRain';

export default function GhostLayer2() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-blue-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(2px) brightness(0.8) hue-rotate(180deg)' }} />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="mx-auto px-10 py-14 max-w-2xl w-full flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: 'rgba(0,0,0,0.92)',
            boxShadow: '0 0 40px 8px #3b82f6, 0 0 80px 0 #3b82f644',
            borderRadius: '1.5rem',
            border: 'none',
            minHeight: '320px',
            position: 'relative',
          }}
        >
          <div className="text-2xl md:text-3xl font-bold text-blue-400 text-center tracking-widest mb-6 select-none">
            GHOST LAYER 2 (Placeholder)
          </div>
          <div className="text-lg md:text-xl text-blue-200 text-center tracking-wide min-h-[2.5em] select-none mb-8">
            Next phase coming soon.
          </div>
        </div>
      </div>
    </div>
  );
} 