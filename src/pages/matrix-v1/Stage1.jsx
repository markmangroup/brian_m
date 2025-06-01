import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

const MESSAGES = [
  'Welcome to The First Gate.',
  'Here, reality begins to fracture.',
  'Choose wisely. Each decision echoes across infinite simulations.'
];

const OPTIONS = ['Accept', 'Refuse', 'Question', 'Analyze'];

export default function Stage1() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [typed, done] = useTypewriterEffect(
    msgIndex < MESSAGES.length ? MESSAGES[msgIndex] : '', 
    80
  );

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && msgIndex < MESSAGES.length - 1) {
      const timer = setTimeout(() => setMsgIndex(i => i + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [done, msgIndex]);

  const handleSelect = (option) => {
    if (option === 'Question') {
      navigate('/matrix-v1/stage-2');
    } else {
      setError(`"${option}" leads to system termination. Try again.`);
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold heading-theme">
          {msgIndex === 0 ? typed : 'The First Gate'}
        </h1>
        
        {msgIndex > 0 && (
          <p className="text-lg whitespace-pre-line" role="status" aria-live="polite">
            {typed}
          </p>
        )}
        
        {msgIndex === 2 && done && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map(option => (
                <MatrixButton
                  key={option}
                  onClick={() => handleSelect(option)}
                  variant="primary"
                  ariaLabel={`Choose option: ${option}`}
                >
                  {option}
                </MatrixButton>
              ))}
            </div>
            {error && (
              <div className="text-red-500 mt-2" role="alert" aria-live="assertive">
                <span className="sr-only">Error:</span>
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </MatrixLayout>
  );
} 