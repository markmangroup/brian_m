import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { NAOE_QUOTES } from '../../data/naoeQuotes';
import MatrixLayout from '../../components/MatrixLayout';

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
      6000
    );
    return () => clearTimeout(t);
  }, [navigate, name]);

  return (
    <MatrixLayout>
      <div className="text-center space-y-6">
        <p className="text-xl animate-pulse text-theme-accent" role="status" aria-live="polite">
          {bootText}
        </p>
        <p className="text-lg max-w-md text-theme-secondary">
          {quoteText}
        </p>
        <div className="w-64 h-2 bg-gray-800 overflow-hidden rounded mx-auto">
          <div className="h-full bg-theme-primary animate-pulse" style={{ width: '100%' }} />
        </div>
      </div>
    </MatrixLayout>
  );
}
