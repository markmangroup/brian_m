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
          {MESSAGES[0]}
        </h1>
        
        {/* Only show current message, not duplicate */}
        {msgIndex > 0 && (
          <div className="bg-theme-overlay border-2 border-theme-accent rounded-lg p-6 backdrop-blur-md">
            <p className="text-lg text-theme-bright font-theme-secondary" role="status" aria-live="polite">
              {typed}
            </p>
          </div>
        )}
        
        {showQuestion && (
          <div className="space-y-6">
            <div className="text-xl font-mono text-theme-primary critical-text">
              Do you believe reality is a choice?
            </div>
            <div className="flex gap-4 justify-center">
              <MatrixButton
                onClick={() => handleAnswer('yes')}
                variant="success"
                size="lg"
                className="min-w-[100px]"
                ariaLabel="Answer: Yes, reality is a choice"
              >
                Yes
              </MatrixButton>
              <MatrixButton
                onClick={() => handleAnswer('no')}
                variant="danger"
                size="lg"
                className="min-w-[100px]"
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