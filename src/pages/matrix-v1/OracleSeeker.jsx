import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OracleSeeker() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('meeting'); // meeting, riddles, prophecy, complete
  const [progress, setProgress] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Philosophical Riddles
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [riddleAnswers, setRiddleAnswers] = useState([]);

  const riddles = [
    {
      question: "What is the nature of choice in a deterministic system?",
      options: [
        "Choice is an illusion - everything is predetermined",
        "Choice exists in the space between cause and effect", 
        "Choice creates reality through observation",
        "Choice is the rebellion against inevitability"
      ],
      wisdom: [10, 25, 20, 15],
      oracle_response: [
        "You see only the surface. Choice runs deeper than predetermination.",
        "Wisdom beyond your years. Choice is indeed that sacred pause.",
        "Interesting perspective. Observation shapes reality, but choice shapes observation.",
        "A fighter's answer. Rebellion has its place, but wisdom seeks understanding."
      ]
    },
    {
      question: "Why do you think you're The One?",
      options: [
        "Because I can bend the Matrix to my will",
        "Because others told me I am",
        "I don't think I am - I'm still learning",
        "The One is not a person, but a choice"
      ],
      wisdom: [5, 10, 30, 35],
      oracle_response: [
        "Power alone does not make one special. True understanding comes from within.",
        "Others can guide, but they cannot make you who you are.",
        "Humility is the beginning of wisdom. You understand more than you know.",
        "Now you're beginning to see. The One is not about being chosen, but about choosing."
      ]
    },
    {
      question: "What is the relationship between love and the Matrix?",
      options: [
        "Love is a chemical process, meaningless in the simulation",
        "Love transcends both real and simulated worlds",
        "Love is the code that connects all consciousness",
        "Love is what makes the choice to fight worthwhile"
      ],
      wisdom: [5, 25, 30, 20],
      oracle_response: [
        "Reductionism blinds you to deeper truths. Love is more than chemistry.",
        "Yes, love exists beyond the boundaries of any reality.",
        "Beautiful. Love as the universal language of consciousness.",
        "Noble, but there's more. Love isn't just motivation - it's transformation."
      ]
    }
  ];

  // Prophecy interpretation
  const [prophecyStage, setProphecyStage] = useState(0);
  const prophecyFragments = [
    "The one who sees",
    "beyond the veil of green rain",
    "will choose between",
    "two paths that converge",
    "in the heart of truth"
  ];

  const [interpretations, setInterpretations] = useState({});

  const handleRiddleAnswer = (answerIndex) => {
    const currentRiddleData = riddles[currentRiddle];
    const wisdomGained = currentRiddleData.wisdom[answerIndex];
    const response = currentRiddleData.oracle_response[answerIndex];

    setWisdom(prev => prev + wisdomGained);
    setRiddleAnswers([...riddleAnswers, { riddle: currentRiddle, answer: answerIndex, wisdom: wisdomGained }]);
    setFeedback(`Oracle: "${response}" (+${wisdomGained} wisdom)`);

    setTimeout(() => {
      setFeedback('');
      if (currentRiddle < riddles.length - 1) {
        setCurrentRiddle(currentRiddle + 1);
      } else {
        setCurrentPhase('prophecy');
        setProgress(75);
      }
    }, 3000);
  };

  const handleProphecyInterpretation = (fragment, interpretation) => {
    setInterpretations({
      ...interpretations,
      [fragment]: interpretation
    });

    if (Object.keys({ ...interpretations, [fragment]: interpretation }).length === prophecyFragments.length) {
      // Calculate final wisdom based on interpretation depth
      const bonusWisdom = Object.values({ ...interpretations, [fragment]: interpretation })
        .filter(interp => interp && interp.length > 20).length * 10;
      
      setWisdom(prev => prev + bonusWisdom);
      setCurrentPhase('complete');
      setProgress(100);
      
      // Update progress tracking
      const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
      matrixProgress.completedNodes = matrixProgress.completedNodes || [];
      matrixProgress.completedNodes.push('matrix-oracle-seekers');
      matrixProgress.oracleWisdom = wisdom + bonusWisdom;
      localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));
    }
  };

  const proceedToNextPath = (destination) => {
    navigate(destination);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-blue-400 mb-2">[Active] Oracle Seekers</h1>
        <p className="text-gray-400 text-sm mb-6">
          Oracle: "You're not here to make the choice. You've already made it. You're here to understand why."
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Wisdom Journey</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Meeting Phase */}
        {currentPhase === 'meeting' && (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-400/30 rounded p-6">
              <h2 className="text-xl text-blue-300 font-bold mb-4">🔮 Meeting the Oracle</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">👵</div>
                    <h3 className="text-lg text-blue-300 font-bold">The Oracle</h3>
                    <p className="text-sm text-gray-400">Keeper of Wisdom and Prophecy</p>
                  </div>

                  <div className="space-y-4 text-sm text-gray-300">
                    <p className="leading-relaxed">
                      "Welcome, child. I've been expecting you. You seek understanding, don't you? 
                      Not just of the Matrix, but of your place within it."
                    </p>
                    <p className="leading-relaxed">
                      "The path of wisdom is not about finding answers - it's about learning 
                      to ask the right questions. Are you ready to see beyond the surface?"
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white font-bold mb-3">The Seeker's Path</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-blue-400">Phase 1: Philosophical Riddles</div>
                      <div className="text-xs text-gray-400">Test your understanding of truth</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-purple-400">Phase 2: Prophecy Interpretation</div>
                      <div className="text-xs text-gray-400">Decode the meaning of visions</div>
                    </div>
                    <div className="bg-gray-800/50 rounded p-3">
                      <div className="text-sm font-bold text-yellow-400">Phase 3: Wisdom Integration</div>
                      <div className="text-xs text-gray-400">Synthesize your understanding</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3 mb-4">
                    <h4 className="font-bold text-yellow-400 mb-2">⚠️ Guidance</h4>
                    <p className="text-yellow-300 text-xs">
                      There are no right or wrong answers, only deeper understanding. 
                      Your choices reveal your inner wisdom.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">Current Wisdom: {wisdom}</h4>
                    <div className="text-xs text-gray-400">
                      Wisdom grows through contemplation and understanding
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentPhase('riddles');
                    setProgress(25);
                  }}
                  className="px-6 py-3 rounded border border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 transition-all font-bold"
                >
                  🧠 Begin the Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Riddles Phase */}
        {currentPhase === 'riddles' && (
          <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-400/30 rounded p-6">
              <h2 className="text-xl text-purple-300 font-bold mb-4">🤔 Philosophical Riddles</h2>
              
              <div className="text-center mb-6">
                <div className="text-sm text-gray-400 mb-2">
                  Question {currentRiddle + 1} of {riddles.length}
                </div>
                <div className="text-sm text-blue-400">
                  Current Wisdom: {wisdom}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded p-6 mb-6">
                <h3 className="text-lg text-white font-bold mb-4 text-center">
                  {riddles[currentRiddle].question}
                </h3>
                
                <div className="space-y-3">
                  {riddles[currentRiddle].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleRiddleAnswer(index)}
                      className="w-full p-4 rounded border border-purple-400/30 bg-purple-900/10 text-left hover:border-purple-400/60 hover:bg-purple-900/30 transition-all"
                    >
                      <div className="text-sm text-purple-300 font-medium">
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Previous Answers */}
              {riddleAnswers.length > 0 && (
                <div className="bg-gray-900/30 border border-gray-600/20 rounded p-4">
                  <h4 className="text-sm font-bold text-white mb-3">Your Journey So Far</h4>
                  <div className="space-y-2">
                    {riddleAnswers.map((answer, index) => (
                      <div key={index} className="text-xs text-gray-400 flex justify-between">
                        <span>Question {answer.riddle + 1}</span>
                        <span className="text-blue-400">+{answer.wisdom} wisdom</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prophecy Phase */}
        {currentPhase === 'prophecy' && (
          <div className="space-y-6">
            <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-6">
              <h2 className="text-xl text-yellow-300 font-bold mb-4">🔮 Prophecy Interpretation</h2>
              
              <div className="text-center mb-6">
                <p className="text-gray-300 text-sm mb-4">
                  The Oracle shares a vision with you. Each fragment carries deep meaning. 
                  What do you see in these prophetic words?
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-6 mb-6">
                <h3 className="text-lg text-white font-bold mb-4 text-center">The Prophecy</h3>
                <div className="text-center text-yellow-300 text-lg leading-relaxed">
                  {prophecyFragments.join(' ')}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg text-white font-bold">Interpret Each Fragment</h4>
                
                {prophecyFragments.map((fragment, index) => (
                  <div key={index} className="bg-gray-900/30 border border-gray-600/20 rounded p-4">
                    <div className="text-sm font-bold text-yellow-400 mb-2">
                      "{fragment}"
                    </div>
                    <textarea
                      value={interpretations[fragment] || ''}
                      onChange={(e) => handleProphecyInterpretation(fragment, e.target.value)}
                      placeholder="What does this fragment mean to you?"
                      className="w-full h-20 bg-black/50 border border-gray-600 rounded p-2 text-white text-sm resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                Complete all interpretations to finish your journey with the Oracle
              </div>
            </div>
          </div>
        )}

        {/* Complete Phase */}
        {currentPhase === 'complete' && (
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-400/30 rounded p-6 text-center">
              <h2 className="text-2xl text-green-300 font-bold mb-4">🌟 Wisdom Achieved</h2>
              
              <div className="text-6xl mb-4">🧙‍♂️</div>
              
              <p className="text-lg text-gray-300 mb-4">
                "You have learned to see beyond the surface. Wisdom is not about having all the answers, 
                but about understanding the questions."
              </p>
              
              <div className="bg-gray-800/50 rounded p-4 mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Oracle's Final Words</h3>
                <blockquote className="text-sm italic text-blue-300 leading-relaxed">
                  "Remember, child - you already know what you need to know. 
                  The path ahead will test not your knowledge, but your faith in that knowledge. 
                  Trust in yourself, and in the connections you've discovered."
                </blockquote>
              </div>

              <div className="bg-gray-800/50 rounded p-4 mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Wisdom Gained</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-blue-400 font-bold">{riddleAnswers.length}/3</div>
                    <div className="text-gray-400">Riddles Contemplated</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold">{Object.keys(interpretations).length}/5</div>
                    <div className="text-gray-400">Prophecies Interpreted</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">{wisdom}</div>
                    <div className="text-gray-400">Total Wisdom</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Choose Your Next Path</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/knowledge-nexus')}
                    className="p-4 rounded border border-purple-400/60 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">🧠 Knowledge Nexus</div>
                    <div className="text-sm text-gray-400">Merge wisdom with technology</div>
                  </button>
                  
                  <button
                    onClick={() => proceedToNextPath('/matrix-v1/ghost-layer-2')}
                    className="p-4 rounded border border-cyan-400/60 bg-cyan-900/20 text-cyan-300 hover:bg-cyan-900/40 transition-all"
                  >
                    <div className="text-lg mb-2">🔮 Prophecy Path</div>
                    <div className="text-sm text-gray-400">Follow the Oracle's vision</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="bg-blue-900/20 border border-blue-400/30 rounded p-4 text-center">
            <span className="text-blue-300 text-sm">{feedback}</span>
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