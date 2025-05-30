import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterAvatar } from '../../components/CharacterSystem';

export default function FactionPortal() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Load progress from localStorage
    const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    setProgress(matrixProgress);
  }, []);

  const factions = [
    {
      id: 'zion-fleet',
      name: 'Zion Fleet',
      route: '/matrix-v1/zion-fleet',
      leader: 'locke',
      mentor: 'niobe',
      color: 'red',
      description: 'Military backbone of humanity\'s resistance',
      modules: ['Briefing', 'Ship Operations', 'Combat Simulation'],
      icon: '⚔️',
      glowColor: 'shadow-red-500/30',
      bgGradient: 'from-red-900/20 to-red-800/10',
      borderColor: 'border-red-400/60'
    },
    {
      id: 'rebel-hackers',
      name: 'Rebel Hackers',
      route: '/matrix-v1/rebel-hackers',
      leader: 'tank',
      mentor: 'dozer',
      color: 'green',
      description: 'Bend Matrix rules to your will',
      modules: ['Code Injection', 'Rule Manipulation', 'System Mastery'],
      icon: '💻',
      glowColor: 'shadow-green-500/30',
      bgGradient: 'from-green-900/20 to-green-800/10',
      borderColor: 'border-green-400/60'
    },
    {
      id: 'oracle-seekers',
      name: 'Oracle Seekers',
      route: '/matrix-v1/oracle-seekers',
      leader: 'oracle',
      mentor: 'seraph',
      color: 'blue',
      description: 'Seek wisdom and deeper purpose',
      modules: ['Philosophical Insight', 'Future Sight', 'Wisdom Teaching'],
      icon: '🔮',
      glowColor: 'shadow-blue-500/30',
      bgGradient: 'from-blue-900/20 to-blue-800/10',
      borderColor: 'border-blue-400/60'
    }
  ];

  const getFactionProgress = (factionId) => {
    const completed = progress.completedNodes || [];
    const factionNodes = completed.filter(node => 
      node.includes(factionId.replace('-', '-'))
    );
    return {
      completed: factionNodes.length,
      total: 3,
      percentage: Math.round((factionNodes.length / 3) * 100)
    };
  };

  const enterFaction = (faction) => {
    navigate(faction.route);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-black to-purple-900/5"></div>
      <div className="absolute inset-0 bg-grid-small opacity-20"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4 animate-pulse">
            🌀 FACTION PORTAL
          </h1>
          <p className="text-gray-300 text-lg">
            Choose your path through the resistance networks
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Progress is automatically tracked across all faction training modules
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {factions.map((faction) => {
            const factionProgress = getFactionProgress(faction.id);
            
            return (
              <div
                key={faction.id}
                className={`
                  relative group cursor-pointer transition-all duration-500 transform hover:scale-105
                  bg-gradient-to-br ${faction.bgGradient}
                  border-2 ${faction.borderColor}
                  rounded-xl p-6 hover:shadow-2xl ${faction.glowColor}
                  backdrop-blur-sm
                `}
                onClick={() => enterFaction(faction)}
              >
                {/* Portal effect overlay */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                
                {/* Faction Icon */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3 group-hover:animate-pulse">
                    {faction.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {faction.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {faction.description}
                  </p>
                </div>

                {/* Leadership */}
                <div className="flex justify-center gap-6 mb-6">
                  <div className="text-center">
                    <CharacterAvatar characterKey={faction.leader} size="md" />
                    <div className="text-xs text-gray-400 mt-1">Leader</div>
                  </div>
                  <div className="text-center">
                    <CharacterAvatar characterKey={faction.mentor} size="md" />
                    <div className="text-xs text-gray-400 mt-1">Mentor</div>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Training Progress</span>
                    <span>{factionProgress.completed}/{factionProgress.total}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-700 ${
                        faction.color === 'red' ? 'bg-red-500' :
                        faction.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${factionProgress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    {factionProgress.percentage}% Complete
                  </div>
                </div>

                {/* Module Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white">Training Modules:</h4>
                  {faction.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className={`
                        w-2 h-2 rounded-full 
                        ${index < factionProgress.completed 
                          ? (faction.color === 'red' ? 'bg-red-400' : 
                             faction.color === 'green' ? 'bg-green-400' : 'bg-blue-400')
                          : 'bg-gray-600'
                        }
                      `}></div>
                      <span className={`
                        ${index < factionProgress.completed ? 'text-gray-300' : 'text-gray-500'}
                      `}>
                        {module}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enter Button */}
                <div className="mt-6 text-center">
                  <div className={`
                    px-4 py-2 rounded-full border ${faction.borderColor} 
                    text-sm font-bold transition-all duration-300
                    group-hover:bg-white/10 group-hover:shadow-lg
                  `}>
                    {factionProgress.completed === 0 ? 'Begin Training' : 
                     factionProgress.completed === factionProgress.total ? 'Training Complete' : 
                     'Continue Training'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Branching Mini-Map Preview */}
        <div className="bg-gray-900/50 border border-gray-600/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            🗺️ Faction Training Paths
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="text-red-400 font-bold mb-2">⚔️ Military Path</div>
              <div className="text-gray-400 space-y-1">
                <div>→ Ship Operations</div>
                <div>→ Combat Training</div>
                <div>→ Fleet Command</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold mb-2">💻 Hacker Path</div>
              <div className="text-gray-400 space-y-1">
                <div>→ Code Injection</div>
                <div>→ Reality Bending</div>
                <div>→ System Mastery</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold mb-2">🔮 Wisdom Path</div>
              <div className="text-gray-400 space-y-1">
                <div>→ Philosophical Insight</div>
                <div>→ Prophecy Reading</div>
                <div>→ Truth Seeking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-4 border-t border-gray-600/20 flex justify-between">
          <button
            onClick={() => navigate('/matrix-v1/map-d3')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Story Map
          </button>
          
          <button
            onClick={() => navigate('/matrix-v1')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            Return to Matrix Entry
          </button>
        </div>
      </div>
    </div>
  );
} 