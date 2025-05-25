import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rain from './components/Rain';
import NPC from './components/NPC';

export default function Trace() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    if (count === 7) setShowAgent(true);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 relative overflow-hidden space-y-6">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {count > 0 ? (
          <>
            <p className="text-red-600 text-2xl font-mono animate-pulse">TRACE INITIATED</p>
            <p className="text-xl animate-pulse">{count}</p>
            {showAgent && <NPC name="Agent Echo" quote="I see you." style="agent" />}
          </>
        ) : (
          <>
            <p className="text-xl">Connection re-established.</p>
            <button
              onClick={() => navigate('/matrix-v1/portal')}
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-500"
            >
              Enter the Portal
            </button>
          </>
        )}
      </div>
    </div>
  );
}
