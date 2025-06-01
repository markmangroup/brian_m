import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';

const FACTIONS = [
  {
    id: 'zion-fleet',
    name: 'Zion Fleet Command',
    symbol: '⚡',
    symbolLabel: 'Lightning bolt representing Zion Fleet Command',
    quote: 'The last city stands.',
    mission: 'Military resistance against the machines.'
  },
  {
    id: 'rebel-hackers',
    name: 'Digital Resistance Cell',
    symbol: '🔓',
    symbolLabel: 'Unlocked padlock representing Digital Resistance',
    quote: 'Code is our weapon.',
    mission: 'Hack the Matrix from within.'
  },
  {
    id: 'oracle-seekers',
    name: 'Oracle\'s Path',
    symbol: '🔮',
    symbolLabel: 'Crystal ball representing Oracle seekers',
    quote: 'Know thyself.',
    mission: 'Seek truth through prophecy and choice.'
  }
];

export default function Factions() {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/matrix-v1/${id}`);
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center heading-theme">
          Who Watches You
        </h1>
        
        <ul className="space-y-4 w-full" role="list">
          {FACTIONS.map((faction) => (
            <li 
              key={faction.id} 
              className="card-theme p-4 rounded-lg flex items-start"
            >
              <div 
                className="text-2xl mr-4 flex-shrink-0" 
                aria-label={faction.symbolLabel}
                role="img"
              >
                {faction.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-theme-primary">{faction.name}</div>
                <div className="italic text-sm mb-1 text-theme-secondary">
                  "{faction.quote}"
                </div>
                <div className="text-sm text-theme-muted">{faction.mission}</div>
              </div>
              <MatrixButton
                onClick={() => handleSelect(faction.id)}
                variant="primary"
                size="sm"
                ariaLabel={`Select ${faction.name} faction`}
                className="ml-4 flex-shrink-0"
              >
                Select
              </MatrixButton>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <MatrixButton
            onClick={() => navigate('/matrix-v1')}
            variant="danger"
            ariaLabel="Return to Matrix entry"
          >
            Return
          </MatrixButton>
        </div>
      </div>
    </MatrixLayout>
  );
}
