import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import Rain from './components/Rain';
import NPC from './components/NPC';

export default function Message() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const messages = [
    "You've taken the first step...",
    'But the system still watches.',
    'We must move quickly.',
  ];
  const [text, done] = useTypewriterEffect(messages[index], 50);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && index < messages.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 1000);
      return () => clearTimeout(t);
    }
  }, [done, index, messages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 text-center space-y-6">
        <p className="text-xl">{text}</p>
        {done && index === messages.length - 1 && (
          <>
            <button
              onClick={() => navigate('/matrix-v1/puzzle')}
              className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600"
            >
              Continue the Path
            </button>
            <NPC name="Morpheus" quote="This is only the beginning." style="mentor" className="mt-4" />
          </>
        )}
      </div>
    </div>
  );
}
