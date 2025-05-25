import React, { useState, useEffect } from 'react';

export default function NPC({ name, quote, style = 'mentor', className = '' }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  let variant = '';
  if (style === 'oracle') {
    variant = 'border-purple-400 text-purple-200 italic shadow-[0_0_8px_#a855f7]';
  } else if (style === 'agent') {
    variant = 'border-red-600 text-red-400 animate-pulse';
  } else {
    variant = 'border-green-400 text-green-200 font-bold';
  }

  return (
    <div
      className={`transition-opacity duration-700 ${show ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      <div className="mb-1 text-sm uppercase tracking-wider">{name}</div>
      <div className={`bg-black/60 backdrop-blur-md border p-3 rounded-lg ${variant}`}>{quote}</div>
    </div>
  );
}
