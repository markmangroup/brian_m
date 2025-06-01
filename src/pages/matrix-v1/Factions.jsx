import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixButton } from '../../components/MatrixLayout';
import { useStoryProgress, useFactionProgress } from '../../hooks/useStoryProgress';

const factions = [
  {
    id: 'zion-fleet',
    name: 'Zion Fleet',
    symbol: '⚔️',
    symbolLabel: 'Military sword symbol',
    route: '/matrix-v1/zion-fleet',
    description: 'Join the military backbone of humanity\'s resistance. Train in ship operations, combat tactics, and strategic warfare.',
    philosophy: 'Victory through strength and unity',
    stats: '+2 Combat, +1 Exploration'
  },
  {
    id: 'rebel-hackers', 
    name: 'Rebel Hackers',
    symbol: '💻',
    symbolLabel: 'Computer terminal symbol',
    route: '/matrix-v1/rebel-hackers',
    description: 'Master the art of bending Matrix rules. Learn code injection, system exploitation, and reality manipulation.',
    philosophy: 'There are no rules, only limitations you accept',
    stats: '+2 Rebellion, +1 Exploration'
  },
  {
    id: 'oracle-seekers',
    name: 'Oracle Seekers', 
    symbol: '🔮',
    symbolLabel: 'Crystal ball symbol',
    route: '/matrix-v1/oracle-seekers',
    description: 'Seek wisdom and deeper understanding. Explore philosophical insights and the nature of choice itself.',
    philosophy: 'Knowledge is the path to true freedom',
    stats: '+2 Wisdom, +1 Exploration'
  }
];

export default function Factions() {
  const navigate = useNavigate();
  const { selectFaction, currentFaction } = useFactionProgress();
  
  // Track story progression - visiting factions page unlocks faction paths
  useStoryProgress('matrix-v1-factions', 'visited-factions');

  const handleFactionSelect = (faction) => {
    // Update Zustand store with faction selection
    selectFaction(faction.id);
    navigate(faction.route);
  };

  return (
    <MatrixLayout>
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold heading-theme animate-theme-glow">
            Choose Your Faction
          </h1>
          <p className="text-lg subheading-theme">
            Each path offers unique training and perspectives on the Matrix
          </p>
          {currentFaction && (
            <p className="text-sm text-theme-accent">
              Current Faction: {factions.find(f => f.id === currentFaction)?.name}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {factions.map((faction) => (
            <div 
              key={faction.id}
              className="card-theme p-6 space-y-4 hover:scale-105 transition-transform"
            >
              <div className="text-center space-y-2">
                <div className="text-4xl" aria-label={faction.symbolLabel}>
                  {faction.symbol}
                </div>
                <h2 className="text-xl font-bold heading-theme">
                  {faction.name}
                </h2>
              </div>

              <p className="body-theme text-sm">
                {faction.description}
              </p>

              <div className="space-y-2 text-xs">
                <p className="text-theme-muted italic">
                  "{faction.philosophy}"
                </p>
                <p className="text-theme-accent font-mono">
                  {faction.stats}
                </p>
              </div>

              <MatrixButton
                onClick={() => handleFactionSelect(faction)}
                variant="primary"
                size="lg"
                className="w-full"
                ariaLabel={`Join ${faction.name} faction`}
              >
                Join {faction.name}
              </MatrixButton>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-theme-muted">
            Your choice will unlock unique training paths and influence your Matrix experience
          </p>
        </div>
      </div>
    </MatrixLayout>
  );
}
