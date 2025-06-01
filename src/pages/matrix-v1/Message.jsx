import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

const MESSAGES = [
  'The system recognizes your signature.',
  'You have been classified as an anomaly.',
  'Anomalies require... special handling.',
  'Welcome to the deeper layers of the simulation.',
  'Your journey into truth begins now.'
];

export default function Message() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, done] = useTypewriterEffect(MESSAGES[currentIndex], 50);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentIndex < MESSAGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate('/matrix-v1/stage-1');
    }
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-2xl text-center space-y-6">
        {/* Message Display */}
        <div className="card-theme p-6 w-full min-h-32">
          <p className="text-lg whitespace-pre-line" role="status" aria-live="polite">
            {message}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="text-sm text-theme-muted">
          Message {currentIndex + 1} of {MESSAGES.length}
        </div>

        <div className="space-y-4">
          {done && (
            <p className="text-sm text-theme-secondary">
              — Morpheus
            </p>
          )}
          <MatrixButton
            onClick={handleNext}
            variant="primary"
            size="lg"
            ariaLabel={currentIndex < MESSAGES.length - 1 ? 'Next message' : 'Continue to Stage 1'}
          >
            {currentIndex < MESSAGES.length - 1 ? 'Next' : 'Continue'}
          </MatrixButton>
        </div>
      </div>
    </MatrixLayout>
  );
}
