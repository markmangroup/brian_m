import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';
import NPC from './components/NPC';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { useAppStore } from '../../store/useAppStore';

export default function Entry() {
  const [showChoice, setShowChoice] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppStore((state) => state.user.name);
  
  // Check if user came from name prompt with a name
  const hasName = userName || localStorage.getItem('matrixV1Name') || location.state?.name;
  const fromNamePrompt = location.state?.fromNamePrompt;

  // Track story progression
  useStoryProgress('matrix-v1-entry', 'entered-entry');

  const [intro] = useTypewriterEffect('Welcome to the Matrix', 100);
  const [prompt] = useTypewriterEffect(
    hasName ? `Welcome back, ${hasName}` : 'Identity verification required', 
    50
  );

  // If no name and didn't come from name prompt, redirect to name prompt
  useEffect(() => {
    if (!hasName && !fromNamePrompt) {
      navigate('/matrix-v1/name-prompt');
    } else if (hasName) {
      // Show choice after typewriter effects
      const timer = setTimeout(() => setShowChoice(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasName, fromNamePrompt, navigate]);

  const red = () => navigate('/matrix-v1/terminal', { state: { name: hasName } });
  const blue = () => navigate('/snack-trail', { state: { name: hasName } });

  // If no name, show loading while redirecting
  if (!hasName) {
    return (
      <MatrixLayout>
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-bold heading-theme animate-theme-glow">
            {intro}
          </h1>
          <p className="text-lg subheading-theme">
            {prompt}
          </p>
          <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-theme-muted">Redirecting to identity verification...</p>
        </div>
      </MatrixLayout>
    );
  }

  return (
    <MatrixLayout>
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold heading-theme animate-theme-glow">
          {intro}
        </h1>
        
        <p className="text-lg subheading-theme">
          {prompt}
        </p>

        {showChoice && (
          <>
            <h2 className="text-2xl font-bold heading-theme">
              This is your last chance, {hasName}.
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
          </>
        )}
      </div>
    </MatrixLayout>
  );
}
