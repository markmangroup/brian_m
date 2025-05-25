import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { NAOE_QUOTES } from '../../data/naoeQuotes';
import Rain from './components/Rain';

export default function Transition() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const name = state?.name || localStorage.getItem('matrixV1Name');
  const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
  const [bootText] = useTypewriterEffect('Booting simulated reality...', 50);
  const [quoteText] = useTypewriterEffect(`${q.text} — ${q.attribution}`, 50);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
      return;
    }
    const MESSAGE_ROUTE = '/matrix-v1/message';
    const t = setTimeout(
      () => navigate(MESSAGE_ROUTE, { state: { name } }),
      3000
    );
    return () => clearTimeout(t);
  }, [navigate, name]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <p className="text-xl animate-pulse">{bootText}</p>
        <p className="text-lg text-center max-w-md">{quoteText}</p>
        <div className="w-64 h-2 bg-green-900 overflow-hidden rounded">
          <div className="h-full bg-green-500 animate-progress" />
        </div>
      </div>
    </div>
  );
}
