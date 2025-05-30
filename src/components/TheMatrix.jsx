import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixRain from './MatrixRain';
import { CharacterSpeaker } from './CharacterSystem';

export default function TheMatrix() {
  const { userName, setUserName } = useContext(UserContext);
  const [name, setName] = useState(userName || '');
  const [entered, setEntered] = useState(!!userName);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [welcomeText] = useTypewriterEffect('Welcome to the Matrix', 50);
  const [promptText] = useTypewriterEffect('Enter your name to begin:', 50);

  const displayName = userName || name;

  const story = [
    { speaker: 'morpheus', text: `Hello, ${displayName}. I am Morpheus.` },
    { speaker: 'trinity', text: 'We have been looking for you.' },
    { speaker: 'morpheus', text: 'This is your chance to learn the truth.' },
    {
      speaker: 'morpheus',
      text: 'Follow the white rabbit and see how deep the hole goes.'
    },
    { speaker: 'system', text: 'Ready to choose your destiny?' }
  ];

  const current = story[step];
  const [storyText, storyDone] = useTypewriterEffect(current.text, 50);

  /* ───────────── 1. name prompt ───────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      setUserName(trimmed);
      setEntered(true);
    }
  };

  /* ───────────── 2. story progression ───────────── */
  const handleNext = () => {
    if (step < story.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/matrix-v1/terminal');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-6 px-4">
        <h1 className="text-4xl font-bold text-center">{welcomeText}</h1>

        {!entered ? (
          /* ─── NAME ENTRY ─── */
          <div className="w-full max-w-md space-y-4">
            <p className="text-lg text-center">{promptText}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-black/50 border border-green-700 text-green-400 placeholder-green-600 focus:border-green-500"
                placeholder="Your name..."
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 rounded bg-green-900 text-green-400 hover:bg-green-800 transition-colors"
              >
                Enter the Matrix
              </button>
            </form>
          </div>
        ) : (
          /* ─── STORY SEQUENCE ─── */
          <div className="w-full max-w-2xl space-y-6">
            <CharacterSpeaker
              characterKey={current.speaker}
              text={storyText}
              className="animate-fade-in"
            />
            
            {storyDone && (
              <div className="text-center">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded bg-green-900 text-green-400 hover:bg-green-800 transition-colors animate-fade-in"
                >
                  {step < story.length - 1 ? 'Continue...' : 'Enter Terminal'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
