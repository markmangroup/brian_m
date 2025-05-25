import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { NAOE_QUOTES } from '../../data/naoeQuotes';
import Rain from './components/Rain';

export default function Terminal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const name = state?.name || localStorage.getItem('matrixV1Name');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const secret = 'thereisnospoon';
  const [typedMsg] = useTypewriterEffect(msg, 50);

  useEffect(() => {
    if (localStorage.getItem('matrixV1Access') === 'true') {
      grant();
    }
  }, []);

  const grant = () => {
    const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
    setMsg(`Access granted. ${q.text} — ${q.attribution}`);
    setOk(true);
    localStorage.setItem('matrixV1Access', 'true');
    setTimeout(() => navigate('/matrix-v1/transition', { state: { name } }), 2500);
  };

  const submit = (e) => {
    e.preventDefault();
    code.trim().toLowerCase() === secret
      ? grant()
      : setMsg('Access Denied');
  };

  const logout = () => {
    localStorage.removeItem('matrixV1Access');
    setOk(false);
    setCode('');
    setMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6 relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
        <h1 className="text-4xl font-bold">Matrix Terminal</h1>
        {!ok && (
          <form onSubmit={submit} className="flex space-x-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="enter passcode"
              className="px-4 py-2 rounded bg-black border border-green-700 text-green-500 placeholder-green-700 focus:outline-none"
            />
            <button className="px-4 py-2 rounded bg-green-700 text-black hover:bg-green-600">
              Hack
            </button>
          </form>
        )}
        {msg && <p className="text-lg text-center max-w-md">{typedMsg}</p>}
        {ok && (
          <button onClick={logout} className="text-sm underline text-green-400">
            log out
          </button>
        )}
      </div>
    </div>
  );
}
