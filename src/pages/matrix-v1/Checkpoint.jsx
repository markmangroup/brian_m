import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';

export default function Checkpoint() {
  const navigate = useNavigate();
  const [message] = useTypewriterEffect(
    'SYSTEM: Alignment complete.\nThe gateway stabilizes. Proceed when ready.',
    50
  );

  useEffect(() => {
    // Guard against direct access
    if (!localStorage.getItem('matrixV1Access')) {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {/* Matrix Rain background */}
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <pre className="text-lg text-center whitespace-pre-line">{message}</pre>
        <button
          onClick={() => navigate('/matrix-v1/message')}
          className="px-6 py-3 rounded bg-green-700 text-black hover:bg-green-600 transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
} 