import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import Rain from './components/Rain';
import NPC from './components/NPC';

const MESSAGES = [
  "Pause. You were not supposed to make it this far.",
  "We see you.",
  "The trace was a test.",
  "You pressed forward. Most fold.",
  "You are now being profiled."
];

const TRAITS = [
  "RESISTANT",
  "CURIOUS",
  "UNSTABLE",
  "DETERMINED",
  "UNPREDICTABLE"
];

export default function Observer() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isProfiling, setIsProfiling] = useState(false);
  const [traitIndex, setTraitIndex] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showNPC, setShowNPC] = useState(false);

  const [currentMessage, messageDone] = useTypewriterEffect(
    MESSAGES[messageIndex],
    50
  );

  const [currentTrait, traitDone] = useTypewriterEffect(
    isProfiling ? TRAITS[traitIndex] : "",
    30
  );

  useEffect(() => {
    if (messageDone && messageIndex < MESSAGES.length - 1) {
      const t = setTimeout(() => setMessageIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    } else if (messageDone && messageIndex === MESSAGES.length - 1) {
      setShowButtons(true);
    }
  }, [messageDone, messageIndex]);

  useEffect(() => {
    if (isProfiling && traitDone && traitIndex < 2) {
      const t = setTimeout(() => setTraitIndex(i => i + 1), 1000);
      return () => clearTimeout(t);
    }
  }, [isProfiling, traitDone, traitIndex]);

  const handleProfile = () => {
    setIsProfiling(true);
    setShowButtons(false);
  };

  const handleHide = () => {
    setShowGlitch(true);
    setTimeout(() => {
      setShowNPC(true);
    }, 500);
  };

  const handleDisconnect = () => {
    navigate('/matrix-v1');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      
      <div className={`relative z-10 flex flex-col items-center space-y-6 ${showGlitch ? 'animate-glitch' : ''}`}>
        {!isProfiling && !showNPC && (
          <p className="text-xl text-center max-w-md">{currentMessage}</p>
        )}

        {showButtons && (
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleProfile}
              className="px-6 py-3 rounded bg-green-900 text-green-400 hover:bg-green-800 transition-colors"
            >
              Profile Me
            </button>
            <button
              onClick={handleHide}
              className="px-6 py-3 rounded bg-purple-900 text-purple-400 hover:bg-purple-800 transition-colors"
            >
              Hide
            </button>
            <button
              onClick={handleDisconnect}
              className="px-6 py-3 rounded bg-red-900 text-red-400 hover:bg-red-800 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}

        {isProfiling && (
          <div className="text-center space-y-4">
            <p className="text-xl animate-pulse">Building your profile...</p>
            <p className="text-2xl font-bold">{currentTrait}</p>
            {traitIndex >= 2 && (
              <button
                onClick={() => navigate('/matrix-v1/profile-report')}
                className="px-6 py-3 rounded bg-green-900 text-green-400 hover:bg-green-800 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {showNPC && (
          <div className="text-center space-y-4">
            <NPC
              name="Agent Echo"
              quote="They found you anyway."
              style="agent"
            />
            <button
              onClick={() => navigate('/matrix-v1')}
              className="px-6 py-3 rounded bg-red-900 text-red-400 hover:bg-red-800 transition-colors"
            >
              Return to Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 