import React from 'react';
import MatrixRain from './MatrixRain';

export default function EchoVerify() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-3xl font-bold">Verification Complete</h1>
        <p className="text-lg text-center">You chose wisely.</p>
      </div>
    </div>
  );
}
