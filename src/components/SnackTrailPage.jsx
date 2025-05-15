import React, { useState } from 'react';
import SnackTrail from './SnackTrail';
import LoreDrawer from './LoreDrawer';

export default function SnackTrailPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [section, setSection] = useState('lore');

  const toggleDrawer = (target) => {
    if (section === target && drawerOpen) {
      setDrawerOpen(false);
    } else {
      setSection(target);
      setDrawerOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Menu */}
      <div className="flex flex-col gap-2 p-2 pt-20 bg-white/20 backdrop-blur-md shadow-md z-40">
        <button onClick={() => toggleDrawer('lore')} className={`rounded px-3 py-1 ${section === 'lore' && drawerOpen ? 'bg-white/30' : ''}`}>📖</button>
        <button onClick={() => toggleDrawer('runners')} className={`rounded px-3 py-1 ${section === 'runners' && drawerOpen ? 'bg-white/30' : ''}`}>🏃</button>
        <button onClick={() => toggleDrawer('log')} className={`rounded px-3 py-1 ${section === 'log' && drawerOpen ? 'bg-white/30' : ''}`}>🗒️</button>
      </div>

      {/* Collapsible Drawer */}
      {drawerOpen && (
        <div className="w-64 bg-white text-black rounded-r-xl shadow-xl overflow-y-auto">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-bold capitalize">{section}</h2>
            <button onClick={() => setDrawerOpen(false)} className="text-xl font-bold">×</button>
          </div>
          <div className="p-4 text-sm pr-6">
            <LoreDrawer section={section} />
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <div className="flex-1 px-4 pt-4">
        <SnackTrail />
      </div>
    </div>
  );
}