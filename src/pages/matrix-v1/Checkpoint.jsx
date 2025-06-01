import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

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
    <MatrixLayout>
      <div className="w-full max-w-md text-center space-y-6">
        <pre className="text-lg whitespace-pre-line heading-theme" role="status" aria-live="polite">
          {message}
        </pre>
        <MatrixButton
          onClick={() => navigate('/matrix-v1/message')}
          variant="primary"
          size="lg"
          ariaLabel="Proceed to next stage"
        >
          Proceed
        </MatrixButton>
      </div>
    </MatrixLayout>
  );
} 