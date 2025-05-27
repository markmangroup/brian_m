import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';

const MESSAGES = [
  'The Matrix is a system, Neo. That system is our enemy.',
  'But when you\'re inside, you look around, what do you see? Businessmen, teachers, lawyers, carpenters.',
  'The very minds of the people we are trying to save.',
  'But until we do, these people are still a part of that system and that makes them our enemy.',
  'You have to understand, most of these people are not ready to be unplugged.',
  'And many of them are so inured, so hopelessly dependent on the system, that they will fight to protect it.'
];

export default function Message() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, done] = useTypewriterEffect(
    MESSAGES[currentIndex] || 'Error: Message not found',
    50
  );

  // Debug logging
  useEffect(() => {
    console.log('Message State:', {
      currentIndex,
      currentText: message,
      isDone: done,
      totalMessages: MESSAGES.length
    });
  }, [currentIndex, message, done]);

  useEffect(() => {
    // Guard against direct access
    if (!localStorage.getItem('matrixV1Access')) {
      navigate('/matrix-v1');
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentIndex < MESSAGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate('/matrix-v1/puzzle');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {/* Matrix Rain background */}
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-2xl px-4">
        {/* Always show current message */}
        <div className="bg-black/50 p-6 rounded-lg border border-green-700 w-full">
          <p className="text-lg text-center whitespace-pre-line">{message}</p>
        </div>

        {/* Show progress indicator */}
        <div className="text-sm text-green-700">
          Message {currentIndex + 1} of {MESSAGES.length}
        </div>

        {/* Show button and attribution only when current message is done */}
        {done && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-green-700">— Morpheus</p>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded bg-green-700 text-black hover:bg-green-600 transition-colors"
            >
              {currentIndex < MESSAGES.length - 1 ? 'Next' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
