import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterDialogue } from '../../components/CharacterSystem';
import { useTheme } from '../../theme/ThemeContext';

export default function NightCityEntry() {
  const navigate = useNavigate();
  const { setWorld } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [glitchActive, setGlitchActive] = useState(true);

  useEffect(() => {
    // Initial glitch effect on entry
    const timer = setTimeout(() => {
      setGlitchActive(false);
      setCurrentPhase(1);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set Night City world/theme using unified context
    setWorld('nightcity');
  }, [setWorld]);

  const proceedToBouncer = () => {
    // Save progress
    const progress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    progress.completedNodes = [...(progress.completedNodes || []), 'nc-entry'];
    localStorage.setItem('matrixProgress', JSON.stringify(progress));
    
    navigate('/matrix-v1/night-city/bouncer');
  };

  return (
    <div className={`
      min-h-screen text-white p-6 font-mono relative overflow-hidden
      bg-gradient-to-br from-purple-950 via-black to-pink-950
      ${glitchActive ? 'animate-matrix-glitch' : ''}
    `}>
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-grid-cyberpunk opacity-30"></div>
      
      {/* Glitch static overlay */}
      {glitchActive && (
        <div className="absolute inset-0 z-40 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/30 animate-reality-shift"></div>
      )}
      
      {/* Neon lights effects */}
      <div className="absolute top-[72px] left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Phase 0: Glitch transition */}
        {currentPhase === 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-6xl mb-8 text-pink-400 animate-matrix-glitch">
                ▓▓▓ REALITY BREACH ▓▓▓
              </div>
              <div className="text-purple-300 animate-pulse">
                Quantum barriers collapsing...
              </div>
              <div className="text-cyan-300 animate-pulse">
                Establishing connection to Night City...
              </div>
            </div>
          </div>
        )}

        {/* Phase 1: Night City Introduction */}
        {currentPhase === 1 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-4 animate-pulse">
                🌆 NIGHT CITY 2077
              </h1>
              <div className="text-pink-300 text-lg mb-2">
                Welcome to the City of Dreams, choom
              </div>
              <div className="text-cyan-300 text-sm">
                Where chrome meets flesh and data is currency
              </div>
            </div>

            {/* Environment Description */}
            <div className="bg-purple-900/30 border border-pink-400/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="text-2xl text-pink-400 mb-4">Reality Stabilizing...</div>
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden mb-4">
                  <div className="h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
              
              <div className="text-gray-300 text-center space-y-4">
                <p>Neon signs flicker in languages you can't read. The air tastes of ozone and burnt chrome.</p>
                <p>Hovercars streak overhead while street vendors hawk braindances and military-grade cybernetics.</p>
                <p className="text-cyan-400 italic">This isn't the Matrix anymore. This is something else entirely.</p>
              </div>
            </div>

            {/* Character Introduction */}
            <div className="mb-8">
              <div className="bg-black/60 border border-purple-400/40 rounded-lg p-6 mb-4">
                <div className="text-purple-400 font-bold mb-2 text-center">
                  📡 Incoming Transmission
                </div>
                <div className="text-pink-300 text-sm font-mono">
                  [UNKNOWN_SOURCE]: Wake the f*ck up, samurai. <br/>
                  [UNKNOWN_SOURCE]: This ain't Kansas anymore, choom. <br/>
                  [UNKNOWN_SOURCE]: Data flows like blood through these streets. <br/>
                  [UNKNOWN_SOURCE]: You want answers? Find me at the Afterlife.
                </div>
              </div>
            </div>

            {/* Street Scene */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-900/20 border border-purple-400/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-400 mb-4">🏢 Corporate Plaza</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>Arasaka Tower looms in the distance, its apex lost in smog.</p>
                  <p>Security drones patrol with surgical precision.</p>
                  <p className="text-red-400">Threat Level: Corporate</p>
                </div>
              </div>
              
              <div className="bg-pink-900/20 border border-pink-400/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-400 mb-4">🌃 Watson District</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>Street markets sell everything from organs to memories.</p>
                  <p>Netrunners jack in from dark alleys.</p>
                  <p className="text-yellow-400">Opportunity Level: High</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center space-y-4">
              <div className="text-cyan-400 mb-4">
                The Afterlife bar beckons in the distance. Time to make some noise.
              </div>
              
              <button
                onClick={proceedToBouncer}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                Head to the Afterlife
              </button>
              
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => navigate('/matrix-v1/glitch-portal')}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  ← Reality Portal
                </button>
                
                <button
                  onClick={() => navigate('/matrix-v1/map-d3')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  Story Map
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Ambient neon glow effects */}
      <div className="fixed top-1/4 left-10 w-2 h-32 bg-purple-500/20 blur-sm animate-pulse"></div>
      <div className="fixed top-1/2 right-10 w-2 h-24 bg-pink-500/20 blur-sm animate-pulse"></div>
      <div className="fixed bottom-1/4 left-1/4 w-2 h-16 bg-cyan-500/20 blur-sm animate-pulse"></div>
    </div>
  );
} 