import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import useTypewriterEffect from './useTypewriterEffect';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import Matrix from 'react-matrix-effect';

export default function MatrixTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = useContext(UserContext);

  // 3-sec “code rain” splash, then jump to the portal
  const name = location.state?.name || userName;
  const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
  const [bootText, bootDone] = useTypewriterEffect('⁂ booting simulated reality ⁂', 50);
  const [quoteText, quoteDone] = useTypewriterEffect(`${q.text} — ${q.attribution}`, 50);

  useEffect(() => {
    const t = setTimeout(
      () => navigate('/the-matrix/portal', { state: { name } }),
      3000
    );
    return () => clearTimeout(t);
  }, [navigate, name]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6 relative overflow-hidden">
      {/* Matrix Rain background */}
      <Matrix fullscreen={true} zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      {/* Storyboard: 3-sec splash with booting text and quote, then auto-navigate to portal */}
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
