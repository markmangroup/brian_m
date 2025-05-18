import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';

export default function MatrixTerminal() {
  const { userName }     = useContext(UserContext);
  const [code, setCode]   = useState('');
  const [msg,  setMsg]    = useState('');
  const [ok,   setOk]     = useState(false);
  const navigate          = useNavigate();
  const location          = useLocation();
  const secret            = 'thereisnospoon';
  const stateName         = location.state?.name || userName;
  const [typedMsg, typedMsgDone] = useTypewriterEffect(msg, 50);

  /* restore previous access */
  useEffect(() => {
    if (localStorage.getItem('matrixAccess') === 'true') {
      grant();
    }
  }, []);

  const grant = () => {
    const q   = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
    setMsg(`Access granted. Welcome to the real world. ${q.text} — ${q.attribution}`);
    setOk(true);
    localStorage.setItem('matrixAccess', 'true');
    setTimeout(() =>
      navigate('/the-matrix/transition', { state: { name: stateName } }),
    2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    code.trim().toLowerCase() === secret ? grant() : setMsg('Access denied. Try again.');
  };

  const logout = () => {
    localStorage.removeItem('matrixAccess');
    setOk(false);
    setCode('');
    setMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6">
      <h1 className="text-4xl font-bold">Matrix Terminal</h1>

      {!ok && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
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
  );
}
