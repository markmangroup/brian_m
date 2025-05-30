import { useState, useEffect } from 'react';
import { CharacterSpeaker } from '../components/CharacterSystem';

export default function EchoLoop() {
  // Dialogue sequence that loops after line 6
  const dialogueSequence = [
    { speaker: "neo", text: "Where am I?" },
    { speaker: "echo", text: "You are in the between space." },
    { speaker: "neo", text: "How do I get out?" },
    { speaker: "echo", text: "You must listen harder." },
    { speaker: "neo", text: "Listen to what?" },
    { speaker: "echo", text: "To the pattern beneath the words." },
    // Loop starts here (repeats from index 1)
    { speaker: "echo", text: "You are in the between space." },
    { speaker: "neo", text: "How do I get out?" },
    { speaker: "echo", text: "You must listen harder." },
    { speaker: "neo", text: "Listen to what?" },
    { speaker: "echo", text: "To the pattern beneath the words." },
    // Second loop
    { speaker: "echo", text: "You are in the between space." },
    { speaker: "neo", text: "How do I get out?" },
    { speaker: "echo", text: "You must listen harder." }
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [canInterrupt, setCanInterrupt] = useState(false);
  const [hasDetectedLoop, setHasDetectedLoop] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Auto-advance dialogue
  useEffect(() => {
    if (currentLine < dialogueSequence.length && !hasDetectedLoop) {
      const timer = setTimeout(() => {
        const newLine = dialogueSequence[currentLine];
        setDisplayedLines(prev => [...prev, { ...newLine, index: currentLine }]);
        setCurrentLine(prev => prev + 1);
        
        // Enable interrupt after first loop starts (line 6)
        if (currentLine >= 6) {
          setCanInterrupt(true);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentLine, hasDetectedLoop]);

  const detectLoop = () => {
    if (!canInterrupt) {
      setFeedback('❌ Too early! Wait for the pattern to emerge...');
      setTimeout(() => setFeedback(''), 2000);
      return;
    }

    setHasDetectedLoop(true);
    setIsComplete(true);
    setFeedback('✅ Loop detected! Reality pattern broken.');
    
    // Update progress tracking
    const matrixProgress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    matrixProgress.completedNodes = matrixProgress.completedNodes || [];
    matrixProgress.completedNodes.push('matrix-echo-loop');
    localStorage.setItem('matrixProgress', JSON.stringify(matrixProgress));
  };

  const resetLoop = () => {
    setCurrentLine(0);
    setDisplayedLines([]);
    setCanInterrupt(false);
    setHasDetectedLoop(false);
    setIsComplete(false);
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl text-blue-400 mb-2">[Active] Echo Loop</h1>
        <p className="text-gray-400 text-sm mb-6">Detect the recursive pattern and break free</p>
        
        {/* Dialogue Display */}
        <div className="space-y-4 mb-6 h-80 overflow-y-auto bg-gray-900/20 p-4 rounded border border-blue-400/20">
          {displayedLines.map((line, index) => (
            <div key={index} className="relative">
              <CharacterSpeaker 
                characterKey={line.speaker}
                text={line.text}
                className="animate-fade-in"
              />
              {/* Visual indicator for repeated lines */}
              {index > 6 && displayedLines.slice(0, index).some(prevLine => prevLine.text === line.text) && (
                <div className="absolute -right-2 top-0 text-yellow-400 text-xs bg-yellow-900/20 px-1 rounded">
                  ⟲ REPEAT
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {currentLine < dialogueSequence.length && !hasDetectedLoop && (
            <div className="opacity-50">
              <CharacterSpeaker 
                characterKey="system"
                text="..."
                className="animate-pulse"
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {!isComplete && (
            <button
              onClick={detectLoop}
              disabled={!canInterrupt}
              className={`
                w-full px-6 py-3 rounded border font-bold transition-all
                ${canInterrupt 
                  ? 'border-red-400/60 bg-red-900/20 text-red-300 hover:bg-red-900/40 animate-pulse' 
                  : 'border-gray-600 bg-gray-800/20 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              🚨 BREAK THE LOOP
            </button>
          )}

          {isComplete && (
            <div className="text-center space-y-4">
              <div className="bg-green-900/20 border border-green-400/30 rounded p-4">
                <h3 className="text-green-300 font-bold mb-2">🎯 Pattern Recognition Success</h3>
                <p className="text-gray-300 text-sm">
                  You successfully identified the recursive dialogue pattern and broke free from the loop.
                  This skill will be crucial for detecting Matrix anomalies.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={resetLoop}
                  className="px-6 py-3 rounded border border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 transition-all"
                >
                  🔄 Try Again
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded border border-cyan-400/60 bg-cyan-900/20 text-cyan-300 hover:bg-cyan-900/40 transition-all"
                >
                  ← Continue Journey
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4 text-center">
            <div className="bg-blue-900/20 border border-blue-400/30 rounded p-3">
              <span className="text-blue-300">{feedback}</span>
            </div>
          </div>
        )}

        {/* Pattern Analysis */}
        <div className="mt-8 bg-gray-900/30 border border-gray-600/20 rounded p-4">
          <h3 className="text-white font-bold mb-2">Pattern Analysis</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <div>Lines displayed: {displayedLines.length}</div>
            <div>Loop threshold: Line 6+</div>
            <div>Detection available: {canInterrupt ? '✅ Yes' : '❌ Not yet'}</div>
            <div>Status: {isComplete ? '✅ Complete' : '⏳ In progress'}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 