import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GhostLayer2() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('arrival');
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [systemHealth, setSystemHealth] = useState(100);
  const [breachProgress, setBreachProgress] = useState(0);
  const [stabilityNodes, setStabilityNodes] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showChoice, setShowChoice] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  const puzzleAreaRef = useRef(null);
  const NODE_COUNT = 8;
  const STABILITY_THRESHOLD = 70;
  const BREACH_THRESHOLD = 80;

  useEffect(() => {
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        id: i,
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20,
        stability: Math.random() * 40 + 30,
        active: false,
        glitching: false,
        lastStabilized: 0
      });
    }
    setStabilityNodes(nodes);
  }, []);

  useEffect(() => {
    if (currentPhase === 'puzzle' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        setSystemHealth(prev => Math.max(0, prev - Math.random() * 1.5));
        
        if (Math.random() < 0.3) {
          setGlitchIntensity(Math.random() * 100);
          setTimeout(() => setGlitchIntensity(0), 200);
        }

        setStabilityNodes(prevNodes => 
          prevNodes.map(node => ({
            ...node,
            stability: Math.max(0, node.stability - Math.random() * 2),
            glitching: Math.random() < 0.1
          }))
        );
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && currentPhase === 'puzzle') {
      completePuzzle();
    }
  }, [currentPhase, timeRemaining]);

  useEffect(() => {
    const avgStability = stabilityNodes.reduce((sum, node) => sum + node.stability, 0) / stabilityNodes.length;
    
    if (avgStability > STABILITY_THRESHOLD && breachProgress > BREACH_THRESHOLD) {
      setPuzzleComplete(true);
      setFeedback('🟢 OPTIMAL BREACH WINDOW ACHIEVED');
      setTimeout(() => setShowChoice(true), 2000);
    } else if (systemHealth < 10) {
      setFeedback('🔴 CRITICAL SYSTEM FAILURE - EMERGENCY PROTOCOLS ACTIVE');
      setTimeout(() => setShowChoice(true), 2000);
    }
  }, [stabilityNodes, breachProgress, systemHealth]);

  const stabilizeNode = (nodeId) => {
    setStabilityNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId
          ? {
              ...node,
              stability: Math.min(100, node.stability + 15),
              active: true,
              glitching: false,
              lastStabilized: Date.now()
            }
          : node
      )
    );
    
    setScore(prev => prev + 10);
    setBreachProgress(prev => Math.min(100, prev + 8));
    setSystemHealth(prev => Math.min(100, prev + 5));
    setFeedback('⚡ Node stabilized');
    setTimeout(() => setFeedback(''), 800);
  };

  const completePuzzle = () => {
    setCurrentPhase('complete');
    const finalScore = score + (timeRemaining * 2) + (systemHealth * 1.5);
    
    const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    matrixProgress.ghostLayer2Score = finalScore;
    matrixProgress.ghostLayer2Choice = null;
    localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));
  };

  const makeChoice = (choice) => {
    const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    matrixProgress.ghostLayer2Choice = choice;
    localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));

    if (choice === 'breach') {
      navigate('/matrix-v1/glitch-hunter');
    } else {
      navigate('/matrix-v1/the-source');
    }
  };

  const startPuzzle = () => {
    setCurrentPhase('puzzle');
    setTimeRemaining(60);
    setSystemHealth(100);
    setBreachProgress(0);
    setScore(0);
  };

  const getGlitchStyle = () => ({
    filter: glitchIntensity > 0 ? `hue-rotate(${glitchIntensity}deg) saturate(150%)` : 'none',
    transform: glitchIntensity > 50 ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : 'none'
  });

  return (
    <div 
      className="min-h-screen bg-black text-white p-6 font-mono relative overflow-hidden"
      style={getGlitchStyle()}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-red-950/30 animate-pulse"></div>
      
      {glitchIntensity > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(${Math.random() * 360}deg, 
              rgba(255,0,255,${glitchIntensity/200}) 0%, 
              transparent 50%, 
              rgba(0,255,255,${glitchIntensity/200}) 100%)`,
            mixBlendMode: 'screen'
          }}
        ></div>
      )}

      <div className="relative z-20 max-w-6xl mx-auto">
        {currentPhase === 'arrival' && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl font-bold text-purple-400 animate-pulse">
                ▓▓▓ GHOST LAYER: BREACH POINT ▓▓▓
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-red-300">Reality matrix destabilizing...</p>
                <p className="text-lg text-cyan-300">Unauthorized presence detected</p>
                <p className="text-md text-yellow-300 animate-pulse">TRACE INITIATED</p>
              </div>
              <button
                onClick={() => setCurrentPhase('briefing')}
                className="mt-8 px-6 py-3 border border-purple-400/60 bg-purple-900/20 text-purple-300 
                           hover:bg-purple-900/40 transition-all font-bold animate-pulse"
              >
                ESTABLISH CONNECTION →
              </button>
            </div>
          </div>
        )}

        {currentPhase === 'briefing' && (
          <div className="space-y-6">
            <h1 className="text-2xl text-purple-400 mb-6">
              [CRITICAL] Ghost Layer: Breach Point
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-red-900/20 border border-red-400/30 rounded p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">P</div>
                    <div>
                      <div className="text-red-300 font-bold">Proxy</div>
                      <div className="text-xs text-gray-400">System Guardian</div>
                    </div>
                  </div>
                  <p className="text-red-200 italic">
                    "You've come too far too fast. The system's seams are visible here - but they're unstable."
                  </p>
                </div>

                <div className="bg-purple-900/20 border border-purple-400/30 rounded p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">F</div>
                    <div>
                      <div className="text-purple-300 font-bold">Fracture Entity</div>
                      <div className="text-xs text-gray-400">Code Anomaly</div>
                    </div>
                  </div>
                  <p className="text-purple-200 italic">
                    "The code bends here. Step lightly. Reality bleeds through the cracks."
                  </p>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-4">
                  <h3 className="text-yellow-400 font-bold mb-2">⚠️ SYSTEM WARNING</h3>
                  <p className="text-yellow-300 text-sm">
                    Unauthorized presence detected. Trace protocols activated. 
                    You have limited time before security countermeasures engage.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cyan-900/20 border border-cyan-400/30 rounded p-4">
                  <h3 className="text-cyan-400 font-bold mb-3">🎯 BREACH MECHANICS</h3>
                  <ul className="text-cyan-300 text-sm space-y-2">
                    <li>• Stabilize system nodes to maintain breach window</li>
                    <li>• Monitor system health - failure means detection</li>
                    <li>• Build breach progress while keeping stability high</li>
                    <li>• Time pressure: Security traces are active</li>
                  </ul>
                </div>

                <div className="bg-purple-900/20 border border-purple-400/30 rounded p-4">
                  <h3 className="text-purple-400 font-bold mb-3">⚡ OBJECTIVES</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Node Stability:</span>
                      <span className="text-green-400">{STABILITY_THRESHOLD}%+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Breach Progress:</span>
                      <span className="text-yellow-400">{BREACH_THRESHOLD}%+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Time Limit:</span>
                      <span className="text-red-400">60 seconds</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startPuzzle}
                  className="w-full px-6 py-4 border border-red-400/60 bg-red-900/20 text-red-300 
                             hover:bg-red-900/40 transition-all font-bold text-lg"
                >
                  🚨 INITIATE BREACH SEQUENCE
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPhase === 'puzzle' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl text-red-400">BREACH IN PROGRESS</h1>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{timeRemaining}s</div>
                <div className="text-xs text-gray-400">TIME REMAINING</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900/50 border border-green-400/30 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">SYSTEM HEALTH</div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      systemHealth > 60 ? 'bg-green-400' : 
                      systemHealth > 30 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${systemHealth}%` }}
                  ></div>
                </div>
                <div className="text-lg font-bold text-white mt-1">{Math.round(systemHealth)}%</div>
              </div>

              <div className="bg-gray-900/50 border border-blue-400/30 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">BREACH PROGRESS</div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${breachProgress}%` }}
                  ></div>
                </div>
                <div className="text-lg font-bold text-white mt-1">{Math.round(breachProgress)}%</div>
              </div>

              <div className="bg-gray-900/50 border border-purple-400/30 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">SCORE</div>
                <div className="text-lg font-bold text-purple-400">{score}</div>
              </div>
            </div>

            <div 
              ref={puzzleAreaRef}
              className="relative bg-black/80 border border-red-400/50 rounded-lg h-96 overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)`,
              }}
            >
              <div className="absolute inset-0 opacity-20"
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                     `,
                     backgroundSize: '30px 30px'
                   }}
              ></div>

              {stabilityNodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => stabilizeNode(node.id)}
                  className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 transform hover:scale-125 
                    ${node.glitching ? 'animate-pulse' : ''}
                    ${node.active ? 'animate-spin' : ''}
                  `}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    backgroundColor: node.stability > 70 ? '#22c55e' : 
                                   node.stability > 40 ? '#f59e0b' : '#ef4444',
                    borderColor: node.active ? '#8b5cf6' : '#374151',
                    boxShadow: node.glitching ? `0 0 20px ${
                      node.stability > 70 ? '#22c55e' : 
                      node.stability > 40 ? '#f59e0b' : '#ef4444'
                    }` : 'none',
                    opacity: node.stability / 100
                  }}
                >
                  <span className="text-xs font-bold text-black">
                    {Math.round(node.stability)}
                  </span>
                </button>
              ))}

              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: Math.floor(breachProgress / 10) }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {feedback && (
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-cyan-900/20 border border-cyan-400/30 rounded text-cyan-300">
                  {feedback}
                </div>
              </div>
            )}

            <div className="bg-gray-900/30 border border-gray-600/20 rounded p-4 text-center">
              <p className="text-gray-400 text-sm">
                Click unstable nodes (red/yellow) to stabilize them. Keep system health above critical while building breach progress.
              </p>
            </div>
          </div>
        )}

        {showChoice && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl text-purple-400 font-bold">BREACH WINDOW CRITICAL</h1>
              <div className="bg-red-900/20 border border-red-400/30 rounded p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">P</div>
                  <div>
                    <div className="text-red-300 font-bold">Proxy</div>
                    <div className="text-xs text-gray-400">System Guardian</div>
                  </div>
                </div>
                <p className="text-red-200 italic">
                  "Choose quickly — the breach window narrows with each second."
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-400/30 rounded p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">F</div>
                  <div>
                    <div className="text-purple-300 font-bold">Fracture Entity</div>
                    <div className="text-xs text-gray-400">Code Anomaly</div>
                  </div>
                </div>
                <p className="text-purple-200 italic">
                  "Reality bleeds through the cracks. Either path leads to truth."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-900/20 border border-red-400/50 rounded-lg p-6 hover:bg-red-900/30 transition-all">
                <h3 className="text-xl text-red-400 font-bold mb-4">⚡ ATTEMPT CONTROLLED BREACH</h3>
                <p className="text-gray-300 mb-4">
                  Push through the system barriers despite the instability. 
                  Risk detection and pursue deeper corruption data.
                </p>
                <ul className="text-sm text-red-300 space-y-1 mb-6">
                  <li>• High risk, high reward</li>
                  <li>• Access to anomaly data</li>
                  <li>• Potential system exposure</li>
                </ul>
                <button
                  onClick={() => makeChoice('breach')}
                  className="w-full px-6 py-3 border border-red-400/60 bg-red-900/40 text-red-300 
                             hover:bg-red-900/60 transition-all font-bold"
                >
                  BREACH THE SYSTEM →
                </button>
              </div>

              <div className="bg-green-900/20 border border-green-400/50 rounded-lg p-6 hover:bg-green-900/30 transition-all">
                <h3 className="text-xl text-green-400 font-bold mb-4">🛡️ STABILIZE AND TRANSMIT DATA</h3>
                <p className="text-gray-300 mb-4">
                  Maintain system stability and transmit collected data safely. 
                  Ensure mission success without compromising the network.
                </p>
                <ul className="text-sm text-green-300 space-y-1 mb-6">
                  <li>• Safe data transmission</li>
                  <li>• Preserved network integrity</li>
                  <li>• Mission completion guarantee</li>
                </ul>
                <button
                  onClick={() => makeChoice('stabilize')}
                  className="w-full px-6 py-3 border border-green-400/60 bg-green-900/40 text-green-300 
                             hover:bg-green-900/60 transition-all font-bold"
                >
                  STABILIZE SYSTEM →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPhase === 'complete' && !showChoice && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl text-green-400 font-bold animate-pulse">
              BREACH SEQUENCE COMPLETE
            </h1>
            <p className="text-lg text-gray-300">
              System analysis complete. Breach window stabilized.
            </p>
            <div className="bg-green-900/20 border border-green-400/30 rounded p-6">
              <div className="text-2xl text-green-400 font-bold mb-2">Final Score: {score}</div>
              <div className="text-sm text-gray-400">Time Bonus: +{timeRemaining * 2}</div>
              <div className="text-sm text-gray-400">Health Bonus: +{Math.round(systemHealth * 1.5)}</div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes matrix-glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(1px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, -1px); }
          60% { transform: translate(1px, 1px); }
          70% { transform: translate(-1px, -2px); }
          80% { transform: translate(2px, 1px); }
          90% { transform: translate(-2px, 2px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
} 