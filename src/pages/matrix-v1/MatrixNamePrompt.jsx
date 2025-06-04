import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixInput, MatrixButton } from '../../components/MatrixLayout';
import ProgressBar from '../../components/ProgressBar';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { useStoryProgress } from '../../hooks/useStoryProgress';
import { useUserActions } from '../../store/useAppStore';

const SCANNING_MESSAGES = [
  'IDENTITY SCANNING INITIATED...',
  'BIOMETRIC ANALYSIS IN PROGRESS...',
  'NEURAL PATTERN RECOGNITION ACTIVE...',
  'VALIDATING CONSCIOUSNESS SIGNATURE...'
];

const VALIDATION_RESPONSES = {
  short: 'Identity string too brief. Expand consciousness signature.',
  invalid: 'Character pattern anomaly detected. Recalibrate input.',
  valid: 'Identity pattern validated. Consciousness recognized.',
  confirmed: 'Name registered in system. Welcome to the Matrix.'
};

// Terminal-style chat messages
const TERMINAL_MESSAGES = [
  { sender: 'SYSTEM', text: 'IDENTITY VERIFICATION PROTOCOL ACTIVATED', type: 'system' },
  { sender: 'OPERATOR', text: 'Neo... can you hear me?', type: 'operator' },
  { sender: 'OPERATOR', text: 'We need to establish your identity signature in the system.', type: 'operator' },
  { sender: 'SYSTEM', text: 'State your identity designation for system registration...', type: 'system' }
];

export default function MatrixNamePrompt() {
  const [name, setName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [validationState, setValidationState] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [scanningIndex, setScanningIndex] = useState(0);
  const [nameLetters, setNameLetters] = useState([]);
  const [viewMode, setViewMode] = useState('enhanced'); // 'enhanced' | 'terminal'
  const [terminalMessages, setTerminalMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showTerminalInput, setShowTerminalInput] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useUserActions();
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Track story progression when name is confirmed
  const milestone = isConfirming ? 'name-confirmed' : null;
  useStoryProgress('matrix-name-prompt', milestone);

  // Enhanced view typewriter effects
  const [systemMessage] = useTypewriterEffect(
    viewMode === 'enhanced' ? 'IDENTITY VERIFICATION PROTOCOL ACTIVATED' : '', 
    60
  );
  const [promptMessage] = useTypewriterEffect(
    viewMode === 'enhanced' ? 'State your identity designation for system registration...' : '', 
    40
  );

  // Terminal view message typewriter
  const [currentTerminalMessage, terminalMessageDone] = useTypewriterEffect(
    viewMode === 'terminal' && terminalMessages[currentMessageIndex] 
      ? terminalMessages[currentMessageIndex].text 
      : '', 
    30
  );

  // Scanning message typewriter
  const [scanningMessage, scanningDone] = useTypewriterEffect(
    validationState === 'scanning' ? SCANNING_MESSAGES[scanningIndex] : '', 
    30
  );

  // Validation feedback typewriter
  const [validationMessage] = useTypewriterEffect(
    validationState && VALIDATION_RESPONSES[validationState] ? VALIDATION_RESPONSES[validationState] : '',
    50
  );

  // Initialize terminal messages when switching to terminal view
  useEffect(() => {
    if (viewMode === 'terminal') {
      setTerminalMessages([]);
      setCurrentMessageIndex(0);
      setShowTerminalInput(false);
      
      // Start typing terminal messages
      setTimeout(() => {
        setTerminalMessages([TERMINAL_MESSAGES[0]]);
        setCurrentMessageIndex(0);
      }, 500);
    }
  }, [viewMode]);

  // Handle terminal message progression
  useEffect(() => {
    if (viewMode === 'terminal' && terminalMessageDone && currentMessageIndex < TERMINAL_MESSAGES.length - 1) {
      setTimeout(() => {
        const nextIndex = currentMessageIndex + 1;
        setTerminalMessages(prev => [...prev, TERMINAL_MESSAGES[nextIndex]]);
        setCurrentMessageIndex(nextIndex);
      }, 1000);
    } else if (viewMode === 'terminal' && terminalMessageDone && currentMessageIndex === TERMINAL_MESSAGES.length - 1) {
      setTimeout(() => {
        setShowTerminalInput(true);
      }, 1500);
    }
  }, [viewMode, terminalMessageDone, currentMessageIndex]);

  // Animate scanning messages
  useEffect(() => {
    if (validationState === 'scanning' && scanningDone && scanningIndex < SCANNING_MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setScanningIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
    
    if (validationState === 'scanning' && scanningDone && scanningIndex === SCANNING_MESSAGES.length - 1) {
      setTimeout(() => {
        setValidationState('valid');
        setShowConfirm(true);
        
        // Add scanning results to terminal if in terminal mode
        if (viewMode === 'terminal') {
          setTerminalMessages(prev => [
            ...prev,
            { sender: 'SYSTEM', text: 'IDENTITY PATTERN VALIDATED', type: 'success' },
            { sender: 'OPERATOR', text: `Welcome, ${name}. Identity confirmed.`, type: 'operator' }
          ]);
        }
      }, 1000);
    }
  }, [scanningDone, scanningIndex, validationState, viewMode, name]);

  // Dynamic name letter animation
  useEffect(() => {
    if (name) {
      const letters = name.split('').map((char, index) => ({
        char,
        id: `${char}-${index}`,
        delay: index * 100
      }));
      setNameLetters(letters);
    } else {
      setNameLetters([]);
    }
  }, [name]);

  // Real-time validation
  useEffect(() => {
    if (name.length === 0) {
      setValidationState('');
      setShowConfirm(false);
    } else if (name.length < 2) {
      setValidationState('short');
      setShowConfirm(false);
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      setValidationState('invalid');
      setShowConfirm(false);
      
      // Add error to terminal if in terminal mode
      if (viewMode === 'terminal' && name.length > 0) {
        const errorMsg = { sender: 'SYSTEM', text: 'ERROR: Invalid character pattern detected', type: 'error' };
        setTerminalMessages(prev => {
          const filtered = prev.filter(msg => msg.type !== 'error');
          return [...filtered, errorMsg];
        });
      }
    } else if (name.length >= 2) {
      setValidationState('');
      setShowConfirm(true);
    }
  }, [name, viewMode]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalMessages]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Add user typing to terminal view
    if (viewMode === 'terminal' && value) {
      const userMsg = { sender: 'USER', text: `> ${value}`, type: 'user' };
      setTerminalMessages(prev => {
        const filtered = prev.filter(msg => msg.sender !== 'USER');
        return [...filtered, userMsg];
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && name.length >= 2) {
      setValidationState('scanning');
      setScanningIndex(0);
      setShowConfirm(false);
      
      // Add scanning messages to terminal
      if (viewMode === 'terminal') {
        setTerminalMessages(prev => [
          ...prev,
          { sender: 'SYSTEM', text: 'INITIATING IDENTITY SCAN...', type: 'scanning' }
        ]);
      }
    }
  };

  const confirmIdentity = () => {
    setIsConfirming(true);
    setValidationState('confirmed');
    
    // Set user name in global state
    setUserName(name.trim());
    localStorage.setItem('matrixV1Name', name.trim());
    
    // Navigate to next step after confirmation
    setTimeout(() => {
      navigate('/matrix-v1', { state: { name: name.trim(), fromNamePrompt: true } });
    }, 2500);
  };

  const retryInput = () => {
    setValidationState('');
    setShowConfirm(false);
    setScanningIndex(0);
    setName('');
    inputRef.current?.focus();
    
    // Clear terminal messages for retry
    if (viewMode === 'terminal') {
      setTerminalMessages(prev => prev.filter(msg => msg.type !== 'error' && msg.sender !== 'USER'));
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'enhanced' ? 'terminal' : 'enhanced');
  };

  // Enhanced View Component
  const EnhancedView = () => (
    <div className="w-full max-w-lg space-y-8">
      {/* System Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold heading-theme animate-theme-glow">
          {systemMessage}
        </h1>
        
        <div className="bg-theme-overlay border-2 border-theme-accent rounded-lg p-6 backdrop-blur-md">
          <p className="text-lg text-theme-bright font-theme-secondary">
            {promptMessage}
          </p>
        </div>
      </div>

      {/* Identity Input Section */}
      <div className="space-y-6">
        {/* Name Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <MatrixInput
              ref={inputRef}
              value={name}
              onChange={handleNameChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Enter identity designation"
              ariaLabel="Enter your name for identity verification"
              disabled={validationState === 'scanning' || isConfirming}
              className={`text-center text-xl font-mono transition-all duration-300 ${
                inputFocused ? 'ring-4 ring-theme-accent/30' : ''
              } ${
                validationState === 'invalid' ? 'border-red-400 ring-2 ring-red-400/30' : ''
              } ${
                validationState === 'valid' ? 'border-green-400 ring-2 ring-green-400/30' : ''
              }`}
            />
            
            {/* Digital Effects Overlay */}
            {inputFocused && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 animate-pulse bg-theme-accent/5 rounded-lg" />
                <div className="absolute -inset-1 animate-ping bg-theme-accent/10 rounded-lg" />
              </div>
            )}
          </div>

          {/* Submit Button (only show if valid and not confirming) */}
          {showConfirm && !validationState && (
            <MatrixButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              ariaLabel="Begin identity scanning"
            >
              Begin Identity Scan
            </MatrixButton>
          )}
        </form>

        {/* Dynamic Name Preview */}
        {nameLetters.length > 0 && (
          <div className="bg-theme-secondary border border-theme-primary rounded-lg p-6">
            <h3 className="text-sm text-theme-muted mb-3 text-center">Identity Preview:</h3>
            <div className="flex justify-center items-center gap-1 font-mono text-2xl">
              {nameLetters.map((letter, index) => (
                <span
                  key={letter.id}
                  className="inline-block text-theme-bright animate-fade-in"
                  style={{
                    animationDelay: `${letter.delay}ms`,
                    textShadow: '0 0 10px currentColor'
                  }}
                >
                  {letter.char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Validation Feedback */}
        {validationState && VALIDATION_RESPONSES[validationState] && (
          <div className={`
            border-2 rounded-lg p-4 text-center font-mono
            ${validationState === 'invalid' || validationState === 'short' 
              ? 'border-red-400 bg-red-900/20 text-red-300' 
              : validationState === 'valid' 
              ? 'border-green-400 bg-green-900/20 text-green-300'
              : validationState === 'confirmed'
              ? 'border-blue-400 bg-blue-900/20 text-blue-300'
              : 'border-theme-accent bg-theme-accent/20 text-theme-bright'
            }
          `}>
            <p className="text-sm">{validationMessage}</p>
          </div>
        )}

        {/* Scanning Display */}
        {validationState === 'scanning' && (
          <div className="bg-theme-secondary border-2 border-theme-accent rounded-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-theme-bright font-mono text-sm animate-pulse">
              {scanningMessage}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i <= scanningIndex ? 'bg-theme-accent' : 'bg-theme-overlay'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Section */}
        {validationState === 'valid' && showConfirm && (
          <div className="text-center space-y-4">
            <p className="text-theme-secondary">
              Identity pattern recognized. Proceed with registration?
            </p>
            <div className="flex gap-4 justify-center">
              <MatrixButton
                onClick={confirmIdentity}
                variant="success"
                size="lg"
                ariaLabel="Confirm identity and proceed"
              >
                Confirm Identity
              </MatrixButton>
              <MatrixButton
                onClick={retryInput}
                variant="secondary"
                ariaLabel="Retry identity input"
              >
                Retry Input
              </MatrixButton>
            </div>
          </div>
        )}

        {/* Final Confirmation */}
        {isConfirming && (
          <div className="text-center space-y-4">
            <div className="animate-pulse">
              <p className="text-2xl text-theme-bright font-bold">Identity Confirmed</p>
              <p className="text-theme-secondary">Welcome to the Matrix, {name}</p>
            </div>
            <ProgressBar
              value={100}
              max={100}
              color="bg-gradient-to-r from-theme-primary to-theme-accent animate-progress-bar"
            />
          </div>
        )}
      </div>
    </div>
  );

  // Terminal View Component
  const TerminalView = () => (
    <div className="w-full max-w-4xl space-y-4">
      {/* Terminal Window */}
      <div className="bg-black border-2 border-theme-accent rounded-lg overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="bg-theme-secondary px-4 py-2 border-b border-theme-accent flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-theme-muted text-sm">MATRIX_TERMINAL_v3.14</span>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto bg-black text-theme-primary text-sm leading-relaxed"
        >
          {/* Terminal Messages */}
          {terminalMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className={`
                ${msg.type === 'system' ? 'text-red-400' : ''}
                ${msg.type === 'operator' ? 'text-blue-400' : ''}
                ${msg.type === 'user' ? 'text-theme-accent' : ''}
                ${msg.type === 'error' ? 'text-red-500' : ''}
                ${msg.type === 'success' ? 'text-green-400' : ''}
                ${msg.type === 'scanning' ? 'text-yellow-400' : ''}
              `}>
                {msg.sender && msg.type !== 'user' && `[${msg.sender}] `}
              </span>
              <span className={index === currentMessageIndex ? 'animate-fade-in' : ''}>
                {index === currentMessageIndex ? currentTerminalMessage : msg.text}
              </span>
              {index === currentMessageIndex && !terminalMessageDone && (
                <span className="animate-pulse">▋</span>
              )}
            </div>
          ))}

          {/* Terminal Input */}
          {showTerminalInput && (
            <div className="mt-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-theme-accent">USER@MATRIX:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="enter_identity_designation"
                  className="flex-1 bg-transparent border-none outline-none text-theme-bright font-mono text-sm"
                  disabled={validationState === 'scanning' || isConfirming}
                  autoFocus
                />
                <span className="animate-pulse">▋</span>
              </form>
              
              {showConfirm && !validationState && (
                <div className="mt-2 text-theme-muted text-xs">
                  Press ENTER to submit or type "scan" to begin verification
                </div>
              )}
            </div>
          )}

          {/* Scanning Animation */}
          {validationState === 'scanning' && (
            <div className="mt-4 text-yellow-400">
              <div>SCANNING... {scanningMessage}</div>
              <div className="mt-1">
                {'█'.repeat(scanningIndex + 1)}{'░'.repeat(3 - scanningIndex)} {Math.round(((scanningIndex + 1) / 4) * 100)}%
              </div>
            </div>
          )}

          {/* Confirmation Buttons */}
          {validationState === 'valid' && showConfirm && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={confirmIdentity}
                className="px-4 py-1 bg-green-900 text-green-400 border border-green-400 rounded text-sm hover:bg-green-800 transition-colors"
              >
                [CONFIRM]
              </button>
              <button
                onClick={retryInput}
                className="px-4 py-1 bg-theme-secondary text-theme-muted border border-theme-muted rounded text-sm hover:bg-theme-tertiary transition-colors"
              >
                [RETRY]
              </button>
            </div>
          )}

          {/* Final Confirmation */}
          {isConfirming && (
            <div className="mt-4 text-green-400">
              <div className="animate-pulse">IDENTITY CONFIRMED: {name}</div>
              <div className="text-theme-muted text-xs">Redirecting to Matrix...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <MatrixLayout>
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-[110]">
        <div className="flex items-center gap-2 bg-theme-secondary border border-theme-accent rounded-lg p-2">
          <span className={`text-xs font-mono ${viewMode === 'enhanced' ? 'text-theme-bright' : 'text-theme-muted'}`}>
            UI
          </span>
          <button
            onClick={toggleViewMode}
            className="relative w-12 h-6 bg-theme-tertiary border border-theme-accent rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-accent"
            aria-label={`Switch to ${viewMode === 'enhanced' ? 'terminal' : 'enhanced'} view`}
          >
            <div className={`
              absolute top-0.5 w-5 h-5 bg-theme-accent rounded-full transition-all duration-300 transform
              ${viewMode === 'terminal' ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
          <span className={`text-xs font-mono ${viewMode === 'terminal' ? 'text-theme-bright' : 'text-theme-muted'}`}>
            TERM
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="transition-all duration-500 ease-in-out">
        {viewMode === 'enhanced' ? <EnhancedView /> : <TerminalView />}
      </div>

      {/* Accessibility Instructions */}
      <div className="text-xs text-theme-muted text-center mt-8">
        <p>Use keyboard navigation. Screen reader compatible.</p>
        <p>Toggle between UI and Terminal views with the switch above.</p>
      </div>
    </MatrixLayout>
  );
} 