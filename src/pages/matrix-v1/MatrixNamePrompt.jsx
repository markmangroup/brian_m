import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixLayout, { MatrixInput, MatrixButton } from '../../components/MatrixLayout';
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

export default function MatrixNamePrompt() {
  const [name, setName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [validationState, setValidationState] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [scanningIndex, setScanningIndex] = useState(0);
  const [nameLetters, setNameLetters] = useState([]);
  const navigate = useNavigate();
  const { setUserName } = useUserActions();
  const inputRef = useRef(null);

  // Track story progression when name is confirmed
  const milestone = isConfirming ? 'name-confirmed' : null;
  useStoryProgress('matrix-name-prompt', milestone);

  // Typewriter effects
  const [systemMessage] = useTypewriterEffect(
    'IDENTITY VERIFICATION PROTOCOL ACTIVATED', 
    60
  );
  const [promptMessage] = useTypewriterEffect(
    'State your identity designation for system registration...', 
    40
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
      }, 1000);
    }
  }, [scanningDone, scanningIndex, validationState]);

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
    } else if (name.length >= 2) {
      setValidationState('');
      setShowConfirm(true);
    }
  }, [name]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && name.length >= 2) {
      setValidationState('scanning');
      setScanningIndex(0);
      setShowConfirm(false);
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
  };

  return (
    <MatrixLayout>
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
              <div className="w-full bg-theme-overlay rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-theme-primary to-theme-accent animate-progress-bar" />
              </div>
            </div>
          )}
        </div>

        {/* Accessibility Instructions */}
        <div className="text-xs text-theme-muted text-center">
          <p>Use keyboard navigation. Screen reader compatible.</p>
          <p>Identity verification supports voice input on compatible devices.</p>
        </div>
      </div>
    </MatrixLayout>
  );
} 