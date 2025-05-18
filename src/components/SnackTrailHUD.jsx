import React, { useState } from 'react';
import LoreDrawer from './LoreDrawer';

export default function SnackTrailHUD({ children }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState('lore');

  const toggleDrawer = (target) => {
    if (section === target && open) {
      setOpen(false);
    } else {
      setSection(target);
      setOpen(true);
    }
  };

  return (
    <div className="relative w-full">
      {/* Left HUD menu */}
      <div className="fixed top-20 left-2 z-50 flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-lg p-2 shadow-md">
        <button onClick={() => toggleDrawer('lore')} className={`text-sm rounded-full px-3 py-1 hover:bg-white/30 ${section === 'lore' && open ? 'bg-white/30' : ''}`}>📖</button>
        <button onClick={() => toggleDrawer('runners')} className={`text-sm rounded-full px-3 py-1 hover:bg-white/30 ${section === 'runners' && open ? 'bg-white/30' : ''}`}>🏃</button>
        <button onClick={() => toggleDrawer('log')} className={`text-sm rounded-full px-3 py-1 hover:bg-white/30 ${section === 'log' && open ? 'bg-white/30' : ''}`}>🗒</button>
      </div>

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 bottom-0 left-0 z-40 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white text-black rounded-r-xl shadow-xl overflow-y-auto`}>
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-bold capitalize">{section}</h2>
          <button onClick={() => setOpen(false)} className="text-xl font-bold">×</button>
        </div>
        <div className="p-4 text-sm pr-6">
          <LoreDrawer section={section} />
        </div>
      </div>

      {/* Main Game Content */}
      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}
