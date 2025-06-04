import React from 'react';

export default function ProgressBar({ value = 0, max = 100, color = 'bg-blue-500', label, style = {} }) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%`, ...style }}
        ></div>
      </div>
      {label && (
        <div className="text-center text-xs text-gray-500 mt-1">
          {label}
        </div>
      )}
    </div>
  );
}
