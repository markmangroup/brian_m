import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDialogue, CharacterAvatar } from '../../components/CharacterSystem';

export default function ZionFleet() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('briefing'); // briefing, training, combat, complete
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Ship Combat Mini-Game State
  const [targets, setTargets] = useState([]);
  const [ammunition, setAmmunition] = useState(10);
  const [hits, setHits] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    if (currentPhase === 'combat' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentPhase === 'combat' && timeRemaining === 0) {
      completeCombatPhase();
    }
  }, [currentPhase, timeRemaining]);

  const startCombatPhase = () => {
    setCurrentPhase('combat');
    setTimeRemaining(30);
    setAmmunition(10);
    setHits(0);
    generateTargets();
  };

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 6; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% of width
        y: Math.random() * 60 + 20, // 20-80% of height
        type: Math.random() > 0.7 ? 'sentinel' : 'machine',
        hit: false
      });
    }
    setTargets(newTargets);
  };

  const fireAtTarget = (targetId) => {
    if (ammunition <= 0) return;
    
    setTargets(prev => prev.map(target => 
      target.id === targetId ? { ...target, hit: true } : target
    ));
    setAmmunition(prev => prev - 1);
    setHits(prev => prev + 1);
    setScore(prev => prev + 100);
    setFeedback('🎯 Target eliminated!');
    
    setTimeout(() => setFeedback(''), 1000);
  };

  const completeCombatPhase = () => {
    const finalScore = (hits / 6) * 100;
    setProgress(100);
    
    if (finalScore >= 70) {
      setCurrentPhase('complete');
      setFeedback('🏆 Combat training completed with distinction!');
      
      // Update progress tracking
      const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
      matrixProgress.completedNodes = matrixProgress.completedNodes || [];
      matrixProgress.completedNodes.push('matrix-zion-fleet');
      matrixProgress.zionFleetScore = finalScore;
      localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));
    } else {
      setFeedback('⚠️ Training incomplete. You need 70% accuracy to graduate.');
    }
  };

  const proceedToNextPath = (destination) => {
    navigate(destination);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-red-400 mb-2">[Active] Zion Fleet Training</h1>
        
        <div className="mb-6">
          <CharacterDialogue 
            characterKey="locke"
            text="Welcome to the Zion Defense Corps. The machines are coming, and we need soldiers who can fight both in and out of the Matrix."
            showTitle={true}
            className="animate-fade-in"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Training Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-red-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Briefing Phase */}
        {currentPhase === 'briefing' && (
          <div className="space-y-6">
            <div className="bg-red-900/20 border border-red-400/30 rounded p-6">
              <h2 className="text-xl text-red-300 font-bold mb-4">⚔️ Military Briefing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-white font-bold mb-3">Mission Overview</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    The machines have found our location. Every day we delay is another day closer to Zion's destruction. 
                    You will learn ship operations, combat tactics, and how to coordinate with your crew under pressure.
                  </p>
                  
                  <h3 className="text-lg text-white font-bold mb-3">Core Values</h3>
                  <blockquote className="text-sm italic text-red-300 border-l-4 border-red-400/30 pl-4 mb-4">
                    "Victory through strength and unity."
                  </blockquote>

                  <h3 className="text-lg text-white font-bold mb-3">Your Command Structure</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey="locke" size="sm" />
                      <div>
                        <div className="text-red-300 font-bold text-sm">Commander</div>
                        <div className="text-gray-300 text-xs">Locke - Zion Defense</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey="niobe" size="sm" />
                      <div>
                        <div className="text-red-300 font-bold text-sm">Captain</div>
                        <div className="text-gray-300 text-xs">Niobe - Ship Operations</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white font-bold mb-3">Training Phases</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-red-400">Phase 1: Strategic Briefing</div>
                      <div className="text-xs text-gray-400">Understand the war and your role</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-yellow-400">Phase 2: Ship Operations</div>
                      <div className="text-xs text-gray-400">Master navigation and systems</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-green-400">Phase 3: Combat Simulation</div>
                      <div className="text-xs text-gray-400">Prove your readiness for battle</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
                    <h4 className="font-bold text-yellow-400 mb-2">⚠️ Reminder</h4>
                    <p className="text-yellow-300 text-xs">
                      This path demands absolute loyalty and sacrifice. 
                      The survival of humanity depends on your commitment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentPhase('training');
                    setProgress(25);
                  }}
                  className="px-6 py-3 rounded border border-red-400/60 bg-red-900/20 text-red-300 hover:bg-red-900/40 transition-all font-bold"
                >
                  🚢 Begin Ship Operations Training
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Training Phase */}
        {currentPhase === 'training' && (
          <div className="space-y-6">
            <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-6">
              <h2 className="text-xl text-yellow-300 font-bold mb-4">⚙️ Ship Operations Training</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded p-4 text-center">
                  <div className="text-2xl mb-2">🛸</div>
                  <div className="text-sm text-gray-300">Navigation</div>
                  <div className="text-green-400 text-xs">✓ Completed</div>
                </div>
                <div className="bg-gray-800/50 rounded p-4 text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-gray-300">Power Systems</div>
                  <div className="text-green-400 text-xs">✓ Completed</div>
                </div>
                <div className="bg-gray-800/50 rounded p-4 text-center">
                  <div className="text-2xl mb-2">📡</div>
                  <div className="text-sm text-gray-300">Communications</div>
                  <div className="text-green-400 text-xs">✓ Completed</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 mb-4">Training modules completed. Ready for live combat simulation.</p>
                <button
                  onClick={() => {
                    startCombatPhase();
                    setProgress(50);
                  }}
                  className="px-6 py-3 rounded border border-yellow-400/60 bg-yellow-900/20 text-yellow-300 hover:bg-yellow-900/40 transition-all font-bold"
                >
                  🎯 Start Combat Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Combat Phase */}
        {currentPhase === 'combat' && (
          <div className="space-y-6">
            <div className="bg-orange-900/20 border border-orange-400/30 rounded p-6">
              <h2 className="text-xl text-orange-300 font-bold mb-4">⚔️ Combat Simulation</h2>
              
              {/* Combat HUD */}
              <div className="grid grid-cols-4 gap-4 mb-6 text-center">
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="text-lg font-bold text-blue-400">{ammunition}</div>
                  <div className="text-xs text-gray-400">Ammunition</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="text-lg font-bold text-green-400">{hits}</div>
                  <div className="text-xs text-gray-400">Targets Hit</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="text-lg font-bold text-yellow-400">{score}</div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3">
                  <div className="text-lg font-bold text-red-400">{timeRemaining}</div>
                  <div className="text-xs text-gray-400">Time Left</div>
                </div>
              </div>

              {/* Combat Arena */}
              <div className="relative bg-gray-900/50 border border-gray-600/30 rounded h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/50"></div>
                
                {targets.map((target) => (
                  <button
                    key={target.id}
                    onClick={() => fireAtTarget(target.id)}
                    disabled={target.hit || ammunition <= 0}
                    className={`
                      absolute w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110
                      ${target.hit 
                        ? 'bg-red-500 border-red-300 opacity-50 cursor-not-allowed' 
                        : target.type === 'sentinel'
                          ? 'bg-purple-600 border-purple-400 hover:bg-purple-500 animate-pulse'
                          : 'bg-gray-600 border-gray-400 hover:bg-gray-500'
                      }
                    `}
                    style={{ 
                      left: `${target.x}%`, 
                      top: `${target.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {target.type === 'sentinel' ? '🤖' : '⚙️'}
                  </button>
                ))}

                {/* Crosshair */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-8 h-8 border border-red-400 rounded-full opacity-30"></div>
                  <div className="absolute w-1 h-8 bg-red-400 opacity-30"></div>
                  <div className="absolute w-8 h-1 bg-red-400 opacity-30"></div>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">Click targets to eliminate them. Purple targets are high-value Sentinels!</p>
              </div>
            </div>
          </div>
        )}

        {/* Complete Phase */}
        {currentPhase === 'complete' && (
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-400/30 rounded p-6 text-center">
              <h2 className="text-2xl text-green-300 font-bold mb-4">🎖️ Military Training Complete</h2>
              
              <div className="text-6xl mb-4">👨‍✈️</div>
              
              <div className="mb-6">
                <CharacterDialogue 
                  characterKey="niobe"
                  text="Outstanding work, soldier. You've earned your place among Zion's defenders. The fleet is stronger with you in it."
                  size="md"
                />
              </div>
              
              <div className="bg-gray-800/50 rounded p-4 mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Training Results</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-red-400 font-bold">{Math.floor((hits / 6) * 100)}%</div>
                    <div className="text-gray-400">Combat Accuracy</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">{timeRemaining}s</div>
                    <div className="text-gray-400">Time Remaining</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">{score}</div>
                    <div className="text-gray-400">Final Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Choose Your Next Mission</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/combat-nexus')}
                    className="p-4 rounded border border-red-400/60 bg-red-900/20 text-red-300 hover:bg-red-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">⚔️ Combat Nexus</div>
                    <div className="text-sm text-gray-400">Advanced tactical missions</div>
                  </button>
                  
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/the-source')}
                    className="p-4 rounded border border-purple-400/60 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">🎯 The Source</div>
                    <div className="text-sm text-gray-400">Final convergence point</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="bg-blue-900/20 border border-blue-400/30 rounded p-3 text-center">
            <span className="text-blue-300">{feedback}</span>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 pt-4 border-t border-gray-600/20 flex justify-between">
          <button
            onClick={() => navigate('/matrix-v1/faction-choice')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Return to Faction Choice
          </button>
          
          <button
            onClick={() => navigate('/matrix-v1/map-d3')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            View Story Map
          </button>
        </div>
      </div>
    </div>
  );
} 