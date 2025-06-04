import React from 'react';

export default function AnimationPicker({ mode, onChange }) {
  const options = [
    { id: 'tiles', label: 'Tiles' },
    { id: 'bars', label: 'Bars' },
    { id: 'nodes', label: 'Nodes' },
  ];
  return (
    <div className="flex space-x-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${mode === opt.id ? 'bg-theme-accent text-theme-inverse' : 'bg-theme-secondary text-theme-muted'}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
