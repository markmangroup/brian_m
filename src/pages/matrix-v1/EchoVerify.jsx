import { useState, useEffect, useRef } from 'react';

export default function EchoVerify() {
  // Available symbols for patterns
  const symbols = [
    { id: 'circle', symbol: '●', color: 'text-cyan-400' },
    { id: 'square', symbol: '▢', color: 'text-yellow-400' },
    { id: 'diamond', symbol: '⧫', color: 'text-purple-400' },
    { id: 'cross', symbol: '✕', color: 'text-red-400' }
  ];

  const [gameState, setGameState] = useState('ready'); // ready, showing, waiting, checking, complete, failed
  const [currentPattern, setCurrentPattern] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const animationRef = useRef(null);
  const PATTERN_LENGTHS = [3, 4, 5, 6, 7]; // Progressive difficulty
  const MAX_ATTEMPTS = 3;
  const SHOW_DURATION = 800; // ms per symbol
  const PAUSE_DURATION = 300; // ms between symbols

  useEffect(() => {
    if (gameState === 'showing' && showingIndex < currentPattern.length) {
      const timer = setTimeout(() => {
        if (showingIndex === currentPattern.length - 1) {
          // Pattern shown completely
          setShowingIndex(-1);
          setGameState('waiting');
          setFeedback('🎵 Replicate the sequence you just saw');
        } else {
          setShowingIndex(prev => prev + 1);
        }
      }, SHOW_DURATION + PAUSE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [gameState, showingIndex, currentPattern]);

  useEffect(() => {
    if (userInput.length === currentPattern.length && gameState === 'waiting') {
      checkPattern();
    }
  }, [userInput, currentPattern, gameState]);

  const generatePattern = (length) => {
    const pattern = [];
    for (let i = 0; i < length; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      pattern.push(randomSymbol);
    }
    return pattern;
  };

  const startLevel = () => {
    const patternLength = PATTERN_LENGTHS[Math.min(level - 1, PATTERN_LENGTHS.length - 1)];
    const newPattern = generatePattern(patternLength);
    
    setCurrentPattern(newPattern);
    setUserInput([]);
    setShowingIndex(0);
    setGameState('showing');
    setFeedback(`📊 Level ${level} - Pattern Length: ${patternLength}`);
  };

  const checkPattern = () => {
    setGameState('checking');
    
    const isCorrect = userInput.every((input, index) => 
      input.id === currentPattern[index].id
    );

    if (isCorrect) {
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
      setAttempts(0);
      setFeedback(`✅ Perfect! Pattern verified. Level ${level} complete.`);
      
      if (level >= 5) {
        setGameState('complete');
        setFeedback('🎭 ECHO VERIFIED: Mirror Self synchronization complete');
      } else {
        setTimeout(() => {
          startLevel();
        }, 2000);
      }
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts >= MAX_ATTEMPTS - 1) {
        setGameState('failed');
        setFeedback('❌ DESYNC DETECTED: Pattern verification failed');
      } else {
        setFeedback(`❌ Incorrect sequence. ${MAX_ATTEMPTS - attempts - 1} attempts remaining.`);
        setUserInput([]);
        setTimeout(() => {
          setGameState('waiting');
          setFeedback('🔄 Try again - remember the pattern');
        }, 1500);
      }
    }
  };

  const handleSymbolClick = (symbol) => {
    if (gameState !== 'waiting') return;
    
    if (userInput.length < currentPattern.length) {
      setUserInput(prev => [...prev, symbol]);
    }
  };

  const resetGame = () => {
    setGameState('ready');
    setCurrentPattern([]);
    setUserInput([]);
    setShowingIndex(-1);
    setLevel(1);
    setScore(0);
    setAttempts(0);
    setFeedback('');
  };

  const clearInput = () => {
    if (gameState === 'waiting') {
      setUserInput([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl text-blue-400 mb-2">[Active] Echo Verify</h1>
        <p className="text-gray-400 text-sm mb-6">Match the Mirror Self's rhythm pattern</p>
        
        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-900/20 border border-blue-400/30 p-3 rounded text-center">
            <div className="text-blue-400 text-lg font-bold">{level}</div>
            <div className="text-xs text-gray-400">Level</div>
          </div>
          <div className="bg-green-900/20 border border-green-400/30 p-3 rounded text-center">
            <div className="text-green-400 text-lg font-bold">{score}</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-400/30 p-3 rounded text-center">
            <div className="text-purple-400 text-lg font-bold">{MAX_ATTEMPTS - attempts}</div>
            <div className="text-xs text-gray-400">Attempts</div>
          </div>
        </div>

        {/* Pattern Display Area */}
        <div className="bg-gray-900/30 border border-blue-400/20 rounded p-8 mb-6 min-h-[200px] flex items-center justify-center">
          {gameState === 'ready' && (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Watch the pattern, then replicate it</p>
              <p className="text-xs text-gray-500">Levels increase in complexity</p>
            </div>
          )}

          {(gameState === 'showing' || gameState === 'waiting' || gameState === 'checking') && (
            <div className="space-y-8">
              {/* Pattern Display */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">
                  {gameState === 'showing' ? 'Observe Pattern:' : 'Replicate Pattern:'}
                </p>
                <div className="flex justify-center space-x-4">
                  {currentPattern.map((symbol, index) => (
                    <div
                      key={index}
                      className={`text-4xl transition-all duration-300 ${
                        gameState === 'showing' && index === showingIndex
                          ? `${symbol.color} scale-125 animate-pulse`
                          : gameState === 'showing' && index < showingIndex
                          ? symbol.color
                          : 'text-gray-700'
                      }`}
                    >
                      {symbol.symbol}
                    </div>
                  ))}
                </div>
              </div>

              {/* User Input Display */}
              {(gameState === 'waiting' || gameState === 'checking') && (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-4">Your Input:</p>
                  <div className="flex justify-center space-x-4 min-h-[50px]">
                    {userInput.map((symbol, index) => (
                      <div key={index} className={`text-4xl ${symbol.color}`}>
                        {symbol.symbol}
                      </div>
                    ))}
                    {userInput.length < currentPattern.length && gameState === 'waiting' && (
                      <div className="text-4xl text-gray-600 animate-pulse">_</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {gameState === 'complete' && (
            <div className="text-center">
              <p className="text-green-400 text-xl mb-2">🎭 Mirror Self Verified</p>
              <p className="text-gray-400 text-sm">Pattern synchronization complete</p>
            </div>
          )}

          {gameState === 'failed' && (
            <div className="text-center">
              <p className="text-red-400 text-xl mb-2">❌ Desynchronization</p>
              <p className="text-gray-400 text-sm">Pattern verification failed</p>
            </div>
          )}
        </div>

        {/* Symbol Input Buttons */}
        {gameState === 'waiting' && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {symbols.map((symbol) => (
              <button
                key={symbol.id}
                onClick={() => handleSymbolClick(symbol)}
                className={`p-4 rounded border transition-all hover:scale-105 ${symbol.color} border-current bg-current/10 hover:bg-current/20`}
                disabled={userInput.length >= currentPattern.length}
              >
                <div className="text-3xl">{symbol.symbol}</div>
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mb-4">
          {gameState === 'ready' && (
            <button
              onClick={startLevel}
              className="px-6 py-2 rounded border border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 transition-all font-medium"
            >
              🎵 Start Pattern
            </button>
          )}

          {gameState === 'waiting' && (
            <button
              onClick={clearInput}
              className="px-4 py-2 rounded border border-yellow-400/60 bg-yellow-900/20 text-yellow-300 hover:bg-yellow-900/40 transition-all"
            >
              🧹 Clear Input
            </button>
          )}

          <button
            onClick={resetGame}
            className="px-4 py-2 rounded border border-gray-600 bg-gray-900/20 text-gray-300 hover:bg-gray-900/40 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`p-3 rounded border text-sm mb-4 ${
            gameState === 'complete' ? 'border-green-400/30 bg-green-900/10 text-green-300' :
            gameState === 'failed' ? 'border-red-400/30 bg-red-900/10 text-red-300' :
            'border-blue-400/30 bg-blue-900/10 text-blue-300'
          }`}>
            {feedback}
          </div>
        )}

        {/* Success State */}
        {gameState === 'complete' && (
          <div className="border border-green-400/30 p-4 rounded bg-green-900/10 text-center">
            <p className="text-green-400 mb-2">🎭 Mirror Self synchronization verified</p>
            <p className="text-gray-400 text-sm">Pattern recognition mastery achieved. Echo verified.</p>
            <div className="mt-4">
              <div className="inline-block px-4 py-2 border border-cyan-400/50 rounded text-cyan-300 text-sm">
                → Ready for Ghost Layer 2
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 text-xs text-gray-600 space-y-1">
          <p>💡 Watch symbols light up • Remember the sequence • Click symbols in order</p>
          <p>🎯 Complete 5 levels to verify Mirror Self • {MAX_ATTEMPTS} attempts per level</p>
        </div>
      </div>
    </div>
  );
} 