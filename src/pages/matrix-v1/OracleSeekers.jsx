import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDialogue, CharacterAvatar } from '../../components/CharacterSystem';

export default function OracleSeekers() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [insight, setInsight] = useState('');
  const [prophecyRevealed, setProphecyRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const wisdomQuotes = [
    "Know thyself...",
    "There is no spoon...",
    "The path of the One is carved with choice...",
    "What is real cannot die...",
    "Love persists beyond the code...",
    "Choice is an illusion created by those with power for those without...",
    "Everything has a beginning and an end. Even the Matrix..."
  ];

  const philosophicalQuestions = [
    {
      question: "What makes us human in a world of simulation?",
      options: ["Our capacity for love", "Our ability to choose", "Our imperfections", "Our consciousness"],
      wisdom: [3, 2, 2, 3]
    },
    {
      question: "Is it better to live in comfortable lies or painful truth?",
      options: ["Comfortable lies maintain peace", "Truth, no matter the cost", "Both have their place", "The choice itself matters most"],
      wisdom: [1, 3, 2, 3]
    },
    {
      question: "What is the nature of choice in a predetermined system?",
      options: ["All choices are illusion", "Free will transcends programming", "Choice creates reality", "The question is meaningless"],
      wisdom: [2, 3, 3, 1]
    }
  ];

  useEffect(() => {
    // Auto-complete phases for testing
    const timer = setTimeout(() => {
      if (currentPhase === 0) {
        setCurrentPhase(1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  const completePhase = () => {
    if (currentPhase < 2) {
      setCurrentPhase(currentPhase + 1);
    } else {
      setCompleted(true);
      // Save progress
      const progress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
      progress.oracleSeekers = {
        completed: true,
        wisdom: wisdom,
        timestamp: Date.now()
      };
      localStorage.setItem('matrixProgress', JSON.stringify(progress));
    }
  };

  const answerQuestion = (questionIndex, optionIndex) => {
    const question = philosophicalQuestions[questionIndex];
    const wisdomGained = question.wisdom[optionIndex];
    setWisdom(prev => prev + wisdomGained);
    
    if (wisdomGained >= 3) {
      setInsight("Your understanding deepens...");
    } else if (wisdomGained >= 2) {
      setInsight("You grasp a fragment of truth...");
    } else {
      setInsight("All paths teach wisdom...");
    }
  };

  const revealProphecy = () => {
    setProphecyRevealed(true);
    setWisdom(prev => prev + 5);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-950 text-white p-6 font-mono relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <CharacterDialogue
              characterKey="oracle"
              message="You have walked the path of wisdom and emerged transformed. The seeker becomes the sought, the student becomes the teacher. Go now, and share what you have learned with others who are ready to see."
              variant="full"
            />
          </div>

          <div className="bg-blue-900/30 border border-blue-400/60 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">🔮 Oracle Training Complete</h2>
            <div className="text-xl text-white mb-4">
              Wisdom Achieved: {wisdom} points
            </div>
            <div className="text-blue-300">
              You have completed the Oracle Seekers path. The wisdom you have gained will guide you on future journeys through the Matrix and beyond.
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/matrix-v1/portal/factions')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Return to Faction Portal
            </button>
            <button
              onClick={() => navigate('/matrix-v1/map-d3')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Story Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-purple-950 text-white p-6 font-mono relative overflow-hidden">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-grid-small opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4 animate-pulse">
            🔮 ORACLE SEEKERS
          </h1>
          <p className="text-gray-300 text-lg">
            Seek wisdom beyond the veil of reality
          </p>
          <div className="text-sm text-blue-300 mt-2">
            Wisdom Gathered: {wisdom} points
          </div>
        </div>

        {/* Character Introduction */}
        {currentPhase === 0 && (
          <div className="mb-8">
            <CharacterDialogue
              characterKey="oracle"
              message="Welcome, seeker. I have been expecting you. The path of wisdom is not for those who seek easy answers, but for those who are willing to question everything they believe they know. Are you ready to see how deep the rabbit hole goes?"
              variant="full"
            />
            
            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentPhase(1)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                I am ready to learn
              </button>
            </div>
          </div>
        )}

        {/* Philosophical Insights Phase */}
        {currentPhase === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                💭 Philosophical Insight Training
              </h2>
              <p className="text-gray-300">
                Consider these questions deeply. There are no wrong answers, only different paths to understanding.
              </p>
            </div>

            {philosophicalQuestions.map((q, index) => (
              <div key={index} className="bg-blue-900/20 border border-blue-400/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{q.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => answerQuestion(index, optionIndex)}
                      className="p-3 bg-gray-800 hover:bg-blue-800/50 border border-blue-400/30 rounded-lg text-left transition-colors text-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {insight && (
              <div className="text-center">
                <div className="text-blue-300 italic mb-4">"{insight}"</div>
                <button
                  onClick={() => setCurrentPhase(2)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Continue to Prophecy Reading
                </button>
              </div>
            )}
          </div>
        )}

        {/* Prophecy Reading Phase */}
        {currentPhase === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                🔭 Future Sight Training
              </h2>
              <CharacterAvatar characterKey="seraph" size="lg" />
              <p className="text-gray-300 mt-4">
                Seraph will guide you through the art of seeing what is to come.
              </p>
            </div>

            <div className="bg-purple-900/20 border border-purple-400/30 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-purple-400 mb-6">The Vision Pool</h3>
              
              {!prophecyRevealed ? (
                <div>
                  <p className="text-gray-300 mb-6">
                    Gaze into the swirling mists of possibility. What do you see?
                  </p>
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full animate-spin-slow border-4 border-purple-400/30 mb-6 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-pulse"></div>
                  </div>
                  <button
                    onClick={revealProphecy}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Focus and See
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-purple-300 text-lg italic mb-6 animate-fade-in">
                    "The path diverges ahead. One leads to salvation, another to destruction. 
                    The choice will not be yours alone, but the wisdom you carry will guide others 
                    when the moment comes. Trust in what you have learned."
                  </div>
                  <div className="text-yellow-400 mb-6">
                    +5 Wisdom Gained from Prophecy Vision
                  </div>
                  <button
                    onClick={completePhase}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Complete Oracle Training
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wisdom Quotes Sidebar */}
        <div className="fixed top-4 right-4 bg-blue-900/50 border border-blue-400/30 rounded-lg p-4 w-64 backdrop-blur-sm">
          <h4 className="text-blue-400 font-bold mb-2">💫 Wisdom of the Oracle</h4>
          <div className="text-xs text-gray-300 space-y-2">
            {wisdomQuotes.slice(0, Math.min(wisdom, wisdomQuotes.length)).map((quote, index) => (
              <div key={index} className="italic border-l-2 border-blue-400/30 pl-2">
                "{quote}"
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-4 border-t border-gray-600/20 flex justify-between">
          <button
            onClick={() => navigate('/matrix-v1/portal/factions')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Faction Portal
          </button>
          
          <button
            onClick={() => navigate('/matrix-v1')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            Matrix Entry
          </button>
        </div>
      </div>
    </div>
  );
} 