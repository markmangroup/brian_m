import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/MatrixRain';
import NPC from './components/NPC';

const SYMBOLS = ['⊕', '▭', '◯', '▣', '△', '◆', '◇', '☆'];

function getSequence() {
  const len = 3 + Math.floor(Math.random() * 3); // 3-5
  const available = [...SYMBOLS];
  const seq = [];
  for (let i = 0; i < len; i++) {
    const idx = Math.floor(Math.random() * available.length);
    seq.push(available.splice(idx, 1)[0]);
  }
  return seq;
}

export default function Stabilize() {
  const navigate = useNavigate();
  const [sequence, setSequence] = useState([]);
  const [grid, setGrid] = useState([]);
  const [sequenceStep, setSequenceStep] = useState(-1); // -1 = not started, 0+ = animating
  const [fadeOut, setFadeOut] = useState(false);
  const [puzzlePhase, setPuzzlePhase] = useState('showing'); // 'showing' | 'waiting' | 'guessing'
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null); // 'success' | 'fail'
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterMsg, setTypewriterMsg] = useState('');
  const [flicker, setFlicker] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

  // Diagnostic log
  useEffect(() => {
    console.log('Puzzle phase:', puzzlePhase);
  }, [puzzlePhase]);

  // Sequence setup and animation
  useEffect(() => {
    const seq = getSequence();
    setSequence(seq);
    const symbols = [...seq];
    while (symbols.length < 6) {
      const s = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      if (!symbols.includes(s)) symbols.push(s);
    }
    symbols.sort(() => Math.random() - 0.5);
    setGrid(symbols);
    setSequenceStep(-1);
    setFadeOut(false);
    setPuzzlePhase('showing');
    setSelected([]);
    setStatus(null);
    setInvalid(false);
    setTimeout(() => setSequenceStep(0), 300); // slight delay before anim
  }, [attempts]);

  // Animate sequence in
  useEffect(() => {
    if (puzzlePhase !== 'showing') return;
    if (sequenceStep >= 0 && sequenceStep < sequence.length) {
      const t = setTimeout(() => setSequenceStep(sequenceStep + 1), 600);
      return () => clearTimeout(t);
    }
    if (sequenceStep === sequence.length) {
      // Hold for rest of 3.5s, then fade out, then show Ready
      const totalDelay = Math.max(0, 3500 - sequence.length * 600);
      const t = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setPuzzlePhase('waiting');
        }, 600); // fade duration
      }, totalDelay);
      return () => clearTimeout(t);
    }
  }, [sequenceStep, sequence.length, puzzlePhase]);

  // Handle status changes
  useEffect(() => {
    if (status === 'fail') {
      if (attempts >= 2) setInvalid(true);
      setTimeout(() => {
        if (attempts >= 2) {
          setFlicker(true);
          setTimeout(() => navigate('/matrix-v1/error-loop'), 600);
        } else {
          setSelected([]);
          setStatus(null);
        }
      }, 900);
    }
    if (status === 'success') {
      setShowTypewriter(true);
      let msg = 'Signal stabilized. Access node verified.';
      let i = 0;
      setTypewriterMsg('');
      const interval = setInterval(() => {
        setTypewriterMsg((m) => m + msg[i]);
        i++;
        if (i >= msg.length) {
          clearInterval(interval);
          setTimeout(() => navigate('/matrix-v1/ghost-access'), 1200);
        }
      }, 32);
      return () => clearInterval(interval);
    }
  }, [status, attempts, navigate]);

  // Audio cues (TODO: add actual audio files)
  const playAudio = (type) => {
    // type: 'select', 'fail'
    // TODO: implement with real audio
    // if (audioRef.current) audioRef.current.play();
  };

  // Handle symbol selection
  const handleSelect = (sym) => {
    if (status || puzzlePhase !== 'guessing') return;
    if (selected.length >= sequence.length) return;
    const next = [...selected, sym];
    setSelected(next);
    playAudio('select');
    if (sym !== sequence[next.length - 1]) {
      setStatus('fail');
      setAttempts((a) => a + 1);
      playAudio('fail');
    } else if (next.length === sequence.length) {
      setStatus('success');
    }
  };

  // Handle backspace (undo)
  const handleBackspace = () => {
    if (status || puzzlePhase !== 'guessing' || selected.length === 0) return;
    setSelected(selected.slice(0, -1));
  };

  // Keyboard support for backspace
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Backspace') {
        handleBackspace();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center matrix-gradient-purple font-mono relative overflow-hidden ${flicker ? 'animate-flicker' : ''}`}>
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <NPC
          name="Morpheus"
          quote="You must re-sequence the signal before the trace resumes. Focus. You've done this before."
          style="mentor"
        />
        {/* Sequence display with animation */}
        {puzzlePhase === 'showing' && (
          <div className={`flex space-x-4 text-4xl transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} data-testid="sequence-display">
            {sequence.map((s, i) => (
              <span key={i} className={`inline-block transition-all duration-300 ${sequenceStep >= i ? 'scale-110 text-white' : 'scale-90 text-gray-700 opacity-40'}`}>{s}</span>
            ))}
          </div>
        )}
        {/* Ready button after sequence */}
        {puzzlePhase === 'waiting' && (
          <button
            className="px-6 py-2 rounded bg-green-800 text-green-200 hover:bg-green-700 text-xl font-bold shadow-lg animate-fade-in"
            style={{ minWidth: 180 }}
            onClick={() => setPuzzlePhase('guessing')}
          >
            Ready?
          </button>
        )}
        {/* Symbol grid */}
        {puzzlePhase === 'guessing' && (
          <>
            <div className="grid grid-cols-4 gap-4" data-testid="symbol-grid">
              {grid.map((s, i) => {
                const isSelected = selected.includes(s) && selected.indexOf(s) === selected.length - 1;
                return (
                  <button
                    key={i}
                    data-symbol={s}
                    onClick={() => handleSelect(s)}
                    className={`text-3xl border-2 rounded-lg px-4 py-2 transition-all duration-150 focus:outline-none
                      ${selected.includes(s) ? 'border-green-400 bg-green-100 text-black scale-105 shadow-lg' : 'border-white bg-black/30 text-white hover:scale-110 hover:shadow-green-400/40'}
                      ${isSelected ? 'ring-4 ring-green-400' : ''}
                      ${invalid ? 'border-red-500 bg-red-900/40 text-red-200 animate-pulse' : ''}`}
                    style={{ filter: isSelected ? 'drop-shadow(0 0 8px #00ff00)' : undefined }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="flex space-x-2 mt-4 text-2xl">
              {selected.map((s, i) => (
                <span key={i} className="inline-block px-2 py-1 bg-green-900/60 rounded shadow text-green-200 animate-fade-in">{s}</span>
              ))}
              {Array(sequence.length - selected.length).fill(0).map((_, i) => (
                <span key={i} className="inline-block px-2 py-1 bg-gray-800/60 rounded shadow text-gray-400">?</span>
              ))}
            </div>
            <div className="text-sm text-gray-300 mt-2">Attempts left: {3 - attempts}</div>
            <div className="text-xs text-gray-400 mt-1">Backspace to undo</div>
          </>
        )}
        {/* Feedback */}
        {status === 'fail' && (
          <div className="text-red-300 animate-pulse text-lg mt-2" data-testid="fail-msg">
            Incorrect sequence
          </div>
        )}
        {/* Typewriter message on success */}
        {showTypewriter && (
          <div className="text-green-300 text-lg mt-2 font-mono animate-fade-in" data-testid="success-msg">
            {typewriterMsg}
          </div>
        )}
      </div>
    </div>
  );
}
