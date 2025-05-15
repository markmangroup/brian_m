import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation';
import SnackTrailPage from './components/SnackTrailPage';

import PixelArtMaker from './components/PixelArtMaker';
import RobotLab from './components/RobotLab';
import LegoBuildMode from './components/LegoBuildMode';
import LegoInventory from './components/LegoInventory';
import LittleAlchemy from './components/LittleAlchemy';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white pt-16 relative">
        <Navigation />
        <Routes>
          <Route path="/snack-trail" element={<SnackTrailPage />} />
          <Route path="/pixel-art" element={<PixelArtMaker />} />
          <Route path="/robot-lab" element={<RobotLab />} />
          <Route path="/lego-build" element={<LegoBuildMode />} />
          <Route path="/lego-inventory" element={<LegoInventory />} />
          <Route path="/little-alchemy" element={<LittleAlchemy />} />
          <Route path="*" element={<Navigate to="/snack-trail" />} />
        </Routes>
      </div>
    </Router>
  );
}