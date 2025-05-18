import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAOE_QUOTES } from '../data/naoeQuotes';

export default function MatrixTransition() {
  const navigate = useNavigate();
  const quote = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/portal');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <p className="text-xl matrix-neon text-center">
        {quote.text} — {quote.attribution}
      </p>
      <div className="w-64 matrix-progress" aria-label="loading" />
    </div>
  );
}
