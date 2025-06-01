import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixInput, MatrixButton } from '../../components/MatrixLayout';
import NPC from './components/NPC';

export default function Puzzle() {
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState('');
  const [npc, setNpc] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const lower = answer.toLowerCase();
    
    if (lower.includes('no') || lower.includes('choice') || lower.includes('free')) {
      setResponse('Interesting. You question the nature of destiny itself.');
      setNpc({
        name: 'Oracle',
        quote: 'Being The One is just like being in love. No one can tell you you\'re in love, you just know it.',
        style: 'oracle'
      });
    } else if (lower.includes('yes') || lower.includes('believe')) {
      setResponse('Fate is a river. You can swim against it, but the current is strong.');
      setNpc({
        name: 'Morpheus',
        quote: 'There is a difference between knowing the path and walking the path.',
        style: 'mentor'
      });
    } else {
      setResponse('Your answer reveals uncertainty. Perhaps that is wisdom.');
      setNpc({
        name: 'Agent Smith',
        quote: 'Choice is an illusion created between those with power and those without.',
        style: 'agent'
      });
    }
  };

  return (
    <MatrixLayout>
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold heading-theme">Do you believe in fate?</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <MatrixInput
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="your answer"
            ariaLabel="Enter your answer about fate"
            className="w-full sm:w-auto"
          />
          <MatrixButton 
            type="submit" 
            variant="primary"
            ariaLabel="Submit your answer"
          >
            Submit
          </MatrixButton>
        </form>
        {response && (
          <p className="text-lg text-center max-w-md mx-auto text-theme-secondary">
            {response}
          </p>
        )}
        {npc && (
          <NPC name={npc.name} quote={npc.quote} style={npc.style} />
        )}
        {response && (
          <MatrixButton 
            onClick={() => navigate('/matrix-v1/trace')} 
            variant="info"
            ariaLabel="Continue to next stage"
          >
            Continue
          </MatrixButton>
        )}
      </div>
    </MatrixLayout>
  );
}
