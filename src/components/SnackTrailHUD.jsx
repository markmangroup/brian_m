import React, { useState } from 'react';
import LoreDrawer from './LoreDrawer';

export default function SnackTrailHUD({ children }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState('lore');

  const toggleDrawer = () => setOpen(!open);
  const changeSection = (target) => {
    setSection(target);
    setOpen(true);
  };

  return (
    <div className="relative w-full">
      {/* Left HUD menu */}
      <div className="fixed top-20 left-2 z-50 flex flex-col gap-2 bg-white/20 backdrop-blur-md rounded-lg p-2 shadow-md">
        <button onClick={() => changeSection('lore')} className="text-sm rounded-full px-3 py-1 hover:bg-white/30">📖</button>
        <button onClick={() => changeSection('runners')} className="text-sm rounded-full px-3 py-1 hover:bg-white/30">🏃</button>
        <button onClick={() => changeSection('log')} className="text-sm rounded-full px-3 py-1 hover:bg-white/30">🗒️</button>
      </div>

      {/* Side Drawer */}
      {open && (
        <div className="fixed top-0 left-14 bottom-0 w-64 z-40 bg-white text-black rounded-r-xl shadow-xl overflow-y-auto">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-bold capitalize">{section || 'Section'}</h2>
            <button onClick={toggleDrawer} className="text-xl font-bold">×</button>
          </div>
          <div className="p-4 text-sm">
            <LoreDrawer section={section || 'lore'} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="pt-2 pl-20">
        {children}
      </div>
    </div>
  );
}