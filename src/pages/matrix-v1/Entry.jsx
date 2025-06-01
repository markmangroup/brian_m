import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixInput, MatrixButton } from '../../components/MatrixLayout';
import NPC from './components/NPC';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { useUserActions } from '../../store/useAppStore';

export default function Entry() {
  const [name, setName] = useState('');
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useUserActions();

  // Track story progression
  useStoryProgress('matrix-v1-entry', 'entered-entry');

  const [intro] = useTypewriterEffect('Welcome to the Matrix', 100);
  const [prompt] = useTypewriterEffect('Enter your name to begin', 50);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Set user name in Zustand store
      setUserName(name.trim());
      localStorage.setItem('matrixV1Name', name.trim());
      setEntered(true);
    }
  };

  const red = () => navigate('/matrix-v1/terminal', { state: { name } });
  const blue = () => navigate('/snack-trail', { state: { name } });

  if (!entered) {
    return (
      <MatrixLayout>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center heading-theme animate-theme-glow">
            {intro}
          </h1>
          <p className="text-center text-lg subheading-theme">
            {prompt}
          </p>
          <form onSubmit={submit} className="space-y-4">
            <MatrixInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              ariaLabel="Enter your name"
            />
            <MatrixButton 
              type="submit" 
              variant="primary" 
              size="lg"
              className="w-full"
              ariaLabel="Begin Matrix experience"
            >
              Begin
            </MatrixButton>
          </form>
        </div>
      </MatrixLayout>
    );
  }

  return (
    <MatrixLayout>
      <div className="w-full max-w-md space-y-8 text-center">
        <h2 className="text-2xl font-bold heading-theme">
          This is your last chance, {name}.
        </h2>
        
        <NPC type="mentor" speaker="morpheus">
          "After this, there is no going back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland, and I show you how deep the rabbit hole goes."
        </NPC>

        <div className="space-y-4">
          <MatrixButton 
            onClick={red} 
            variant="danger" 
            size="lg"
            className="w-full"
            ariaLabel="Take the red pill - Enter the Matrix"
          >
            🔴 Red Pill
          </MatrixButton>
          <MatrixButton 
            onClick={blue} 
            variant="info" 
            size="lg"
            className="w-full"
            ariaLabel="Take the blue pill - Return to normal world"
          >
            🔵 Blue Pill
          </MatrixButton>
        </div>
      </div>
    </MatrixLayout>
  );
}
