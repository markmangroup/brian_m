import { useState, useEffect, useRef } from 'react';

export default function ShardInsert() {
  // Corrupted syntax lines
  const syntaxLines = [
    "const matrix = {",
    "  reality: undefined,",
    "  users: [],",
    "  core: function() {",
    "    if (this.reality === null) {",
    "      return false;",
    "    }",
    "    return this.users.length > 0;",
    "  },",
    "  destabilize() {",
    "    this.reality = null;",
    "    this.users = [];",
    "  }",
    "};"
  ];

  // Tokens to catch (missing brackets, semicolons, etc.)
  const catchableTokens = [
    { symbol: '}', description: 'Closing brace' },
    { symbol: ';', description: 'Semicolon' },
    { symbol: ')', description: 'Closing paren' },
    { symbol: ']', description: 'Closing bracket' },
    { symbol: '=', description: 'Assignment' },
    { symbol: '{', description: 'Opening brace' }
  ];

  const [gameState, setGameState] = useState('ready'); // ready, playing, complete, failed
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [currentToken, setCurrentToken] = useState(null);
  const [tokenPosition, setTokenPosition] = useState({ x: 0, y: 0 });
  const [timer, setTimer] = useState(3000); // 3 seconds per token
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState('');

  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);

  const SCORE_THRESHOLD = 10;
  const MAX_MISSED = 5;
  const TOKEN_DURATION = 2500; // milliseconds

  useEffect(() => {
    if (gameState === 'playing' && currentToken) {
      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 100) {
            // Token expired
            setMissed(m => m + 1);
            setFeedback('❌ Token escaped!');
            setTimeout(() => setFeedback(''), 1000);
            spawnNextToken();
            return TOKEN_DURATION;
          }
          return prev - 100;
        });
      }, 100);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameState, currentToken]);

  useEffect(() => {
    if (missed >= MAX_MISSED) {
      setGameState('failed');
      setFeedback('💥 System compromised - too many tokens escaped');
    } else if (score >= SCORE_THRESHOLD) {
      setGameState('complete');
      setFeedback('✅ SYSTEM SECURED: All syntax errors resolved');
    }
  }, [score, missed]);

  const spawnNextToken = () => {
    if (gameState !== 'playing') return;

    const token = catchableTokens[Math.floor(Math.random() * catchableTokens.length)];
    
    // Random position within game area
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      const rect = gameArea.getBoundingClientRect();
      const x = Math.random() * (rect.width - 40);
      const y = Math.random() * (rect.height - 40);
      
      setTokenPosition({ x, y });
      setCurrentToken(token);
      setTimer(TOKEN_DURATION);
      setRound(r => r + 1);
    }
  };

  const handleTokenClick = () => {
    if (!currentToken || gameState !== 'playing') return;

    setScore(s => s + 1);
    setFeedback(`✅ Caught ${currentToken.description}! +1`);
    setTimeout(() => setFeedback(''), 800);
    
    // Brief pause before next token
    setCurrentToken(null);
    setTimeout(() => {
      spawnNextToken();
    }, 1000);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setMissed(0);
    setRound(0);
    setFeedback('');
    setTimeout(() => {
      spawnNextToken();
    }, 500);
  };

  const resetGame = () => {
    setGameState('ready');
    setCurrentToken(null);
    setScore(0);
    setMissed(0);
    setRound(0);
    setTimer(TOKEN_DURATION);
    setFeedback('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const timerPercentage = (timer / TOKEN_DURATION) * 100;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl text-red-400 mb-2">[Active] Shard Insert</h1>
        <p className="text-gray-400 text-sm mb-6">Catch syntax tokens before they corrupt the system</p>
        
        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-900/20 border border-green-400/30 p-3 rounded text-center">
            <div className="text-green-400 text-lg font-bold">{score}</div>
            <div className="text-xs text-gray-400">Caught</div>
          </div>
          <div className="bg-red-900/20 border border-red-400/30 p-3 rounded text-center">
            <div className="text-red-400 text-lg font-bold">{missed}</div>
            <div className="text-xs text-gray-400">Missed</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-400/30 p-3 rounded text-center">
            <div className="text-blue-400 text-lg font-bold">{round}</div>
            <div className="text-xs text-gray-400">Round</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-400/30 p-3 rounded text-center">
            <div className="text-purple-400 text-lg font-bold">{SCORE_THRESHOLD}</div>
            <div className="text-xs text-gray-400">Target</div>
          </div>
        </div>

        {/* Code Background */}
        <div className="bg-gray-900/30 border border-gray-600/20 rounded p-4 mb-6 text-xs relative overflow-hidden">
          {syntaxLines.map((line, index) => (
            <div key={index} className="text-gray-600 leading-relaxed">
              {line}
            </div>
          ))}
          
          {/* Overlay for corruption effect */}
          <div className="absolute inset-0 bg-red-900/5 animate-pulse"></div>
        </div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="relative bg-red-900/10 border border-red-400/30 rounded h-64 mb-6 overflow-hidden"
        >
          {/* Timer Bar */}
          {gameState === 'playing' && currentToken && (
            <div className="absolute top-0 left-0 h-1 bg-yellow-400 transition-all duration-100 ease-linear" 
                 style={{ width: `${timerPercentage}%` }}></div>
          )}

          {/* Catchable Token */}
          {currentToken && gameState === 'playing' && (
            <button
              onClick={handleTokenClick}
              className="absolute bg-yellow-400 text-black font-bold text-xl w-10 h-10 rounded-full border-2 border-yellow-200 hover:bg-yellow-300 transition-all transform hover:scale-110 animate-pulse shadow-lg"
              style={{ 
                left: `${tokenPosition.x}px`, 
                top: `${tokenPosition.y}px`,
                animation: 'float 0.5s ease-in-out infinite alternate'
              }}
            >
              {currentToken.symbol}
            </button>
          )}

          {/* Game State Messages */}
          {gameState === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-4">Click tokens before they escape</p>
                <p className="text-xs text-gray-500">Target: {SCORE_THRESHOLD} | Max missed: {MAX_MISSED}</p>
              </div>
            </div>
          )}

          {gameState === 'complete' && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-900/20">
              <div className="text-center">
                <p className="text-green-400 text-lg">🔧 System Secured</p>
                <p className="text-xs text-gray-400 mt-2">All syntax errors resolved</p>
              </div>
            </div>
          )}

          {gameState === 'failed' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
              <div className="text-center">
                <p className="text-red-400 text-lg">💥 System Compromised</p>
                <p className="text-xs text-gray-400 mt-2">Too many tokens escaped</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-4">
          {gameState === 'ready' && (
            <button
              onClick={startGame}
              className="px-6 py-2 rounded border border-green-400/60 bg-green-900/20 text-green-300 hover:bg-green-900/40 transition-all font-medium"
            >
              🎯 Start Hunt
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
            'border-yellow-400/30 bg-yellow-900/10 text-yellow-300'
          }`}>
            {feedback}
          </div>
        )}

        {/* Success State */}
        {gameState === 'complete' && (
          <div className="border border-green-400/30 p-4 rounded bg-green-900/10 text-center">
            <p className="text-green-400 mb-2">🔧 Syntax corruption neutralized</p>
            <p className="text-gray-400 text-sm">Code fragments successfully reassembled</p>
            <div className="mt-4">
              <div className="inline-block px-4 py-2 border border-cyan-400/50 rounded text-cyan-300 text-sm">
                → Ready for Ghost Layer 2
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 text-xs text-gray-600">
          <p>💡 Click glowing tokens • Timer shows remaining time • Catch {SCORE_THRESHOLD} to complete</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
} 