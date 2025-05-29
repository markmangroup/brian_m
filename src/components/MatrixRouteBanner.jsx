import React from 'react';

export default function MatrixRouteBanner({ title, subtitle, status }) {
  return (
    <div className="w-full bg-gray-900 text-green-400 px-4 py-2 shadow-md flex flex-col items-center">
      <h1 className="text-xl font-bold text-green-500">{title}</h1>
      {subtitle && <p className="text-sm">{subtitle}</p>}
      {status && <span className="text-xs mt-1">{status}</span>}
    </div>
  );
}
