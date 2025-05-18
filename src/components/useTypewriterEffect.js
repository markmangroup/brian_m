import { useState, useEffect } from 'react';

export default function useTypewriterEffect(fullText = '', speed = 50) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setText('');
    setDone(false);
    if (!fullText) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed]);

  return [text, done];
}
