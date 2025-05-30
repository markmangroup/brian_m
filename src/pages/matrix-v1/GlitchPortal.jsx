import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GlitchPortal() {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [isGlitching, setIsGlitching] = useState(false);
  const [detected, setDetected] = useState([]);

  const themes = {
    matrix: {
      name: 'Matrix Reality',
      color: 'green',
      description: 'The digital world you know',
      icon: '💊',
      gradient: 'from-green-900/30 to-black',
      textColor: 'text-green-400',
      borderColor: 'border-green-400'
    },
    witcher: {
      name: 'Witcher Realm',
      color: 'amber',
      description: 'A world of magic and monsters',
      icon: '⚔️',
      gradient: 'from-amber-900/30 to-orange-900/20',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-400'
    },
    cyberpunk: {
      name: 'Night City',
      color: 'purple',
      description: 'Neon-soaked dystopian future',
      icon: '🌆',
      gradient: 'from-purple-900/30 to-pink-900/20',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-400'
    }
  };

  useEffect(() => {
    // Load current theme from localStorage
    const savedTheme = localStorage.getItem('matrixTheme') || 'matrix';
    setCurrentTheme(savedTheme);
    
    // Simulate detecting reality bleeding signals
    const signals = [
      'Unknown energy signature detected...',
      'Quantum fluctuations in sector 7...',
      'Reality breach stabilizing...',
      'Multiverse echo resonance active...',
      'Dimensional barrier weakening...'
    ];
    
    const timer = setInterval(() => {
      setDetected(prev => {
        const newSignal = signals[Math.floor(Math.random() * signals.length)];
        return [...prev.slice(-3), newSignal];
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const switchTheme = (themeKey) => {
    setIsGlitching(true);
    
    // Glitch effect duration
    setTimeout(() => {
      setCurrentTheme(themeKey);
      localStorage.setItem('matrixTheme', themeKey);
      
      // Dispatch theme change event for other components
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { theme: themeKey } 
      }));
      
      setIsGlitching(false);
    }, 800);
  };

  const theme = themes[currentTheme];

  return (
    <div className={`
      min-h-screen text-white p-6 font-mono relative overflow-hidden transition-all duration-1000
      bg-gradient-to-br ${theme.gradient}
      ${isGlitching ? 'animate-matrix-glitch' : ''}
    `}>
      {/* Reality distortion overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-small"></div>
      </div>

      {/* Glitch static overlay */}
      {isGlitching && (
        <div className="absolute inset-0 z-40 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse"></div>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`
            text-4xl font-bold mb-4 animate-pulse
            ${theme.textColor}
            ${isGlitching ? 'animate-matrix-glitch' : ''}
          `}>
            ⚠️ REALITY BREACH DETECTED
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Multiverse signals bleeding through quantum barriers
          </p>
          <div className={`text-sm ${theme.textColor}`}>
            Current Reality: {theme.name}
          </div>
        </div>

        {/* Signal Detection Feed */}
        <div className="bg-black/60 border border-red-500/60 rounded-lg p-4 mb-8 font-mono text-sm">
          <div className="text-red-400 font-bold mb-2">🚨 SIGNAL DETECTION MATRIX</div>
          <div className="h-24 overflow-hidden">
            {detected.map((signal, index) => (
              <div 
                key={index} 
                className="text-gray-300 animate-fade-in opacity-80"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                → {signal}
              </div>
            ))}
          </div>
        </div>

        {/* Theme Selection Portal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(themes).map(([key, themeData]) => (
            <button
              key={key}
              onClick={() => switchTheme(key)}
              disabled={isGlitching}
              className={`
                relative group transition-all duration-500 transform hover:scale-105
                bg-gradient-to-br ${themeData.gradient}
                border-2 ${themeData.borderColor}
                rounded-xl p-6 hover:shadow-2xl hover:shadow-${themeData.color}-500/30
                ${currentTheme === key ? 'ring-4 ring-white/30' : ''}
                ${isGlitching ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Portal ripple effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
              
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:animate-pulse">
                  {themeData.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${themeData.textColor}`}>
                  {themeData.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {themeData.description}
                </p>
                
                {currentTheme === key && (
                  <div className="text-white font-bold text-xs bg-white/20 rounded-full px-3 py-1">
                    ✓ ACTIVE REALITY
                  </div>
                )}
                
                {currentTheme !== key && (
                  <div className={`text-xs ${themeData.textColor} opacity-70`}>
                    Click to breach into this reality
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Reality Status */}
        <div className="bg-gray-900/50 border border-gray-600/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            🌀 Quantum Reality Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-cyan-400 font-bold mb-2">Dimensional Stability</div>
              <div className="text-gray-300">
                {isGlitching ? 'CRITICAL - REALITY SHIFTING' : 'STABLE'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold mb-2">Active Theme Engine</div>
              <div className={theme.textColor}>
                {theme.name} Protocol
              </div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold mb-2">Breach Detection</div>
              <div className="text-gray-300">
                {detected.length} signals logged
              </div>
            </div>
          </div>

          {isGlitching && (
            <div className="mt-4 text-center">
              <div className="text-red-400 animate-pulse font-bold">
                ⚠️ REALITY BREACH IN PROGRESS ⚠️
              </div>
              <div className="text-gray-400 text-xs mt-1">
                Quantum barriers collapsing... Stand by...
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-4 border-t border-gray-600/20 flex justify-between">
          <button
            onClick={() => navigate('/matrix-v1/map-d3')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Return to Story Map
          </button>
          
          <button
            onClick={() => navigate('/matrix-v1/portal/factions')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            Faction Portal →
          </button>
        </div>
      </div>
    </div>
  );
} 