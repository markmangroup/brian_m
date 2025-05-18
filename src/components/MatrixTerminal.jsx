
import { NAOE_QUOTES } from '../data/naoeQuotes';
import useTypewriterEffect from './useTypewriterEffect';
import { useNavigate } from 'react-router-dom';

export default function MatrixTerminal() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');


  const secret = 'thereisnospoon';

  // check localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem('matrixAccess');
    if (stored === 'true') {
      const quote = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
      setMessage(
        `Access granted. Welcome to the real world. ${quote.text} — ${quote.attribution}`
      );
      setHasAccess(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase() === secret) {

    } else {
      setMessage('Access denied. Try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('matrixAccess');
    setHasAccess(false);
    setMessage('');
    setCode('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono space-y-6">
      <h1 className="text-4xl font-bold">Matrix Terminal</h1>
      <p className="text-lg">You take the red pill and follow the white rabbit...</p>

      )}
    </div>
  );
}
