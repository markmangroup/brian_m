import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

export default function SignTraining() {
  const navigate = useNavigate();
  const { setWorld } = useTheme();
  const [currentSign, setCurrentSign] = useState(null);
  const [signProgress, setSignProgress] = useState({
    igni: 0,
    quen: 0,
    aard: 0,
    yrden: 0,
    axii: 0
  });
  const [castingSign, setCastingSign] = useState(null);
  const [magicEnergy, setMagicEnergy] = useState(100);

  useEffect(() => {
    // Set Witcher world
    setWorld('witcher');
  }, [setWorld]);

  useEffect(() => {
    // Magic energy regeneration
    const energyTimer = setInterval(() => {
      setMagicEnergy(prev => Math.min(prev + 2, 100));
    }, 1000);

    return () => clearInterval(energyTimer);
  }, []);

  const signs = [
    {
      id: 'igni',
      name: 'Igni',
      icon: '🔥',
      description: 'A burst of fire that burns enemies',
      element: 'Fire',
      difficulty: 'Easy',
      energyCost: 20,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500',
      effect: 'Creates a cone of fire that damages enemies'
    },
    {
      id: 'quen',
      name: 'Quen',
      icon: '🛡️',
      description: 'A protective shield that absorbs damage',
      element: 'Light',
      difficulty: 'Easy',
      energyCost: 15,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500',
      effect: 'Creates a protective barrier around the caster'
    },
    {
      id: 'aard',
      name: 'Aard',
      icon: '💨',
      description: 'A telekinetic blast that knocks down foes',
      element: 'Air',
      difficulty: 'Medium',
      energyCost: 25,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500',
      effect: 'Releases a powerful telekinetic force'
    },
    {
      id: 'yrden',
      name: 'Yrden',
      icon: '⭕',
      description: 'A magical trap that slows enemies',
      element: 'Earth',
      difficulty: 'Hard',
      energyCost: 30,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500',
      effect: 'Creates magical traps on the ground'
    },
    {
      id: 'axii',
      name: 'Axii',
      icon: '🧠',
      description: 'A charm that confuses and controls minds',
      element: 'Mind',
      difficulty: 'Expert',
      energyCost: 35,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500',
      effect: 'Manipulates the thoughts of others'
    }
  ];

  const practiceSign = (signId) => {
    const sign = signs.find(s => s.id === signId);
    if (magicEnergy < sign.energyCost) {
      return; // Not enough energy
    }

    setCastingSign(signId);
    setMagicEnergy(prev => prev - sign.energyCost);
    
    // Simulate casting time
    setTimeout(() => {
      setSignProgress(prev => ({
        ...prev,
        [signId]: Math.min(prev[signId] + 10, 100)
      }));
      setCastingSign(null);
    }, 1500);
  };

  const totalProgress = Object.values(signProgress).reduce((sum, progress) => sum + progress, 0);
  const averageProgress = totalProgress / signs.length;
  const masteredSigns = Object.values(signProgress).filter(progress => progress >= 100).length;

  const handleComplete = () => {
    // Navigate to next page or back to portal
    navigate('/matrix-v1/glitch-portal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-800 text-amber-100 relative overflow-hidden">
      {/* Magical Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Magical Energy Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 transition-opacity duration-1000"
        style={{ opacity: magicEnergy / 200 }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-8 pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-pulse">✨</div>
          <h1 className="text-5xl font-bold text-purple-300 mb-4 font-serif">
            Master the Signs
          </h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed">
            You begin to wield the basic forces of magic. Learn to channel your will through ancient gestures 
            and harness the power that flows through all things.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{averageProgress.toFixed(1)}%</div>
            <div className="text-sm text-purple-300">Overall Progress</div>
          </div>
          
          <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{masteredSigns}/5</div>
            <div className="text-sm text-blue-300">Signs Mastered</div>
          </div>
          
          <div className="bg-amber-900/30 border border-amber-500 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{magicEnergy}%</div>
            <div className="text-sm text-amber-300">Magic Energy</div>
          </div>
          
          <div className="bg-gray-800/40 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">Advanced</div>
            <div className="text-sm text-gray-400">Training Level</div>
          </div>
        </div>

        {/* Magic Energy Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-300 text-sm font-semibold">Magic Energy</span>
            <span className="text-blue-400 text-sm">{magicEnergy}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${magicEnergy}%` }}
            />
          </div>
        </div>

        {/* Instructor Dialogue */}
        <div className="bg-gray-700/40 border border-purple-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <div>
              <h3 className="text-purple-300 font-bold">Triss Merigold</h3>
              <p className="text-purple-500 text-sm">Sorceress & Instructor</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-purple-100 italic">
              "Magic flows through focused will and precise gestures. Each Sign represents a different aspect of the elements and forces that bind our world."
            </p>
            <p className="text-purple-200">
              "Practice until the Signs become as natural as breathing. A witcher's survival often depends on split-second magical reactions."
            </p>
          </div>
        </div>

        {/* Sign Training Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-amber-300 text-center mb-6">
            Practice Signs
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {signs.map((sign) => (
              <div
                key={sign.id}
                className={`
                  ${sign.bgColor} ${sign.borderColor} border-2 rounded-xl p-6 
                  transition-all duration-300
                  ${castingSign === sign.id ? 'animate-pulse ring-4 ring-white/30' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl ${castingSign === sign.id ? 'animate-spin' : ''}`}>
                      {sign.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${sign.color}`}>
                        {sign.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {sign.element} • {sign.difficulty}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => practiceSign(sign.id)}
                    disabled={magicEnergy < sign.energyCost || castingSign !== null}
                    className={`
                      px-4 py-2 rounded-lg font-semibold transition-all duration-300
                      ${magicEnergy >= sign.energyCost && castingSign === null
                        ? `${sign.color.replace('text-', 'bg-').replace('-400', '-600')} hover:${sign.color.replace('text-', 'bg-').replace('-400', '-500')} text-white`
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {castingSign === sign.id ? 'Casting...' : `Cast (${sign.energyCost})`}
                  </button>
                </div>
                
                <p className="text-gray-200 text-sm mb-4">
                  {sign.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className={sign.color}>{signProgress[sign.id]}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${sign.color.replace('text-', 'bg-')}`}
                      style={{ width: `${signProgress[sign.id]}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-gray-400 italic">
                    Effect: {sign.effect}
                  </p>
                  
                  {signProgress[sign.id] >= 100 && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <span>✓</span>
                      <span className="font-semibold">Mastered!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Status */}
        {masteredSigns >= 3 && (
          <div className="mt-8 text-center">
            <div className="bg-green-900/40 border border-green-500 rounded-lg p-6">
              <h3 className="text-green-300 text-xl font-bold mb-2">
                🎉 Training Complete!
              </h3>
              <p className="text-green-200 mb-4">
                You have mastered enough Signs to continue your journey as a Witcher.
              </p>
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Complete Training
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-amber-600/30">
          <button
            onClick={() => navigate('/witcher/mutation-choice')}
            className="text-amber-500 hover:text-amber-300 transition-colors text-sm"
          >
            ← Return to Trials
          </button>
          
          <div className="text-center">
            <p className="text-amber-400 text-sm">
              Master at least 3 Signs to complete training
            </p>
          </div>
        </div>

        {/* Magical Quote */}
        <div className="mt-8 text-center">
          <p className="text-purple-400 text-sm italic">
            "Magic is very simple. All you have to do is want something and then let yourself have it."
          </p>
          <p className="text-purple-500 text-xs mt-2">- Yennefer of Vengerberg</p>
        </div>
      </div>
    </div>
  );
} 