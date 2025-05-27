import React from 'react';
import MatrixRain from '../../components/MatrixRain';

export default function GhostLayer1() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 text-center space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Ghost Layer 1 initialized.</h1>
        <p className="text-lg">Further instructions incoming...</p>
      </div>
    </div>
  );
} 