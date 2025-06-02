import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';
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
    <MatrixLayout>
      <div className="text-center space-y-6">
        {count > 0 ? (
          <>
            <p className="text-red-600 text-2xl font-mono animate-pulse" role="status" aria-live="polite">
              TRACE INITIATED
            </p>
            <p className="text-xl animate-pulse">{count}</p>
            {showAgent && (
              <NPC 
                name="Agent Echo" 
                quote="I see you." 
                style="agent" 
              />
            )}
          </>
        ) : (
          <>
            <p className="text-xl">Connection re-established.</p>
            <MatrixButton
              onClick={() => navigate('/matrix-v1/observer')}
              variant="info"
              ariaLabel="Enter the Portal"
            >
              Enter the Portal
            </MatrixButton>
          </>
        )}
      </div>
    </MatrixLayout>
  );
}
