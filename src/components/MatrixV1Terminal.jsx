import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixLayout, { MatrixCard, MatrixButton } from './MatrixLayout';
import { CharacterDialogue } from './CharacterSystem';

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
    <MatrixLayout>
      {!ok && selectedQuote && !isTransitioning && (
        <div className="w-full max-w-2xl space-y-6 animate-fade-in">
          <CharacterDialogue 
            characterKey="morpheus"
            text="I'm going to show you how deep the rabbit hole goes. Answer this question to prove you are The One..."
            size="lg"
            showTitle={true}
            className="animate-fade-in-slow"
          />
          
          <MatrixCard>
            <p className="text-xl mb-4">{selectedQuote.text}</p>
            <div className="grid grid-cols-2 gap-3">
              {selectedQuote.options.map((option) => (
                <MatrixButton
                  key={option}
                  onClick={() => handleAnswer(option)}
                  variant="primary"
                  ariaLabel={`Answer: ${option}`}
                >
                  {option}
                </MatrixButton>
              ))}
            </div>
          </MatrixCard>
        </div>
      )}

      {msg && (
        <p className="text-lg text-center" role="status" aria-live="polite">
          {typedMsg}
        </p>
      )}

      {ok && (
        <MatrixButton 
          onClick={logout} 
          variant="secondary" 
          size="sm"
          ariaLabel="Log out of Matrix terminal"
        >
          <span className="underline">log out</span>
        </MatrixButton>
      )}
    </MatrixLayout>
  );
} 