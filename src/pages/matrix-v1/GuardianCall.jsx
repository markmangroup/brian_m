import React, { useEffect, useState } from 'react';
import MatrixRain from '../../components/MatrixRain';

const GRID = 3;

export default function GuardianCall() {
  const [pair, setPair] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('init'); // init, preview, select, success, fail
  const [already, setAlready] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('guardianLinked') === 'true') {
      setAlready(true);
    } else {
      startRound();
    }
  }, []);

  const startRound = () => {
    const total = GRID * GRID;
    let first = Math.floor(Math.random() * total);
    let second;
    do {
      second = Math.floor(Math.random() * total);
    } while (second === first);
    setPair([first, second]);
    setSelected([]);
    setStatus('preview');
    setHighlighted([first, second]);
    setTimeout(() => {
      setHighlighted([]);
      setStatus('select');
    }, 1000);
  };

  const handleSelect = (idx) => {
    if (status !== 'select' || selected.includes(idx) || already) return;
    const newSel = [...selected, idx];
    setSelected(newSel);
    if (newSel.length === 2) {
      const sorted = [...newSel].sort();
      const target = [...pair].sort();
      if (sorted[0] === target[0] && sorted[1] === target[1]) {
        setFlash(true);
        setStatus('success');
        localStorage.setItem('guardianLinked', 'true');
        setTimeout(() => setFlash(false), 500);
      } else {
        setStatus('fail');
      }
    }
  };

  const retry = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setSelected([]);
    setStatus('preview');
    setHighlighted(pair);
    setTimeout(() => {
      setHighlighted([]);
      setStatus('select');
    }, 1000);
  };

  const cells = [];
  for (let i = 0; i < GRID * GRID; i++) {
    const isH = highlighted.includes(i);
    const isS = selected.includes(i);
    cells.push(
      <button
        key={i}
        onClick={() => handleSelect(i)}
        disabled={already || status === 'success'}
        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 flex items-center justify-center border ${
          isH ? 'matrix-glow-purple' : 'border-gray-600'
        } ${isS ? 'matrix-glow-green' : ''}`}
        data-testid={`cell-${i}`}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Synchronize with Guardian</h1>
        <div className={`grid grid-cols-3 gap-2 p-4 ${flash ? 'flash-green' : ''} ${shake ? 'animate-shake' : ''}`}>{cells}</div>
        <p className="text-sm text-green-200">Identify the sync points</p>
        {status === 'success' && <p className="text-green-500">Guardian Link Established</p>}
        {already && <p className="text-green-500">Already Linked</p>}
        {status === 'fail' && !already && (
          <button onClick={retry} className="mt-2 px-4 py-2 rounded bg-green-900 text-green-500 hover:bg-green-800">
            Retry Sync
          </button>
        )}
      </div>
    </div>
  );
}

