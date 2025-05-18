import { useState, useEffect, useRef } from 'react';

export default function useTypewriterEffect(fullText = '', speed = 50) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const prevTextRef = useRef(fullText);
  const timeoutRef = useRef();

  useEffect(() => {
    if (prevTextRef.current === fullText) return;
    prevTextRef.current = fullText;
    setText('');
    setDone(false);
    if (!fullText) return;

    let index = 0;
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      index += 1;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(timeoutRef.current);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(timeoutRef.current);
  }, [fullText, speed]);

  return [text, done];
}
