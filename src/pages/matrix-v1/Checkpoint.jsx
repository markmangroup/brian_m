import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

export default function Checkpoint() {
  const navigate = useNavigate();
  const [message] = useTypewriterEffect(
    'SYSTEM: Alignment complete.\nThe gateway stabilizes. Proceed when ready.',
    40
  );

  useEffect(() => {
    // Guard against direct access
    if (!localStorage.getItem('matrixV1Access')) {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  return (
    <MatrixLayout>
      <div className="w-full max-w-md text-center space-y-8">
        <h1 className="text-3xl font-bold heading-theme animate-theme-glow">
          System Checkpoint
        </h1>
        
        <div className="bg-theme-overlay border-2 border-theme-primary rounded-lg p-6 backdrop-blur-md">
          <pre className="text-lg whitespace-pre-line critical-text font-theme-primary" role="status" aria-live="polite">
            {message}
          </pre>
        </div>
        
        <div className="space-y-4">
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-theme-primary rounded-full animate-pulse transition-all duration-1000" 
                 style={{ width: '100%', animationDuration: '2s' }} />
          </div>
          <div className="text-theme-secondary text-sm">
            Consciousness transfer stabilizing...
          </div>
        </div>
        
        <MatrixButton
          onClick={() => navigate('/matrix-v1/message')}
          variant="success"
          size="lg"
          className="w-full"
          ariaLabel="Proceed to next stage"
        >
          Proceed to Mission Brief
        </MatrixButton>
      </div>
    </MatrixLayout>
  );
} 