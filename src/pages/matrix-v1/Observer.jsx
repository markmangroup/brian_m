import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';
import NPC from './components/NPC';

export default function Observer() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  return (
    <MatrixLayout>
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold heading-theme">The Observer</h1>
        <p className="text-lg max-w-md mx-auto text-theme-secondary">
          You have reached the observation deck. From here, you can see the patterns.
        </p>
        <NPC
          name="The Architect"
          quote="Ergo, vis-à-vis, concordantly, you are here because you were meant to be here."
          style="oracle"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MatrixButton
            onClick={() => navigate('/matrix-v1/puzzle')}
            variant="primary"
            ariaLabel="Continue to puzzle"
          >
            Continue
          </MatrixButton>
          <MatrixButton
            onClick={() => navigate('/matrix-v1/portal')}
            variant="secondary"
            ariaLabel="Return to portal"
          >
            Return to Portal
          </MatrixButton>
        </div>
      </div>
    </MatrixLayout>
  );
} 