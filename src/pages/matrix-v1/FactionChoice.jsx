import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDialogue, CharacterAvatar } from '../../components/CharacterSystem';

export default function FactionChoice() {
  const navigate = useNavigate();
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const factions = [
    {
      id: 'zion-fleet',
      name: 'Zion Fleet',
      leader: 'locke',
      mentor: 'niobe',
      color: 'red',
      route: '/matrix-v1/zion-fleet',
      description: 'Join the military backbone of humanity\'s resistance.',
      details: 'The Zion Fleet represents humanity\'s last defense against the machine war. You\'ll learn ship operations, combat tactics, and strategic warfare. The path of the soldier - disciplined, direct, and decisive.',
      strengths: ['Combat Training', 'Ship Operations', 'Military Strategy', 'Team Coordination'],
      philosophy: 'Victory through strength and unity.',
      warning: 'This path demands absolute loyalty and sacrifice.',
      icon: '⚔️'
    },
    {
      id: 'rebel-hackers',
      name: 'Rebel Hackers',
      leader: 'tank',
      mentor: 'dozer',
      color: 'green',
      route: '/matrix-v1/rebel-hackers',
      description: 'Master the art of bending Matrix rules to your will.',
      details: 'The underground hacker network pushes the boundaries of what\'s possible within the Matrix. You\'ll learn code manipulation, system exploitation, and reality bending. The path of the innovator - creative, rebellious, and limitless.',
      strengths: ['Code Injection', 'Rule Manipulation', 'System Exploits', 'Reality Bending'],
      philosophy: 'There are no rules, only limitations you accept.',
      warning: 'This path risks madness from seeing too deeply.',
      icon: '💻'
    },
    {
      id: 'oracle-seekers',
      name: 'Oracle Seekers',
      leader: 'oracle',
      mentor: 'seraph',
      color: 'blue',
      route: '/matrix-v1/oracle-seekers',
      description: 'Seek wisdom and understand the deeper purpose.',
      details: 'The Oracle Seekers pursue truth beyond the surface conflict. You\'ll explore philosophical puzzles, prophecy interpretation, and the nature of choice itself. The path of the wise - patient, intuitive, and profound.',
      strengths: ['Philosophical Insight', 'Future Sight', 'Pattern Recognition', 'Wisdom Teaching'],
      philosophy: 'You already know the choice. You\'re here to understand why you made it.',
      warning: 'This path reveals truths you may not be ready for.',
      icon: '🔮'
    }
  ];

  const handleFactionSelect = (faction) => {
    setSelectedFaction(faction);
    setShowDetails(true);
  };

  const handleConfirmChoice = () => {
    if (selectedFaction) {
      // Store choice in localStorage for progress tracking
      const progress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
      progress.factionChoice = selectedFaction.id;
      progress.completedNodes = progress.completedNodes || [];
      progress.completedNodes.push('matrix-red-faction-choice');
      localStorage.setItem('matrixProgress', JSON.stringify(progress));
      
      navigate(selectedFaction.route);
    }
  };

  const getColorClasses = (faction) => {
    switch (faction.color) {
      case 'red': return {
        border: 'border-red-400/30',
        bg: 'bg-red-900/10',
        text: 'text-red-300',
        hover: 'hover:border-red-400/60 hover:bg-red-900/20',
        selected: 'border-red-400/80 bg-red-900/30 shadow-red-400/20 shadow-lg'
      };
      case 'green': return {
        border: 'border-green-400/30',
        bg: 'bg-green-900/10',
        text: 'text-green-300',
        hover: 'hover:border-green-400/60 hover:bg-green-900/20',
        selected: 'border-green-400/80 bg-green-900/30 shadow-green-400/20 shadow-lg'
      };
      case 'blue': return {
        border: 'border-blue-400/30',
        bg: 'bg-blue-900/10',
        text: 'text-blue-300',
        hover: 'hover:border-blue-400/60 hover:bg-blue-900/20',
        selected: 'border-blue-400/80 bg-blue-900/30 shadow-blue-400/20 shadow-lg'
      };
      default: return {
        border: 'border-gray-400/30',
        bg: 'bg-gray-900/10',
        text: 'text-gray-300',
        hover: 'hover:border-gray-400/60',
        selected: 'border-gray-400/80 bg-gray-900/30'
      };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-cyan-400 mb-2">[Critical] Faction Choice</h1>
        
        <div className="mb-8">
          <CharacterDialogue 
            characterKey="morpheus"
            text="Each faction serves the resistance differently. Choose wisely - this will define your path."
            showTitle={true}
            className="animate-fade-in"
          />
        </div>

        {!showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {factions.map((faction) => {
              const colors = getColorClasses(faction);
              return (
                <button
                  key={faction.id}
                  onClick={() => handleFactionSelect(faction)}
                  className={`
                    p-6 rounded border transition-all text-left cursor-pointer
                    ${colors.border} ${colors.bg} ${colors.hover}
                    transform hover:scale-105 hover:-translate-y-1
                  `}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{faction.icon}</div>
                    <h3 className={`text-xl font-bold ${colors.text}`}>
                      {faction.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-300">{faction.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs">Leader:</span>
                      <CharacterAvatar characterKey={faction.leader} size="xs" showName={true} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs">Mentor:</span>
                      <CharacterAvatar characterKey={faction.mentor} size="xs" showName={true} />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-600/30">
                    <span className="text-xs text-gray-500">Click to learn more</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Detailed View */}
            <div className={`
              p-6 rounded border transition-all
              ${getColorClasses(selectedFaction).border}
              ${getColorClasses(selectedFaction).bg}
              ${getColorClasses(selectedFaction).selected}
            `}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">{selectedFaction.icon}</div>
                <div>
                  <h2 className={`text-3xl font-bold ${getColorClasses(selectedFaction).text}`}>
                    {selectedFaction.name}
                  </h2>
                  <p className="text-gray-400 mt-2">{selectedFaction.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Path Details</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {selectedFaction.details}
                  </p>
                  
                  <h4 className="font-bold text-white mb-2">Core Strengths:</h4>
                  <ul className="space-y-1">
                    {selectedFaction.strengths.map((strength, index) => (
                      <li key={index} className={`text-sm ${getColorClasses(selectedFaction).text}`}>
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Leadership</h3>
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey={selectedFaction.leader} size="md" />
                      <div>
                        <div className="text-sm font-bold text-white">Leader</div>
                        <CharacterAvatar characterKey={selectedFaction.leader} size="xs" showName={true} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey={selectedFaction.mentor} size="md" />
                      <div>
                        <div className="text-sm font-bold text-white">Mentor</div>
                        <CharacterAvatar characterKey={selectedFaction.mentor} size="xs" showName={true} />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">Philosophy</h3>
                  <blockquote className={`
                    text-sm italic ${getColorClasses(selectedFaction).text} 
                    border-l-4 ${getColorClasses(selectedFaction).border} pl-4 mb-4
                  `}>
                    "{selectedFaction.philosophy}"
                  </blockquote>

                  <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
                    <h4 className="font-bold text-yellow-400 mb-2">⚠️ Warning</h4>
                    <p className="text-yellow-300 text-xs">
                      {selectedFaction.warning}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-600/30">
                <button
                  onClick={handleConfirmChoice}
                  className={`
                    px-8 py-3 rounded font-bold transition-all
                    ${getColorClasses(selectedFaction).border}
                    ${getColorClasses(selectedFaction).bg}
                    ${getColorClasses(selectedFaction).text}
                    hover:scale-105 transform
                  `}
                >
                  🚀 Join {selectedFaction.name}
                </button>

                <button
                  onClick={() => {
                    setSelectedFaction(null);
                    setShowDetails(false);
                  }}
                  className="px-6 py-3 rounded border border-gray-600 bg-gray-900/20 text-gray-300 hover:bg-gray-900/40 transition-all"
                >
                  ← Choose Different Faction
                </button>
              </div>
            </div>

            {/* Quick Comparison */}
            <div className="bg-gray-900/30 border border-gray-600/20 rounded p-4">
              <h3 className="text-lg font-bold text-white mb-3">📊 Quick Comparison</h3>
              <div className="grid grid-cols-3 gap-4 text-xs">
                {factions.map((faction) => {
                  const colors = getColorClasses(faction);
                  const isSelected = faction.id === selectedFaction.id;
                  return (
                    <div key={faction.id} className={`
                      text-center p-2 rounded transition-all
                      ${isSelected 
                        ? `${colors.bg} ${colors.border} border shadow-lg`
                        : 'bg-gray-800/30 border border-gray-700/50'
                      }
                    `}>
                      <div className="text-lg mb-1">{faction.icon}</div>
                      <div className={`font-bold ${isSelected ? colors.text : 'text-gray-400'}`}>
                        {faction.name}
                      </div>
                      <div className="flex justify-center gap-1 mt-1">
                        <CharacterAvatar characterKey={faction.leader} size="xs" />
                        <CharacterAvatar characterKey={faction.mentor} size="xs" />
                      </div>
                      {isSelected && (
                        <div className="text-xs text-cyan-400 mt-1">✓ Selected</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Back to Map */}
        <div className="mt-8 pt-4 border-t border-gray-600/20">
          <button
            onClick={() => navigate('/matrix-v1/map-d3')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Return to Story Map
          </button>
        </div>
      </div>
    </div>
  );
} 