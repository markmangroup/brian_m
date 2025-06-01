import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

const MESSAGES = [
  'Interference Detected',
  'The signal is fragmenting...',
  'Reality parameters are shifting.',
  'Do you believe reality is a choice?'
];

export default function Stage2() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
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
      setShowQuestion(true);
    }
  }, [done, msgIndex]);

  const handleAnswer = (answer) => {
    if (answer === 'yes') {
      navigate('/matrix-v1/stage-3');
    } else {
      navigate('/matrix-v1/interference');
    }
  };

  return (
    <MatrixLayout glitch={msgIndex > 1}>
      {/* Glitch overlay for dramatic effect */}
      {msgIndex > 1 && (
        <div className="absolute inset-0 pointer-events-none z-20 animate-pulse" 
             style={{ mixBlendMode: 'screen', opacity: 0.2 }}>
          <div className="w-full h-full bg-gradient-to-br from-theme-accent/20 to-theme-primary/80" />
        </div>
      )}
      
      <div className="relative z-30 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold heading-theme">
          {msgIndex === 0 ? typed : 'Interference Detected'}
        </h1>
        
        {msgIndex > 0 && (
          <p className="text-lg whitespace-pre-line" role="status" aria-live="polite">
            {typed}
          </p>
        )}
        
        {showQuestion && (
          <div className="space-y-4">
            <div className="text-xl font-mono text-theme-accent">
              Do you believe reality is a choice?
            </div>
            <div className="flex gap-4 justify-center">
              <MatrixButton
                onClick={() => handleAnswer('yes')}
                variant="primary"
                size="lg"
                ariaLabel="Answer: Yes, reality is a choice"
              >
                Yes
              </MatrixButton>
              <MatrixButton
                onClick={() => handleAnswer('no')}
                variant="secondary"
                size="lg"
                ariaLabel="Answer: No, reality is not a choice"
              >
                No
              </MatrixButton>
            </div>
          </div>
        )}
      </div>
    </MatrixLayout>
  );
} 