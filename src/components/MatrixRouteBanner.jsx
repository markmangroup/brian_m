import React from 'react';
import { useFactionDisplay } from '../hooks/useStoryProgress';

export default function MatrixRouteBanner({ title, subtitle }) {
  const factionData = useFactionDisplay();

  return (
    <div className="w-full bg-theme-secondary text-theme-primary px-4 py-2 shadow-md flex flex-col items-center relative">
      <h1 className="text-xl font-bold heading-theme">{title}</h1>
      {subtitle && <p className="text-sm text-theme-muted">{subtitle}</p>}
      
      {/* Faction Badge */}
      {factionData && (
        <div className={`
          absolute top-2 right-4 px-3 py-1 rounded-full text-xs font-mono border
          ${factionData.badge}
        `}>
          <span className="mr-1" aria-hidden="true">{factionData.icon}</span>
          <span>{factionData.name}</span>
        </div>
      )}
    </div>
  );
}
