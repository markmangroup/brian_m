import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MatrixTransition() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6">
      <h1 className="text-4xl font-bold">Matrix Transition</h1>
      <p className="text-lg">Prepare yourself to enter the Matrix.</p>
      <button
        onClick={() => navigate('/the-matrix')}
        className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
      >
        Continue
      </button>
    </div>
  );
}
