import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import NPC from './components/NPC';

const MESSAGES = [
  'You chose transparency. Few do.',
  "We've compiled your fragments..."
];

const TRAITS = ['RESISTANT', 'CURIOUS', 'UNSTABLE'];

export default function PathA() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [typedMsg, doneMsg] = useTypewriterEffect(MESSAGES[msgIndex] || '', 50);
  const [profiling, setProfiling] = useState(false);
  const [traitIndex, setTraitIndex] = useState(0);
  const [typedTrait, doneTrait] = useTypewriterEffect(profiling ? TRAITS[traitIndex] : '', 30);
  const [showPrompt, setShowPrompt] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    console.log('[MatrixV1] Path A reached');
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
      setProfiling(true);
    }
  }, [doneMsg, msgIndex]);

  useEffect(() => {
    if (profiling && doneTrait && traitIndex < TRAITS.length - 1) {
      const t = setTimeout(() => setTraitIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    }
    if (profiling && doneTrait && traitIndex === TRAITS.length - 1) {
      setShowPrompt(true);
    }
  }, [profiling, doneTrait, traitIndex]);

  const deeper = () => navigate('/matrix-v1/deeper-profile');
  const eject = () => {
    setGlitch(true);
    setTimeout(() => navigate('/matrix-v1/trace'), 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className={`relative z-10 flex flex-col items-center space-y-6 ${glitch ? 'animate-glitch' : ''}`}>
        {!profiling && <p className="text-xl text-center max-w-md">{typedMsg}</p>}
        {profiling && (
          <p className="text-2xl font-bold animate-pulse">{typedTrait}</p>
        )}
        {showPrompt && (
          <>
            <NPC name="Archivist AI" quote="You may not like what you see. But you must own it." style="oracle" />
            <p className="text-lg text-center">Continue deeper into the archive?</p>
            <div className="flex space-x-4">
              <button onClick={deeper} className="px-6 py-2 rounded bg-green-900 text-green-400 hover:bg-green-800">Yes</button>
              <button onClick={eject} className="px-6 py-2 rounded bg-red-900 text-red-400 hover:bg-red-800">No</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
