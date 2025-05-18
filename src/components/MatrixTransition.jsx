import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function MatrixTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = useContext(UserContext);

  // 3-sec “code rain” splash, then jump to the portal
  const name = location.state?.name || userName;

  useEffect(() => {
    const t = setTimeout(
      () => navigate('/the-matrix/portal', { state: { name } }),
      3000
    );
    return () => clearTimeout(t);
  }, [navigate, name]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6">
      <p className="text-xl animate-pulse">⁂ booting simulated reality ⁂</p>
      <div className="w-64 h-2 bg-green-900 overflow-hidden rounded">
        <div className="h-full bg-green-500 animate-progress" />
      </div>
    </div>
  );
}
