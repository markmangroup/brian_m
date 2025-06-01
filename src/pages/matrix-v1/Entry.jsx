import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixInput, MatrixButton } from '../../components/MatrixLayout';
import NPC from './components/NPC';
import useTypewriterEffect from '../../components/useTypewriterEffect';

export default function Entry() {
  const [name, setName] = useState('');
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  const [intro] = useTypewriterEffect('Welcome to the Matrix', 100);
  const [prompt] = useTypewriterEffect('Enter your name to begin', 50);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('matrixV1Name', name.trim());
      setEntered(true);
    }
  };

  const red = () => navigate('/matrix-v1/terminal', { state: { name } });
  const blue = () => navigate('/snack-trail', { state: { name } });

  return (
    <MatrixLayout contentClassName="py-20">
      <div className="text-center space-y-6">
        {!entered && (
          <>
            <h1 className="text-4xl font-bold heading-theme">{intro}</h1>
            <p className="text-xl text-theme-secondary">{prompt}</p>
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <MatrixInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Player Name"
                ariaLabel="Enter your player name"
                className="w-full sm:w-auto"
              />
              <MatrixButton 
                type="submit" 
                variant="primary"
                ariaLabel="Enter the Matrix"
              >
                Enter
              </MatrixButton>
            </form>
          </>
        )}
        {entered && (
          <>
            <NPC
              name="Morpheus"
              quote={`I've been waiting for you, ${name}. You've felt it, haven't you?`}
              style="mentor"
              className="mb-2"
            />
            <p className="text-lg text-theme-secondary">
              Hello, <span className="text-theme-accent font-bold">{name}</span>. Choose your destiny.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MatrixButton 
                onClick={red} 
                variant="danger"
                ariaLabel="Take the red pill - see the truth"
              >
                Red Pill
              </MatrixButton>
              <MatrixButton 
                onClick={blue} 
                variant="info"
                ariaLabel="Take the blue pill - return to normal life"
              >
                Blue Pill
              </MatrixButton>
            </div>
          </>
        )}
      </div>
    </MatrixLayout>
  );
}
