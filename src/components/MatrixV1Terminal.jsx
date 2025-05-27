import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixRain from './MatrixRain';

const QUOTE_OPTIONS = [
  { text: 'There is no...', options: ['Door', 'Spoon', 'Exit', 'Escape'], correct: 'Spoon' },
  { text: 'The Matrix has you...', options: ['Follow the white rabbit', 'Wake up', 'Follow me', 'Take the red pill'], correct: 'Follow the white rabbit' },
  { text: 'I know kung...', options: ['Fu', 'Fu!', 'Fu.', 'Fu...'], correct: 'Fu' }
];

export default function MatrixV1Terminal() {
  const { userName } = useContext(UserContext);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const stateName = location.state?.name || userName;
  const [typedMsg, typedMsgDone] = useTypewriterEffect(msg, 50);
  const [morpheusText, morpheusDone] = useTypewriterEffect(
    "Morpheus: \"I'm going to show you how deep the rabbit hole goes. Answer this question to prove you are The One...\"",
    50
  );

  useEffect(() => {
    // Select a random quote on component mount
    setSelectedQuote(QUOTE_OPTIONS[Math.floor(Math.random() * QUOTE_OPTIONS.length)]);
  }, []);

  const grant = () => {
    const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
    setMsg(`Access granted. Welcome to the real world. ${q.text} — ${q.attribution}`);
    setOk(true);
    setIsTransitioning(true);
    localStorage.setItem('matrixV1Access', 'true');
    setTimeout(() =>
      navigate('/matrix-v1/checkpoint', { state: { name: stateName } }),
    2000);
  };

  const handleAnswer = (answer) => {
    if (answer === selectedQuote.correct) {
      grant();
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setMsg('Agent Echo: "You are not The One. The Matrix has you... Try again."');
      } else {
        setMsg('Access denied. Try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('matrixV1Access');
    setOk(false);
    setMsg('');
    setAttempts(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {/* Matrix Rain background */}
      {typeof window !== 'undefined' && !isTransitioning && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-4xl font-bold">Matrix Terminal</h1>

        {!ok && selectedQuote && !isTransitioning && (
          <div className="w-full space-y-6 animate-fade-in">
            <p className="text-lg text-center">{morpheusText}</p>
            <div className="bg-black/50 p-6 rounded-lg border border-green-700">
              <p className="text-xl mb-4">{selectedQuote.text}</p>
              <div className="grid grid-cols-2 gap-3">
                {selectedQuote.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="px-4 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {msg && <p className="text-lg text-center">{typedMsg}</p>}

        {ok && (
          <button onClick={logout} className="text-sm underline text-green-400">
            log out
          </button>
        )}
      </div>
    </div>
  );
} 