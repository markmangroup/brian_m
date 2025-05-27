import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import NPC from './components/NPC';

const LINES = [
  'System nominal... Welcome back.',
  'Archivist: "All is well, proceed as usual."'
];

export default function PathBGlitch() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [typed, done] = useTypewriterEffect(LINES[index] || '', 50);
  const [showOptions, setShowOptions] = useState(false);
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (done && index < LINES.length - 1) {
      const t = setTimeout(() => setIndex(i => i + 1), 800);
      return () => clearTimeout(t);
    }
    if (done && index === LINES.length - 1) {
      setShowOptions(true);
    }
  }, [done, index]);

  const playAlong = () => navigate('/matrix-v1/deeper-profile');
  const reset = () => navigate('/matrix-v1', { state: { glitch: true } });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className={`relative z-10 flex flex-col items-center space-y-6 ${glitch ? 'animate-glitch' : ''}`}>
        <p className="text-xl text-center whitespace-pre-line">{typed}</p>
        {showOptions && (
          <>
            <NPC name="Archivist" quote="Everything is fine." style="oracle" />
            <div className="flex space-x-4 mt-4">
              <button onClick={playAlong} className="px-6 py-2 rounded bg-green-900 text-green-400 hover:bg-green-800">
                Play along
              </button>
              <button onClick={reset} className="px-6 py-2 rounded bg-yellow-900 text-yellow-400 hover:bg-yellow-800">
                Attempt reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
