import React, { useState, useEffect } from 'react';
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
  const [showSequence, setShowSequence] = useState(true);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null); // 'success' | 'fail'

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') !== 'true') {
      navigate('/matrix-v1/terminal');
    }
  }, [navigate]);

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
    const t = setTimeout(() => setShowSequence(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const reset = () => {
    setSelected([]);
    setStatus(null);
  };

  useEffect(() => {
    if (status === 'fail') {
      const t = setTimeout(() => {
        if (attempts >= 3) {
          navigate('/matrix-v1/error-loop');
        } else {
          reset();
        }
      }, 1000);
      return () => clearTimeout(t);
    }
    if (status === 'success') {
      const t = setTimeout(() => {
        try {
          localStorage.setItem('currentNodeId', 'stabilize');
          const visited = JSON.parse(localStorage.getItem('visitedNodes') || '[]');
          if (!visited.includes('stabilize')) {
            visited.push('stabilize');
            localStorage.setItem('visitedNodes', JSON.stringify(visited));
          }
        } catch {}
        navigate('/matrix-v1/ghost-access');
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [status, attempts, navigate]);

  const handleSelect = (sym) => {
    if (status || showSequence) return;
    const next = [...selected, sym];
    setSelected(next);
    if (sym !== sequence[next.length - 1]) {
      setStatus('fail');
      setAttempts((a) => a + 1);
    } else if (next.length === sequence.length) {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center matrix-gradient-purple font-mono relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <NPC
          name="Morpheus"
          quote="You must re-sequence the signal before the trace resumes. Focus. You've done this before."
          style="mentor"
        />
        {showSequence ? (
          <div className="flex space-x-4 text-4xl" data-testid="sequence-display">
            {sequence.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4" data-testid="symbol-grid">
            {grid.map((s, i) => (
              <button
                key={i}
                data-symbol={s}
                onClick={() => handleSelect(s)}
                className={`text-3xl border border-white rounded px-2 hover:bg-white/20 ${selected[i] ? 'bg-white text-black' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {status === 'fail' && (
          <div className="text-red-300 animate-pulse" data-testid="fail-msg">
            Incorrect sequence
          </div>
        )}
        {status === 'success' && (
          <div className="text-green-300" data-testid="success-msg">
            Signal stabilized. Node verified.
          </div>
        )}
        {!showSequence && <div className="text-sm">Attempts left: {3 - attempts}</div>}
      </div>
    </div>
  );
}
