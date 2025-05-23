import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './components/UserContext';

import Navigation from './components/Navigation';
import SnackTrailPage from './components/SnackTrailPage';

import PixelArtMaker from './components/PixelArtMaker';
import RobotLab from './components/RobotLab';
import LegoBuildMode from './components/LegoBuildMode';
import LegoInventory from './components/LegoInventory';
import LittleAlchemy from './components/LittleAlchemy';
import TheMatrix from './components/TheMatrix';
import MatrixTransition from './components/MatrixTransition';
import MatrixTerminal   from './components/MatrixTerminal';
import MatrixPortal     from './components/MatrixPortal';


export default function App() {
  return (
    <UserProvider>
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
          <Route path="/the-matrix" element={<TheMatrix />} />
          <Route path="/the-matrix/terminal"   element={<MatrixTerminal   />} />
          <Route path="/the-matrix/transition" element={<MatrixTransition />} />
          <Route path="/the-matrix/portal"     element={<MatrixPortal     />} />

          <Route path="*" element={<Navigate to="/snack-trail" />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}
