import React from 'react';

export default function ResourcePanel({ title, children, className = '' }) {
  return (
    <div className={`bg-green-900/20 border border-green-400/30 rounded-lg p-4 ${className}`}>
      {title && <h3 className="text-green-400 font-bold mb-2">{title}</h3>}
      <div className="text-gray-300 text-sm">
        {children}
      </div>
    </div>
  );
}
