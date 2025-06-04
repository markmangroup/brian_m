import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NightCityBouncer() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [playerEddies, setPlayerEddies] = useState(250); // Start with some cash
  const [hasDataChip, setHasDataChip] = useState(true); // Player has a basic data chip
  const [choiceResult, setChoiceResult] = useState(null);

  useEffect(() => {
    // Auto-progress to main scene
    const timer = setTimeout(() => {
      setCurrentPhase(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const makeChoice = (choice) => {
    let result = '';
    
    switch (choice) {
      case 'pay':
        if (playerEddies >= 500) {
          result = 'success';
          setPlayerEddies(prev => prev - 500);
        } else {
          result = 'fail_money';
        }
        break;
      case 'chip':
        result = hasDataChip ? 'success' : 'fail_chip';
        break;
      case 'hack':
        // 70% success rate for hacking
        result = Math.random() > 0.3 ? 'success' : 'fail_hack';
        break;
      case 'fight':
        result = 'fight';
        break;
      default:
        result = 'fail';
    }
    
    setChoiceResult(result);
    setCurrentPhase(2);
  };

  const proceedNext = () => {
    // Save progress
    const progress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    progress.completedNodes = [...(progress.completedNodes || []), 'nc-bouncer'];
    localStorage.setItem('matrixProgress', JSON.stringify(progress));
    
    // Route based on choice result
    if (choiceResult === 'success') {
      navigate('/matrix-v1/night-city/netdiver');
    } else if (choiceResult === 'fight') {
      navigate('/matrix-v1/night-city/escape');
    } else {
      navigate('/matrix-v1/night-city/entry'); // Back to start
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 text-white p-6 font-mono relative overflow-hidden">
      {/* Neon ambiance */}
      <div className="absolute inset-0 bg-grid-cyberpunk opacity-20"></div>
      <div className="absolute top-[72px] left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Phase 0: Arriving at the club */}
        {currentPhase === 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="text-4xl mb-8 text-pink-400 animate-pulse">
                🏢 APPROACHING THE AFTERLIFE
              </div>
              <div className="text-purple-300">
                Neon signs buzz overhead...
              </div>
            </div>
          </div>
        )}

        {/* Phase 1: Bouncer encounter */}
        {currentPhase === 1 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-4">
                🤖 THE AFTERLIFE ENTRANCE
              </h1>
              <div className="text-pink-300 text-lg mb-2">
                Legendary fixer bar where legends are born and die
              </div>
            </div>

            {/* Scene Description */}
            <div className="bg-purple-900/30 border border-pink-400/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
              <div className="text-gray-300 space-y-4">
                <p>A massive cyborg bouncer blocks the entrance, chrome arms crossed. Neural implants glow red in his skull.</p>
                <p>Behind him, you catch glimpses of the legendary bar where netrunners, mercenaries, and fixers make deals that shake Night City.</p>
                <p className="text-cyan-400 italic">This is where the real players come to play.</p>
              </div>
            </div>

            {/* Bouncer Dialogue */}
            <div className="bg-black/60 border border-red-400/40 rounded-lg p-6 mb-8">
              <div className="text-red-400 font-bold mb-2 text-center">
                🤖 CYBORG BOUNCER
              </div>
              <div className="text-pink-300 text-lg font-mono text-center space-y-2">
                <p>"Hold up there, choom."</p>
                <p>"Entry fee is 500 eddies or a data chip worth my time."</p>
                <p className="text-yellow-400">"You look like trouble... but the right kind."</p>
              </div>
            </div>

            {/* Player Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                <h3 className="text-green-400 font-bold mb-2">💰 Your Resources</h3>
                <div className="text-gray-300 text-sm">
                  <p>Eddies: {playerEddies}</p>
                  <p>Data Chips: {hasDataChip ? '1 (Basic Intel)' : 'None'}</p>
                  <p>Cyberware: Basic Neural Interface</p>
                </div>
              </div>
              
              <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                <h3 className="text-red-400 font-bold mb-2">⚠️ Threat Assessment</h3>
                <div className="text-gray-300 text-sm">
                  <p>Bouncer: Military-grade cybernetics</p>
                  <p>Combat Rating: Extremely Dangerous</p>
                  <p>Hack Difficulty: Moderate (ICE protected)</p>
                </div>
              </div>
            </div>

            {/* Choice Options */}
            <div className="space-y-4">
              <h3 className="text-center text-cyan-400 font-bold mb-6">How do you handle this, choom?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => makeChoice('pay')}
                  disabled={playerEddies < 500}
                  className={`p-4 rounded-lg border transition-all ${
                    playerEddies >= 500 
                      ? 'bg-green-900/30 border-green-400/60 hover:bg-green-900/50 text-green-300'
                      : 'bg-gray-900/30 border-gray-600/60 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="font-bold mb-2">💰 Pay 500 Eddies</div>
                  <div className="text-sm">Clean and simple. Money talks in Night City.</div>
                  {playerEddies < 500 && <div className="text-red-400 text-xs mt-2">Insufficient funds</div>}
                </button>

                <button
                  onClick={() => makeChoice('chip')}
                  disabled={!hasDataChip}
                  className={`p-4 rounded-lg border transition-all ${
                    hasDataChip 
                      ? 'bg-blue-900/30 border-blue-400/60 hover:bg-blue-900/50 text-blue-300'
                      : 'bg-gray-900/30 border-gray-600/60 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="font-bold mb-2">💾 Offer Data Chip</div>
                  <div className="text-sm">Trade information for access. Hope it's valuable enough.</div>
                  {!hasDataChip && <div className="text-red-400 text-xs mt-2">No chips available</div>}
                </button>

                <button
                  onClick={() => makeChoice('hack')}
                  className="p-4 rounded-lg border bg-purple-900/30 border-purple-400/60 hover:bg-purple-900/50 text-purple-300 transition-all"
                >
                  <div className="font-bold mb-2">🧠 Hack Cyberware</div>
                  <div className="text-sm">Risky netrunning. Could backfire spectacularly.</div>
                  <div className="text-yellow-400 text-xs mt-2">Success: 70% | Risk: ICE counterstrike</div>
                </button>

                <button
                  onClick={() => makeChoice('fight')}
                  className="p-4 rounded-lg border bg-red-900/30 border-red-400/60 hover:bg-red-900/50 text-red-300 transition-all"
                >
                  <div className="font-bold mb-2">⚔️ Start Fight</div>
                  <div className="text-sm">Violence is always an option. Probably a bad one.</div>
                  <div className="text-red-400 text-xs mt-2">Warning: High casualty probability</div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Phase 2: Choice Result */}
        {currentPhase === 2 && choiceResult && (
          <div className="text-center">
            {choiceResult === 'success' && (
              <div className="bg-green-900/30 border border-green-400/60 rounded-xl p-8 mb-8">
                <h2 className="text-3xl text-green-400 mb-4">✅ ACCESS GRANTED</h2>
                <div className="text-gray-300 space-y-4">
                  <p>The bouncer steps aside with a mechanical whir.</p>
                  <p className="text-green-400">"Welcome to the Afterlife, choom. Try not to become a legend tonight."</p>
                  <p>The doors slide open, revealing the neon-soaked interior of Night City's most dangerous bar.</p>
                </div>
              </div>
            )}

            {choiceResult === 'fight' && (
              <div className="bg-red-900/30 border border-red-400/60 rounded-xl p-8 mb-8">
                <h2 className="text-3xl text-red-400 mb-4">⚔️ COMBAT INITIATED</h2>
                <div className="text-gray-300 space-y-4">
                  <p>The bouncer's eyes flare red. "Big mistake, choom."</p>
                  <p className="text-red-400">Combat subroutines activate. Time to run!</p>
                  <p>Security alarms blare as MaxTac units are dispatched to your location.</p>
                </div>
              </div>
            )}

            {choiceResult === 'fail_money' && (
              <div className="bg-gray-900/30 border border-gray-400/60 rounded-xl p-8 mb-8">
                <h2 className="text-3xl text-gray-400 mb-4">💸 INSUFFICIENT FUNDS</h2>
                <div className="text-gray-300 space-y-4">
                  <p>The bouncer laughs, a harsh mechanical sound.</p>
                  <p className="text-yellow-400">"Come back when you've got real eddies, street rat."</p>
                  <p>You'll need to find another way in... or more cash.</p>
                </div>
              </div>
            )}

            {choiceResult === 'fail_hack' && (
              <div className="bg-red-900/30 border border-red-400/60 rounded-xl p-8 mb-8">
                <h2 className="text-3xl text-red-400 mb-4">🔒 HACK FAILED</h2>
                <div className="text-gray-300 space-y-4">
                  <p>ICE counterstrike detected! Neural feedback burns through your interface.</p>
                  <p className="text-red-400">"Nice try, script kiddie. Now you've pissed me off."</p>
                  <p>Security systems activate. Time to disappear before things get worse.</p>
                </div>
              </div>
            )}

            <button
              onClick={proceedNext}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              {choiceResult === 'success' ? 'Enter the Afterlife' : 
               choiceResult === 'fight' ? 'Run for Your Life' : 
               'Try Again'}
            </button>
            
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => navigate('/matrix-v1/night-city/entry')}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                ← Night City Entry
              </button>
              
              <button
                onClick={() => navigate('/matrix-v1/map-d3')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                Story Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 