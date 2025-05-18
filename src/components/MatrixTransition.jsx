import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MatrixTransition() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const quote = state?.quote;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/snack-trail');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono">
        <p>No quote provided.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <h1 className="text-3xl font-bold mb-4">Matrix Transition</h1>
      <div className="w-64 h-2 bg-green-900 overflow-hidden rounded">
        <div className="loading-bar h-full bg-green-500" />
      </div>
      <p className="neon-text text-center text-xl px-4">
        {quote.text} — {quote.attribution}
      </p>
    </div>
  );
}
