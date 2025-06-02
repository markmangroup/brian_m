import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixLayout, { MatrixCard, MatrixButton } from './MatrixLayout';
import { CharacterDialogue } from './CharacterSystem';
import NPC from '../pages/matrix-v1/components/NPC';

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
    "I'm going to show you how deep the rabbit hole goes. Answer this question to prove you are The One...",
    50
  );

  useEffect(() => {
    // Select a random quote on component mount
    setSelectedQuote(QUOTE_OPTIONS[Math.floor(Math.random() * QUOTE_OPTIONS.length)]);
  }, []);

  const handleAnswer = (answer) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (answer === selectedQuote.correct) {
      setMsg('ACCESS GRANTED');
      localStorage.setItem('matrixV1Access', 'true');
      setIsTransitioning(true);
      
      // Show success message longer (3 seconds instead of 2)
      setTimeout(() => {
        navigate('/matrix-v1/checkpoint', { state: { name: stateName } });
      }, 3000);
    } else {
      if (newAttempts >= 3) {
        setMsg('System lock detected. Agent dispatched.');
        setOk(true);
      } else {
        setMsg('ACCESS DENIED. Try again.');
        setTimeout(() => setMsg(''), 2000);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('matrixV1Access');
    navigate('/matrix-v1');
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold heading-theme animate-theme-glow">
          Matrix Terminal
        </h1>

        {/* Morpheus Introduction */}
        <div className="mb-8">
          <NPC speaker="morpheus" style="mentor">
            {morpheusText}
          </NPC>
        </div>

        {/* Quiz Section */}
        {selectedQuote && morpheusDone && !msg && (
          <div className="space-y-6">
            <div className="bg-theme-overlay border-2 border-theme-primary rounded-lg p-6 backdrop-blur-md">
              <p className="text-xl font-bold text-theme-bright mb-6 font-theme-primary">
                "{selectedQuote.text}"
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {selectedQuote.options.map((option) => (
                  <MatrixButton
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant="primary"
                    size="md"
                    className="text-sm font-bold"
                    ariaLabel={`Answer: ${option}`}
                  >
                    {option}
                  </MatrixButton>
                ))}
              </div>
            </div>

            {attempts > 0 && attempts < 3 && (
              <div className="text-theme-accent text-sm">
                Attempts: {attempts}/3
              </div>
            )}
          </div>
        )}

        {/* Result Messages */}
        {msg && (
          <div className={`
            p-6 rounded-lg border-2 backdrop-blur-md transition-all duration-500
            ${msg.includes('GRANTED') 
              ? 'border-green-400/60 bg-green-900/20 text-green-200 shadow-lg shadow-green-400/20' 
              : msg.includes('DENIED')
              ? 'border-yellow-400/60 bg-yellow-900/20 text-yellow-200 shadow-lg shadow-yellow-400/20'
              : 'border-red-400/60 bg-red-900/20 text-red-200 shadow-lg shadow-red-400/20'
            }
          `}>
            <p className={`
              text-2xl font-bold font-theme-primary
              ${msg.includes('GRANTED') ? 'animate-pulse slow-reveal' : ''}
            `} role="status" aria-live="polite">
              {typedMsg}
            </p>
            
            {msg.includes('GRANTED') && (
              <div className="mt-4 text-theme-bright">
                <div className="text-sm opacity-80">Initiating consciousness transfer...</div>
                <div className="w-full bg-gray-800 rounded-full h-3 mt-2 overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full animate-pulse transition-all duration-1000" 
                       style={{ width: '100%', animationDuration: '3s' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Agent Warning */}
        {attempts >= 3 && (
          <div className="space-y-4">
            <NPC name="Agent Echo" quote="You are not The One. Terminating connection." style="agent" />
            <MatrixButton 
              onClick={logout} 
              variant="danger" 
              size="lg"
              className="w-full"
              ariaLabel="Log out of Matrix terminal"
            >
              <span className="underline">Disconnect</span>
            </MatrixButton>
          </div>
        )}
      </div>
    </MatrixLayout>
  );
} 