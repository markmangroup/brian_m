import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import NPC from './components/NPC';

const MESSAGES = [
  'Resistance registered.',
  'System instability rising.'
];

export default function PathB() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [typedMsg, doneMsg] = useTypewriterEffect(MESSAGES[msgIndex] || '', 50);
  const [showOptions, setShowOptions] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [count, setCount] = useState(3);
  const [injecting, setInjecting] = useState(false);

  useEffect(() => {
    console.log('[MatrixV1] Path B reached');
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  useEffect(() => {
    if (doneMsg && msgIndex < MESSAGES.length - 1) {
      const t = setTimeout(() => setMsgIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    }
    if (doneMsg && msgIndex === MESSAGES.length - 1) {
      setShowOptions(true);
    }
  }, [doneMsg, msgIndex]);

  const mask = () => {
    setGlitch(true);
    setTimeout(() => navigate('/matrix-v1/path-b-glitch'), 800);
  };

  const inject = () => {
    setShowOptions(false);
    setInjecting(true);
    let c = 3;
    setCount(c);
    const interval = setInterval(() => {
      c -= 1;
      setCount(c);
      if (c <= 0) {
        clearInterval(interval);
        navigate('/matrix-v1/interference');
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <div className="text-xs text-green-400 uppercase tracking-widest">System Guardian: Echo</div>
        <p className="text-lg text-center whitespace-pre-line">{typedMsg}</p>
        {showOptions && (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xl font-mono">Choose your action:</div>
            <div className="flex flex-col space-y-4 w-full">
              <button
                onClick={mask}
                className="px-6 py-3 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors relative group"
              >
                <span>Mask Signature</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-xs text-green-400 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Hide your digital footprint (lower detection risk)
                </div>
              </button>
              <button
                onClick={inject}
                className="px-6 py-3 rounded bg-red-900 text-red-500 hover:bg-red-800 transition-colors relative group"
              >
                <span>Inject Static</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-xs text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Trigger system interference (risk unknown)
                </div>
              </button>
            </div>
          </div>
        )}
        {injecting && (
          <div className="text-xl font-mono animate-pulse">
            Injecting in {count}...
          </div>
        )}
      </div>
    </div>
  );
}
