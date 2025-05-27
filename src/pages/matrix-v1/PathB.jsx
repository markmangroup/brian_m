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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      {/* distortion overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 animate-pulse" style={{ mixBlendMode: 'screen', opacity: 0.2 }} />
      <div className={`relative z-10 flex flex-col items-center space-y-6 ${glitch ? 'animate-glitch' : ''}`}>
        {!showOptions && <p className="text-xl text-center max-w-md">{typedMsg}</p>}
        {showOptions ? (
          <>
            <NPC name="Agent Echo" quote="You thought you could hide. But you've been tagged." style="agent" />
            <div className="flex flex-col items-center space-y-4">
              <button onClick={mask} className="px-6 py-2 rounded bg-purple-900 text-purple-400 hover:bg-purple-800">Mask signature</button>
              <button onClick={inject} className="px-6 py-2 rounded bg-red-900 text-red-400 hover:bg-red-800">Inject static</button>
            </div>
          </>
        ) : null}
        {injecting && (
          <p className="text-2xl font-bold animate-pulse">{count}</p>
        )}
      </div>
    </div>
  );
}
