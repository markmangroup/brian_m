import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

export default function Align() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const name = slug ? slug.replace(/-/g, ' ') : '';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">Alignment Chosen</h1>
        <p className="text-lg text-center">You aligned with {name}.</p>
        <button onClick={() => navigate('/matrix-v1')} className="px-4 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800">
          Return
        </button>
      </div>
    </div>
  );
}
