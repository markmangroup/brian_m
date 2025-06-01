import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

const MESSAGES = [
  'Reality fractures at this juncture.',
  'Two paths diverge in the digital forest.',
  'Your choice will determine the nature of your experience.',
  'Choose your path through the labyrinth of possibility.'
];

export default function Stage3() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [typed, done] = useTypewriterEffect(MESSAGES[msgIndex], 50);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && msgIndex < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIndex(i => i + 1), 1500);
      return () => clearTimeout(t);
    } else if (done && msgIndex === MESSAGES.length - 1) {
      setShowChoices(true);
    }
  }, [done, msgIndex]);

  const handlePath = (path) => {
    if (path === 'A') {
      navigate('/matrix-v1/compliance-route');
    } else {
      navigate('/matrix-v1/anomaly-route');
    }
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold heading-theme">
          Forking Reality
        </h1>
        
        <p className="text-lg whitespace-pre-line" role="status" aria-live="polite">
          {typed}
        </p>
        
        {showChoices && (
          <div className="space-y-4">
            <div className="text-xl font-mono text-theme-accent">
              Choose your path:
            </div>
            <div className="flex gap-4 justify-center">
              <MatrixButton
                onClick={() => handlePath('A')}
                variant="success"
                size="lg"
                ariaLabel="Choose Compliance Route - Follow the established path"
              >
                Compliance Route
              </MatrixButton>
              <MatrixButton
                onClick={() => handlePath('B')}
                variant="danger"
                size="lg"
                ariaLabel="Choose Anomaly Route - Forge your own path"
              >
                Anomaly Route
              </MatrixButton>
            </div>
            <div className="text-sm text-theme-muted mt-4">
              <p>
                <strong>Compliance:</strong> Follow established protocols<br/>
                <strong>Anomaly:</strong> Question the system itself
              </p>
            </div>
          </div>
        )}
      </div>
    </MatrixLayout>
  );
} 