import React from 'react';

export default function MatrixRouteBanner({ title, subtitle, status, icon }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-start w-full px-4 py-2 bg-black/80 border-b-2 border-green-500 shadow-[0_0_6px_#00ff00]">
        {icon && (
          <span className="mr-2 text-xl" aria-hidden="true">{icon}</span>
        )}
        <div className="flex-1">
          {title && (
            <h1 className="text-lg font-mono text-green-400 animate-glow-green">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-gray-400 leading-none">{subtitle}</p>
          )}
        </div>
        {status && (
          <span className="ml-2 text-xs text-green-300 whitespace-nowrap">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}
