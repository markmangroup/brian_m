import React from 'react';

export default function Ded() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 font-mono space-y-6">
      <h1 className="animate-shake text-red-500 text-3xl font-bold">Route Terminated</h1>
      <p className="animate-flash-green text-red-300">End of route</p>
    </div>
  );
}
