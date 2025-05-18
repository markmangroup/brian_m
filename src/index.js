import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Optional: enable mobile debugging via #debug hash
if (window.location.hash === '#debug') {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';
  script.onload = () => window.eruda.init();
  document.body.appendChild(script);
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
