import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDialogue, CharacterAvatar } from '../components/CharacterSystem';

export default function RebelHackers() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('initiation'); // initiation, hacking, manipulation, complete
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Code Injection Game State
  const [codeInput, setCodeInput] = useState('');
  const [targetSystem, setTargetSystem] = useState('security');
  const [injectionAttempts, setInjectionAttempts] = useState(3);
  const [exploitsFound, setExploitsFound] = useState([]);

  const targetSystems = {
    security: {
      name: 'Security Protocol',
      description: 'Bypass authentication system',
      vulnerableCode: 'if (user.password === input) return true;',
      exploit: 'true; // bypassed',
      solution: 'true; // bypassed',
      difficulty: 'Easy',
      tutorialText: 'This security check compares passwords. But what if we just return true instead?',
      examples: [
        'true; // bypassed',
        'return true;',
        'true'
      ],
      explanation: 'Instead of checking passwords, we force the system to always return true (success)!'
    },
    physics: {
      name: 'Physics Engine',
      description: 'Manipulate gravity and movement',
      vulnerableCode: 'gravity = 9.8; speed = velocity * time;',
      exploit: 'gravity = 0; speed = Infinity;',
      solution: 'gravity = 0; speed = Infinity;',
      difficulty: 'Medium',
      tutorialText: 'Physics laws are just variables! What happens if gravity = 0 and speed = Infinity?',
      examples: [
        'gravity = 0; speed = Infinity;',
        'gravity = 0; speed = 999999;',
        'gravity = -10; speed = Infinity;'
      ],
      explanation: 'Set gravity to 0 (no falling) and speed to Infinity (instant movement) to break physics!'
    },
    matrix: {
      name: 'Matrix Core',
      description: 'Access reality manipulation functions',
      vulnerableCode: 'reality.render(scene); user.permissions = "limited";',
      exploit: 'reality.render(null); user.permissions = "admin";',
      solution: 'reality.render(null); user.permissions = "admin";',
      difficulty: 'Hard',
      tutorialText: 'The Matrix renders reality and sets permissions. What if we break rendering and grab admin rights?',
      examples: [
        'reality.render(null); user.permissions = "admin";',
        'reality.render(false); user.permissions = "admin";',
        'reality.render(); user.permissions = "admin";'
      ],
      explanation: 'Break reality rendering with null, then give yourself admin permissions to control everything!'
    }
  };

  const ruleManipulations = [
    { id: 1, rule: 'Bullets cause damage', hack: 'Dodge bullets in slow motion', completed: false },
    { id: 2, rule: 'Walls are solid', hack: 'Phase through objects', completed: false },
    { id: 3, rule: 'Agents are invincible', hack: 'Exploit Agent vulnerabilities', completed: false },
    { id: 4, rule: 'Death is permanent', hack: 'Respawn with memory intact', completed: false }
  ];

  const [rules, setRules] = useState(ruleManipulations);

  const attemptCodeInjection = () => {
    if (injectionAttempts <= 0) return;

    const target = targetSystems[targetSystem];
    const isSuccess = codeInput.trim().toLowerCase().includes(target.exploit.toLowerCase()) ||
                     codeInput.trim() === target.solution;

    if (isSuccess) {
      setExploitsFound([...exploitsFound, targetSystem]);
      setScore(prev => prev + (target.difficulty === 'Hard' ? 300 : target.difficulty === 'Medium' ? 200 : 100));
      setFeedback(`✅ ${target.name} compromised! Access granted.`);
      
      // Move to next system or complete phase
      const systems = Object.keys(targetSystems);
      const currentIndex = systems.indexOf(targetSystem);
      if (currentIndex < systems.length - 1) {
        setTargetSystem(systems[currentIndex + 1]);
        setCodeInput('');
      } else {
        setCurrentPhase('manipulation');
        setProgress(75);
      }
    } else {
      setInjectionAttempts(prev => prev - 1);
      setFeedback(`❌ Injection failed. ${injectionAttempts - 1} attempts remaining.`);
    }

    setTimeout(() => setFeedback(''), 2000);
  };

  const hackRule = (ruleId) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, completed: true } : rule
    ));
    setScore(prev => prev + 150);
    setFeedback('🔥 Reality rule successfully manipulated!');
    setTimeout(() => setFeedback(''), 1500);

    // Check if all rules are hacked
    const updatedRules = rules.map(rule => 
      rule.id === ruleId ? { ...rule, completed: true } : rule
    );
    if (updatedRules.every(rule => rule.completed)) {
      setCurrentPhase('complete');
      setProgress(100);
      
      // Update progress tracking
      const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
      matrixProgress.completedNodes = matrixProgress.completedNodes || [];
      matrixProgress.completedNodes.push('matrix-rebel-hackers');
      matrixProgress.hackerScore = score + 150;
      localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));
    }
  };

  const proceedToNextPath = (destination) => {
    navigate(destination);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-green-400 mb-2">[Active] Rebel Hacker Network</h1>
        
        <div className="mb-6">
          <CharacterDialogue 
            characterKey="tank"
            text="Welcome to the underground, kid. Time to learn what's really possible."
            showTitle={true}
            className="animate-fade-in"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Hacking Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Initiation Phase */}
        {currentPhase === 'initiation' && (
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-400/30 rounded p-6">
              <h2 className="text-xl text-green-300 font-bold mb-4">💻 Hacker Initiation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-white font-bold mb-3">The Network</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    We don't follow the Matrix's rules. We rewrite them. Every system has vulnerabilities, 
                    every limitation can be bypassed. You'll learn to see the code behind reality itself.
                  </p>
                  
                  <h3 className="text-lg text-white font-bold mb-3">Core Philosophy</h3>
                  <blockquote className="text-sm italic text-green-300 border-l-4 border-green-400/30 pl-4 mb-4">
                    "There are no rules, only limitations you accept."
                  </blockquote>

                  <h3 className="text-lg text-white font-bold mb-3">Your Mentors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey="tank" size="sm" />
                      <div>
                        <div className="text-green-300 font-bold text-sm">Leader</div>
                        <div className="text-gray-300 text-xs">Tank - Network Commander</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey="dozer" size="sm" />
                      <div>
                        <div className="text-green-300 font-bold text-sm">Tech Specialist</div>
                        <div className="text-gray-300 text-xs">Dozer - Systems Engineer</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterKey="mouse" size="sm" />
                      <div>
                        <div className="text-green-300 font-bold text-sm">Code Master</div>
                        <div className="text-gray-300 text-xs">Mouse - Reality Programmer</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white font-bold mb-3">Training Modules</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-green-400">Phase 1: Code Injection</div>
                      <div className="text-xs text-gray-400">Learn to exploit system vulnerabilities</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-yellow-400">Phase 2: Rule Manipulation</div>
                      <div className="text-xs text-gray-400">Bend reality to your will</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-red-400">Phase 3: System Mastery</div>
                      <div className="text-xs text-gray-400">Become one with the code</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
                    <h4 className="font-bold text-yellow-400 mb-2">⚠️ Warning</h4>
                    <p className="text-yellow-300 text-xs">
                      Deep system access can fracture your perception of reality. 
                      Some hackers lose themselves in the code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentPhase('hacking');
                    setProgress(25);
                  }}
                  className="px-6 py-3 rounded border border-green-400/60 bg-green-900/20 text-green-300 hover:bg-green-900/40 transition-all font-bold"
                >
                  💻 Begin Code Injection Training
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hacking Phase */}
        {currentPhase === 'hacking' && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-400/30 rounded p-6">
              <h2 className="text-xl text-blue-300 font-bold mb-4">🔓 Code Injection Lab</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-white font-bold mb-3">Target: {targetSystems[targetSystem].name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{targetSystems[targetSystem].description}</p>
                  
                  {/* Tutorial Section */}
                  <div className="bg-green-900/20 border border-green-400/30 rounded p-4 mb-4">
                    <h4 className="text-sm font-bold text-green-400 mb-2">💡 Hacking Tutorial:</h4>
                    <p className="text-xs text-green-300 mb-3">{targetSystems[targetSystem].tutorialText}</p>
                    <p className="text-xs text-gray-400">{targetSystems[targetSystem].explanation}</p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded p-4 mb-4">
                    <h4 className="text-sm font-bold text-blue-400 mb-2">Vulnerable Code:</h4>
                    <code className="text-xs text-gray-300 block bg-black/50 p-2 rounded font-mono">
                      {targetSystems[targetSystem].vulnerableCode}
                    </code>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold text-white mb-2">Injection Payload:</label>
                    <textarea
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Try one of the examples from the right panel..."
                      className="w-full h-24 bg-black/50 border border-gray-600 rounded p-2 text-green-400 font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={attemptCodeInjection}
                      disabled={injectionAttempts <= 0}
                      className="px-4 py-2 rounded border border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🚀 Execute Injection
                    </button>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Attempts:</span>
                      <span className="text-yellow-400 font-bold">{injectionAttempts}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white font-bold mb-3">💡 Example Solutions</h3>
                  
                  <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-4 mb-4">
                    <h4 className="text-sm font-bold text-yellow-400 mb-2">Try These (Copy & Paste!):</h4>
                    <div className="space-y-2">
                      {targetSystems[targetSystem].examples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setCodeInput(example)}
                          className="w-full text-left p-2 bg-black/30 hover:bg-black/50 rounded text-xs font-mono text-green-300 border border-gray-600 hover:border-green-400 transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-yellow-300 mt-2">
                      💡 Click any example above to copy it to your input, then hit Execute!
                    </p>
                  </div>
                  
                  <h3 className="text-lg text-white font-bold mb-3">Exploit Status</h3>
                  
                  <div className="space-y-3 mb-6">
                    {Object.entries(targetSystems).map(([key, system]) => (
                      <div key={key} className={`
                        p-3 rounded border
                        ${exploitsFound.includes(key) 
                          ? 'border-green-400/60 bg-green-900/20' 
                          : key === targetSystem
                            ? 'border-blue-400/60 bg-blue-900/20'
                            : 'border-gray-600/30 bg-gray-800/20'
                        }
                      `}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-bold text-white">{system.name}</div>
                            <div className="text-xs text-gray-400">{system.difficulty}</div>
                          </div>
                          <div className="text-lg">
                            {exploitsFound.includes(key) ? '✅' : key === targetSystem ? '🎯' : '🔒'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-800/50 rounded p-4">
                    <h4 className="text-sm font-bold text-white mb-2">🎯 How to Win:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>1. Read the tutorial (green box) 📖</li>
                      <li>2. Click an example solution above ☝️</li>
                      <li>3. Hit "Execute Injection" button 🚀</li>
                      <li>4. Watch the magic happen! ✨</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manipulation Phase */}
        {currentPhase === 'manipulation' && (
          <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-400/30 rounded p-6">
              <h2 className="text-xl text-purple-300 font-bold mb-4">🌀 Reality Rule Manipulation</h2>
              
              <p className="text-gray-300 text-sm mb-6">
                Now that you've mastered code injection, it's time to bend the fundamental rules of the Matrix. 
                Click on each rule to learn how to manipulate it.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rules.map((rule) => (
                  <button
                    key={rule.id}
                    onClick={() => !rule.completed && hackRule(rule.id)}
                    disabled={rule.completed}
                    className={`
                      p-4 rounded border text-left transition-all
                      ${rule.completed 
                        ? 'border-green-400/60 bg-green-900/20 cursor-not-allowed' 
                        : 'border-purple-400/30 bg-purple-900/10 hover:border-purple-400/60 hover:bg-purple-900/30 cursor-pointer transform hover:scale-105'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-bold text-white">{rule.rule}</div>
                      <div className="text-lg">{rule.completed ? '✅' : '🔄'}</div>
                    </div>
                    <div className="text-xs text-purple-300">{rule.hack}</div>
                    {rule.completed && (
                      <div className="text-xs text-green-400 mt-2">✓ Successfully manipulated</div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-gray-800/50 rounded p-4">
                <h3 className="text-sm font-bold text-white mb-2">Manipulation Score: {score}</h3>
                <div className="text-xs text-gray-400">
                  Complete all rule manipulations to master reality bending.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complete Phase */}
        {currentPhase === 'complete' && (
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-400/30 rounded p-6 text-center">
              <h2 className="text-2xl text-green-300 font-bold mb-4">🎯 Hacker Mastery Achieved</h2>
              
              <div className="text-6xl mb-4">👨‍💻</div>
              
              <div className="mb-6">
                <CharacterDialogue 
                  characterKey="tank"
                  text="Congratulations! You've mastered the art of reality manipulation. The Matrix's rules no longer bind you."
                  size="md"
                />
              </div>
              
              <div className="bg-gray-800/50 rounded p-4 mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Final Achievement</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-green-400 font-bold">{exploitsFound.length}/3</div>
                    <div className="text-gray-400">Systems Hacked</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">4/4</div>
                    <div className="text-gray-400">Rules Manipulated</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">{score}</div>
                    <div className="text-gray-400">Total Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Choose Your Next Path</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/knowledge-nexus')}
                    className="p-4 rounded border border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">🧠 Knowledge Nexus</div>
                    <div className="text-sm text-gray-400">Combine hacking with wisdom</div>
                  </button>
                  
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/echo-verify')}
                    className="p-4 rounded border border-purple-400/60 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">🔄 Code Echo</div>
                    <div className="text-sm text-gray-400">Test pattern manipulation</div>
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