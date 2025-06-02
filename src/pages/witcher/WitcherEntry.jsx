import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

export default function WitcherEntry() {
  const navigate = useNavigate();
  const { setWorld } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [medallionVibrating, setMedallionVibrating] = useState(false);

  useEffect(() => {
    // Set Witcher world/theme using unified context
    setWorld('witcher');
    
    // Initial atmospheric sequence
    const timer = setTimeout(() => {
      setCurrentPhase(1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setWorld]);

  useEffect(() => {
    // Simulate medallion vibration for magical presence
    const vibrationTimer = setInterval(() => {
      setMedallionVibrating(true);
      setTimeout(() => setMedallionVibrating(false), 800);
    }, 5000);

    return () => clearInterval(vibrationTimer);
  }, []);

  const handleContinue = () => {
    navigate('/witcher/mutation-choice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-900/20 to-gray-800 text-amber-100 relative overflow-hidden">
      {/* Medieval Atmospheric Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-pulse"></div>
      </div>

      {/* Fog Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-700/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-8 pt-16">
        {/* Witcher Medallion */}
        <div className="text-center mb-8">
          <div className={`
            inline-block text-6xl mb-4 transition-all duration-300
            ${medallionVibrating ? 'animate-pulse scale-110 text-amber-300' : 'text-amber-500'}
          `}>
            ⚔️
          </div>
          <div className="text-amber-400 text-sm font-medieval">
            {medallionVibrating ? 'Medallion vibrates... Magic is near' : 'Wolf School Medallion'}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-300 mb-4 font-serif">
            The Path Begins
          </h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto leading-relaxed">
            A strange realm brews in frost and magic. Ancient keeps rise from misty valleys where monsters prowl and destiny calls.
          </p>
        </div>

        {/* Atmospheric Scene Description */}
        {currentPhase >= 1 && (
          <div className="bg-gray-800/50 border-2 border-amber-600/30 rounded-lg p-6 mb-8 backdrop-blur-sm">
            <div className="space-y-4 text-amber-100">
              <p className="text-lg italic">
                "The wind carries whispers of ancient power through the pine-scented air. Your medallion trembles against your chest - a sure sign that this realm holds secrets deeper than mortal understanding."
              </p>
              
              <div className="border-l-4 border-amber-500 pl-4 bg-amber-900/20 p-3 rounded">
                <p className="text-amber-300 font-semibold">Environmental Clues:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>🐺 Wolf tracks in the snow - unusually large</li>
                  <li>🔥 Distant campfire smoke rising from a hidden valley</li>
                  <li>📜 Carved runes on ancient standing stones</li>
                  <li>🌙 The moon seems brighter here, touched by old magic</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Character Dialogue */}
        <div className="bg-gray-700/40 border border-amber-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <h3 className="text-amber-300 font-bold">Vesemir</h3>
              <p className="text-amber-500 text-sm">Master Witcher</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-amber-100 italic">
              "The path of a witcher is fraught with danger and solitude, young one. These lands hold secrets older than kings and kingdoms."
            </p>
            <p className="text-amber-200">
              "Choose your trials carefully - not all who walk this path survive the transformation that awaits."
            </p>
          </div>
        </div>

        {/* Status Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-amber-900/30 border border-amber-600/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">Apprentice</div>
            <div className="text-sm text-amber-300">Current Status</div>
          </div>
          
          <div className="bg-gray-800/40 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-300">???</div>
            <div className="text-sm text-gray-400">Mutations</div>
          </div>
          
          <div className="bg-gray-800/40 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-300">0/5</div>
            <div className="text-sm text-gray-400">Signs Learned</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => navigate('/matrix-v1/glitch-portal')}
            className="text-amber-500 hover:text-amber-300 transition-colors text-sm flex items-center gap-2"
          >
            ← Return to Portal
          </button>
          
          <button
            onClick={handleContinue}
            className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Begin the Trials →
          </button>
        </div>

        {/* Lore Footer */}
        <div className="mt-12 pt-6 border-t border-amber-600/30 text-center">
          <p className="text-amber-400 text-sm italic">
            "Evil is evil. Lesser, greater, middling... makes no difference. The degree is arbitrary. The definition's blurred."
          </p>
          <p className="text-amber-500 text-xs mt-2">- Geralt of Rivia</p>
        </div>
      </div>
    </div>
  );
} 