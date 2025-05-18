import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MatrixTransition() {
  const navigate = useNavigate();

  // 3-sec “code rain” splash, then jump to the portal
  useEffect(() => {
    const t = setTimeout(() => navigate('/portal'), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <p className="text-xl animate-pulse">⁂ booting simulated reality ⁂</p>
      <div className="w-64 h-2 bg-green-900 overflow-hidden rounded">
        <div className="h-full bg-green-500 animate-progress" />
      </div>
    </div>
  );
}
