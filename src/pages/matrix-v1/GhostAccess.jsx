import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';

export default function GhostAccess() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-3xl font-bold">Ghost Access</h1>
        <p className="text-lg">This node is under construction.</p>
        <button onClick={() => navigate('/matrix-v1')} className="px-4 py-2 rounded bg-green-900 text-green-400 hover:bg-green-800">
          Exit
        </button>
      </div>
    </div>
  );
}
