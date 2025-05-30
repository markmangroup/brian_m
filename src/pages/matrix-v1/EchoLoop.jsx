import { useState, useEffect } from 'react';

export default function EchoLoop() {
  // Dialogue sequence that loops after line 6
  const dialogueSequence = [
    { speaker: "Neo", text: "Where am I?" },
    { speaker: "Echo", text: "You are in the between space." },
    { speaker: "Neo", text: "How do I get out?" },
    { speaker: "Echo", text: "You must listen harder." },
    { speaker: "Neo", text: "Listen to what?" },
    { speaker: "Echo", text: "To the pattern beneath the words." },
    // Loop starts here (repeats from index 1)
    { speaker: "Echo", text: "You are in the between space." },
    { speaker: "Neo", text: "How do I get out?" },
    { speaker: "Echo", text: "You must listen harder." },
    { speaker: "Neo", text: "Listen to what?" },
    { speaker: "Echo", text: "To the pattern beneath the words." },
    // Second loop
    { speaker: "Echo", text: "You are in the between space." },
    { speaker: "Neo", text: "How do I get out?" },
    { speaker: "Echo", text: "You must listen harder." }
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

  const handleInterrupt = () => {
    if (!canInterrupt) return;
    
    // Check if user interrupted during a loop (after line 6)
    if (currentLine >= 8) {
      setHasDetectedLoop(true);
      setIsComplete(true);
      setFeedback('✅ PATTERN DETECTED: Loop sequence identified and broken');
    } else {
      setFeedback('❌ TOO EARLY: No repetition detected yet. Continue listening...');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleRepeatQuestion = () => {
    if (!canInterrupt) return;
    
    // More advanced detection - checking for actual pattern recognition
    const recentLines = displayedLines.slice(-5).map(line => line.text);
    const earlierLines = displayedLines.slice(-10, -5).map(line => line.text);
    
    const hasRepeatingPattern = recentLines.some(line => earlierLines.includes(line));
    
    if (hasRepeatingPattern && currentLine >= 8) {
      setHasDetectedLoop(true);
      setIsComplete(true);
      setFeedback('✅ ECHO BROKEN: You recognized the recursive pattern');
    } else {
      setFeedback('❌ NO ECHO: Pattern not yet established. Keep listening...');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const resetDialogue = () => {
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
        <div className="space-y-3 mb-6 h-80 overflow-y-auto bg-gray-900/20 p-4 rounded border border-blue-400/20">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex gap-3">
              <span className={`font-bold min-w-[60px] ${
                line.speaker === 'Neo' ? 'text-blue-300' : 'text-purple-300'
              }`}>
                {line.speaker}:
              </span>
              <span className="text-gray-300">{line.text}</span>
              {/* Visual indicator for repeated lines */}
              {index > 6 && displayedLines.slice(0, index).some(prevLine => prevLine.text === line.text) && (
                <span className="text-yellow-400 text-xs">⟲</span>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {currentLine < dialogueSequence.length && !hasDetectedLoop && (
            <div className="flex gap-3 opacity-50">
              <span className="font-bold min-w-[60px]">...</span>
              <span className="text-gray-500">▋</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleInterrupt}
            disabled={!canInterrupt || isComplete}
            className={`
              px-4 py-2 rounded border font-medium transition-all
              ${!canInterrupt || isComplete
                ? 'border-gray-600 bg-gray-900/20 text-gray-500 cursor-not-allowed'
                : 'border-blue-400/60 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 pulse'
              }
            `}
          >
            ⛔ Interrupt
          </button>

          <button
            onClick={handleRepeatQuestion}
            disabled={!canInterrupt || isComplete}
            className={`
              px-4 py-2 rounded border font-medium transition-all
              ${!canInterrupt || isComplete
                ? 'border-gray-600 bg-gray-900/20 text-gray-500 cursor-not-allowed'
                : 'border-purple-400/60 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'
              }
            `}
          >
            🔄 "Didn't you just say that?"
          </button>

          <button
            onClick={resetDialogue}
            className="px-4 py-2 rounded border border-gray-600 bg-gray-900/20 text-gray-300 hover:bg-gray-900/40 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`
            p-3 rounded border text-sm mb-4
            ${isComplete 
              ? 'border-green-400/30 bg-green-900/10 text-green-300'
              : 'border-yellow-400/30 bg-yellow-900/10 text-yellow-300'
            }
          `}>
            {feedback}
          </div>
        )}

        {/* Success State */}
        {isComplete && (
          <div className="border border-green-400/30 p-4 rounded bg-green-900/10 text-center">
            <p className="text-green-400 mb-2">🎭 Echo Entity neutralized</p>
            <p className="text-gray-400 text-sm">Recursive loop broken. Reality anchor restored.</p>
            <div className="mt-4">
              <div className="inline-block px-4 py-2 border border-cyan-400/50 rounded text-cyan-300 text-sm">
                → Ready for Echo Verify
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div className="mt-6 text-xs text-gray-600 space-y-1">
          <p>💡 Listen for repeated phrases • Interrupt when you detect the pattern</p>
          <p>🎯 Current line: {currentLine + 1} / {dialogueSequence.length}</p>
          {canInterrupt && !isComplete && (
            <p className="text-yellow-400 animate-pulse">⚠️ Pattern detection available</p>
          )}
        </div>
      </div>
    </div>
  );
} 