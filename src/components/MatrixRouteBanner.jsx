import React from 'react';

export default function MatrixRouteBanner({ title, subtitle }) {
  return (
    <div className="w-full bg-theme-secondary text-theme-primary px-4 py-2 shadow-md flex flex-col items-center">
      <h1 className="text-xl font-bold heading-theme">{title}</h1>
      {subtitle && <p className="text-sm text-theme-muted">{subtitle}</p>}
    </div>
  );
}
