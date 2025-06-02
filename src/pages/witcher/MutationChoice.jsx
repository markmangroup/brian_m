import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

export default function MutationChoice() {
  const navigate = useNavigate();
  const { setWorld } = useTheme();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showChoices, setShowChoices] = useState(false);
  const [toxinLevel, setToxinLevel] = useState(0);

  useEffect(() => {
    // Set Witcher world
    setWorld('witcher');
    
    // Dramatic intro sequence
    const timer = setTimeout(() => {
      setShowChoices(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setWorld]);

  useEffect(() => {
    // Simulate toxin buildup effect
    const toxinTimer = setInterval(() => {
      setToxinLevel(prev => {
        const newLevel = prev + Math.random() * 10;
        return newLevel > 100 ? 0 : newLevel;
      });
    }, 1500);

    return () => clearInterval(toxinTimer);
  }, []);

  const choices = [
    {
      id: 'trial',
      title: 'Undergo Trial of Grasses',
      description: 'Drink the mutagens and undergo the painful transformation. High risk, high reward.',
      consequences: 'Become a full Witcher with enhanced abilities, but risk death',
      risk: 'EXTREME',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500'
    },
    {
      id: 'alternative',
      title: 'Seek Alternative Path',
      description: 'Research other ways to gain witcher-like abilities without the mutations.',
      consequences: 'Slower progression but safer approach to power',
      risk: 'MODERATE',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500'
    },
    {
      id: 'scholar',
      title: 'Study Ancient Texts',
      description: 'Become a scholar of monster lore and alchemy instead of a warrior.',
      consequences: 'Gain knowledge-based abilities and magical expertise',
      risk: 'LOW',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500'
    },
    {
      id: 'bard',
      title: 'Train as Bard',
      description: 'Learn the arts of music, storytelling, and subtle magic.',
      consequences: 'Develop social abilities and different form of influence',
      risk: 'MINIMAL',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500'
    }
  ];

  const handleChoice = (choiceId) => {
    setSelectedChoice(choiceId);
    
    // Route based on choice
    setTimeout(() => {
      if (choiceId === 'trial') {
        navigate('/witcher/sign-training');
      } else {
        // For now, all paths lead to sign training
        // In future, could branch to different pages
        navigate('/witcher/sign-training');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-900/20 to-gray-800 text-amber-100 relative overflow-hidden">
      {/* Ominous Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-amber-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Toxin Effect Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 transition-opacity duration-1000"
        style={{ opacity: toxinLevel / 300 }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto p-8 pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-pulse">⚗️</div>
          <h1 className="text-5xl font-bold text-red-300 mb-4 font-serif">
            Trial of Grasses
          </h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed">
            The moment of truth arrives. The mutagens await, promising transformation or death. 
            Choose your path carefully - this decision will define your destiny.
          </p>
        </div>

        {/* Dramatic Scene Setting */}
        <div className="bg-gray-800/50 border-2 border-red-600/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <div className="space-y-4 text-amber-100">
            <p className="text-lg italic text-red-200">
              "The laboratory fills with toxic vapors. Ancient mutagens bubble in glass vials, their contents 
              glowing with an otherworldly light. The smell of sulfur and herbs burns your nostrils."
            </p>
            
            <div className="border-l-4 border-red-500 pl-4 bg-red-900/20 p-3 rounded">
              <p className="text-red-300 font-semibold">⚠️ Warning Signs:</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>💀 Skulls of failed candidates line the walls</li>
                <li>🧪 Mutagen toxicity: {toxinLevel.toFixed(1)}%</li>
                <li>⚡ Electric energy crackles in the air</li>
                <li>🩸 Fresh bloodstains on the examination table</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Master Witchers Dialogue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Vesemir */}
          <div className="bg-gray-700/40 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <h3 className="text-amber-300 font-bold text-sm">Vesemir</h3>
                <p className="text-amber-500 text-xs">Master Witcher</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm italic">
              "The Trial changes you forever - if it doesn't kill you first. I've seen too many boys never wake up."
            </p>
          </div>

          {/* Lambert */}
          <div className="bg-gray-700/40 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div>
                <h3 className="text-red-300 font-bold text-sm">Lambert</h3>
                <p className="text-red-500 text-xs">Witcher</p>
              </div>
            </div>
            <p className="text-red-100 text-sm italic">
              "Fucking trial nearly killed me. But look at me now - faster, stronger than any human."
            </p>
          </div>

          {/* Eskel */}
          <div className="bg-gray-700/40 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h3 className="text-blue-300 font-bold text-sm">Eskel</h3>
                <p className="text-blue-500 text-xs">Witcher</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm italic">
              "There are other paths to power. Not all strength comes from mutations."
            </p>
          </div>
        </div>

        {/* Choice Selection */}
        {showChoices && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-300 text-center mb-6">
              Choose Your Path
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.id)}
                  disabled={selectedChoice !== null}
                  className={`
                    ${choice.bgColor} ${choice.borderColor} border-2 rounded-xl p-6 
                    text-left transition-all duration-300 transform hover:scale-105 
                    hover:shadow-xl ${choice.color}
                    ${selectedChoice === choice.id ? 'ring-4 ring-white/50 scale-105' : ''}
                    ${selectedChoice && selectedChoice !== choice.id ? 'opacity-50' : ''}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {choice.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-3">
                      {choice.description}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3">
                    <p className="text-xs text-gray-300 mb-2">
                      <strong>Consequences:</strong> {choice.consequences}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${choice.color}`}>
                        Risk: {choice.risk}
                      </span>
                      {selectedChoice === choice.id && (
                        <span className="text-white text-xs animate-pulse">
                          ✓ Selected
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selection Confirmation */}
        {selectedChoice && (
          <div className="mt-8 text-center">
            <div className="bg-amber-900/40 border border-amber-500 rounded-lg p-6 animate-pulse">
              <p className="text-amber-200 text-lg">
                Path chosen. Destiny unfolds...
              </p>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-amber-600/30">
          <button
            onClick={() => navigate('/witcher/entry')}
            className="text-amber-500 hover:text-amber-300 transition-colors text-sm"
            disabled={selectedChoice !== null}
          >
            ← Return to Path
          </button>
          
          {!showChoices && (
            <div className="text-amber-400 text-sm animate-pulse">
              Loading trial chamber...
            </div>
          )}
        </div>

        {/* Ominous Quote */}
        <div className="mt-8 text-center">
          <p className="text-red-400 text-sm italic">
            "Many boys enter these chambers. Few emerge as witchers. The rest... well, we honor their sacrifice."
          </p>
          <p className="text-red-500 text-xs mt-2">- Vesemir, Master of Kaer Morhen</p>
        </div>
      </div>
    </div>
  );
} 