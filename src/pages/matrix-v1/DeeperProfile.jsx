import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import NPC from './components/NPC';

export default function DeeperProfile() {
  const navigate = useNavigate();
  const playerName = typeof window !== 'undefined' ? localStorage.getItem('playerName') || 'unknown' : 'unknown';

  const LINES = [
    'Initializing deep scan...',
    `Subject ID: ${playerName}`,
    'Analyzing patterns...',
    'Emotion signal: EMOTIONAL OBFUSCATION',
    'Status: ESCALATED'
  ];

  const STATS = [
    'Curiosity Level: 92%',
    'Risk Factor: HIGH',
    'Loyalty: UNCONFIRMED',
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [typedLine, lineDone] = useTypewriterEffect(LINES[lineIndex] || '', 40);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (lineDone && lineIndex < LINES.length - 1) {
      const t = setTimeout(() => setLineIndex(i => i + 1), 400);
      return () => clearTimeout(t);
    }
    if (lineDone && lineIndex === LINES.length - 1) {
      const t = setTimeout(() => setShowStats(true), 400);
      return () => clearTimeout(t);
    }
  }, [lineDone, lineIndex]);

  const toFactions = () => navigate('/matrix-v1/message');
  const toPathB = () => navigate('/matrix-v1/path-b');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden space-y-6">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {!showStats && <p className="text-xl">{typedLine}</p>}
        {showStats && (
          <>
            <ul className="space-y-1 text-lg animate-fade-in">
              <li>Resistance Level: <span className="text-red-500 animate-pulse">ESCALATED</span></li>
              <li>Emotion Metric: <span className="text-red-500 animate-pulse">EMOTIONAL OBFUSCATION</span></li>
              {STATS.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="animate-fade-in">Internal Comment: Patterns shifting...</p>
            <NPC name="Archivist" quote="Further down the rabbit hole lies only uncertainty." style="oracle" />
            <div className="flex space-x-4">
              <button onClick={toFactions} className="px-6 py-2 rounded bg-purple-900 text-purple-400 hover:bg-purple-800">View the Systems Watching You</button>
              <button onClick={toPathB} className="px-6 py-2 rounded bg-green-900 text-green-400 hover:bg-green-800">Return to the Obscured Path</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
