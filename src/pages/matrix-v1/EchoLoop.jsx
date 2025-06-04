import { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { CharacterSpeaker } from '../../components/CharacterSystem';
import { getWorldDialogue } from '../../utils/worldContentLoader';
import { realMatrixNodes } from './realMatrixFlow';

export default function EchoLoop() {
  const { currentWorld } = useTheme();
  
  // Get the node data for matrix-echo-loop
  const nodeData = realMatrixNodes.find(node => node.id === 'matrix-echo-loop')?.data;
  
  // Get world-specific dialogue using the content loader
  const worldDialogue = getWorldDialogue(nodeData?.dialogue, currentWorld);
  
  // Convert dialogue to the format expected by the component
  const dialogueSequence = worldDialogue.map((text, index) => {
    // Extract speaker from dialogue text (format: "Speaker: Text")
    const parts = text.split(': ');
    const speaker = parts.length > 1 ? parts[0].toLowerCase() : 'system';
    const dialogueText = parts.length > 1 ? parts.slice(1).join(': ') : text;
    
    return { speaker, text: dialogueText };
  });

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
        
        // Enable interrupt after some lines have been shown (adaptive based on world)
        const interruptThreshold = currentWorld === 'witcher' ? 4 : currentWorld === 'nightcity' ? 5 : 6;
        if (currentLine >= interruptThreshold) {
          setCanInterrupt(true);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentLine, hasDetectedLoop, dialogueSequence, currentWorld]);

  const detectLoop = () => {
    if (!canInterrupt) {
      const worldFeedback = {
        matrix: '❌ Too early! Wait for the pattern to emerge...',
        witcher: '❌ The curse is not yet ready to be broken...',
        nightcity: '❌ Insufficient data! Let the glitch cycle complete...',
        default: '❌ Too early! Wait for the pattern to emerge...'
      };
      setFeedback(worldFeedback[currentWorld] || worldFeedback.default);
      setTimeout(() => setFeedback(''), 2000);
      return;
    }

    setHasDetectedLoop(true);
    setIsComplete(true);
    
    const worldSuccessFeedback = {
      matrix: '✅ Loop detected! Reality pattern broken.',
      witcher: '✅ Curse recognized! Spectral binding severed.',
      nightcity: '✅ Glitch identified! Neural loop terminated.',
      default: '✅ Loop detected! Reality pattern broken.'
    };
    setFeedback(worldSuccessFeedback[currentWorld] || worldSuccessFeedback.default);
    
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

  // World-specific UI elements
  const worldConfig = {
    matrix: {
      title: '[Active] Echo Loop',
      subtitle: 'Detect the recursive pattern and break free',
      breakButtonText: '🚨 BREAK THE LOOP',
      successTitle: '🎯 Pattern Recognition Success',
      successText: 'You successfully identified the recursive dialogue pattern and broke free from the loop. This skill will be crucial for detecting Matrix anomalies.'
    },
    witcher: {
      title: '[Cursed] Spectral Echo',
      subtitle: 'Break the curse through pattern recognition',
      breakButtonText: '⚔️ SEVER THE BINDING',
      successTitle: '🛡️ Curse Breaking Success',
      successText: 'You recognized the spectral pattern and broke the cursed binding. Your witcher training in pattern recognition serves you well against supernatural threats.'
    },
    nightcity: {
      title: '[Corrupted] Neural Feedback',
      subtitle: 'Debug the recursive algorithm and restore function',
      breakButtonText: '💻 TERMINATE PROCESS',
      successTitle: '🔧 Debug Success',
      successText: 'You identified the recursive algorithm causing the neural feedback loop. Your cybernetic pattern recognition subroutines are functioning optimally.'
    }
  };

  const config = worldConfig[currentWorld] || worldConfig.matrix;

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary p-6 font-theme-ui">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl text-theme-accent mb-2">{config.title}</h1>
        <p className="text-theme-muted text-sm mb-6">{config.subtitle}</p>
        
        {/* Dialogue Display */}
        <div className="space-y-4 mb-6 h-80 overflow-y-auto bg-theme-secondary/20 p-4 rounded border border-theme-border/20">
          {displayedLines.map((line, index) => (
            <div key={index} className="relative">
              <CharacterSpeaker 
                characterKey={line.speaker}
                text={line.text}
                className="animate-fade-in"
              />
              {/* Visual indicator for repeated lines */}
              {index > 4 && displayedLines.slice(0, index).some(prevLine => prevLine.text === line.text) && (
                <div className="absolute -right-2 top-0 text-theme-warning text-xs bg-theme-warning/20 px-1 rounded">
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
                  ? 'border-theme-error/60 bg-theme-error/20 text-theme-error hover:bg-theme-error/40 animate-pulse' 
                  : 'border-theme-muted bg-theme-secondary/20 text-theme-muted cursor-not-allowed'
                }
              `}
            >
              {config.breakButtonText}
            </button>
          )}

          {isComplete && (
            <div className="text-center space-y-4">
              <div className="bg-theme-success/20 border border-theme-success/30 rounded p-4">
                <h3 className="text-theme-success font-bold mb-2">{config.successTitle}</h3>
                <p className="text-theme-primary text-sm">
                  {config.successText}
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={resetLoop}
                  className="px-6 py-3 rounded border border-theme-info/60 bg-theme-info/20 text-theme-info hover:bg-theme-info/40 transition-all"
                >
                  🔄 Try Again
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded border border-theme-accent/60 bg-theme-accent/20 text-theme-accent hover:bg-theme-accent/40 transition-all"
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
            <div className="inline-block px-4 py-2 rounded bg-theme-secondary/40 border border-theme-border/30">
              {feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 