import React, { useState } from 'react';
import LoreDrawer from './LoreDrawer';

export default function SnackTrailHUD({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-2 right-2 text-sm px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 z-10"
      >
        ?
      </button>

      <LoreDrawer open={open} onClose={() => setOpen(false)} />

      <div className="pt-10">{children}</div>
    </div>
  );
}