import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './components/UserContext';

import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import SnackTrailPage from './components/SnackTrailPage';

import PixelArtMaker from './components/PixelArtMaker';
import RobotLab from './components/RobotLab';
import LegoBuildMode from './components/LegoBuildMode';
import LegoInventory from './components/LegoInventory';
import LittleAlchemy from './components/LittleAlchemy';
import RCPlaneDesigner from './components/RCPlaneDesigner';
import TheMatrix from './components/TheMatrix';
import MatrixTransition from './components/MatrixTransition';
import MatrixTerminal   from './components/MatrixTerminal';
import MatrixPortal     from './components/MatrixPortal';
import Updates from './components/Updates';

// Matrix v1 pages
import Entry from './pages/matrix-v1/Entry';
import Terminal from './pages/matrix-v1/Terminal';
import Transition from './pages/matrix-v1/Transition';
import Message from "./pages/matrix-v1/Message";
import Puzzle from './pages/matrix-v1/Puzzle';
import Trace from "./pages/matrix-v1/Trace";
import Portal from './pages/matrix-v1/Portal';


export default function App() {
  return (
    <UserProvider>
                <Router>
        <div className="min-h-screen bg-gray-900 text-white pt-16 relative">
          <Navigation />
          <Breadcrumbs />
                    <Routes>
                    <Route path="/snack-trail" element={<SnackTrailPage />} />
                    <Route path="/pixel-art" element={<PixelArtMaker />} />
                    <Route path="/robot-lab" element={<RobotLab />} />
                    <Route path="/lego-build" element={<LegoBuildMode />} />
                    <Route path="/lego-inventory" element={<LegoInventory />} />
                    <Route path="/rc-plane" element={<RCPlaneDesigner />} />
                    <Route path="/little-alchemy" element={<LittleAlchemy />} />
                    <Route path="/updates" element={<Updates />} />
                    <Route path="/the-matrix" element={<TheMatrix />} />
                    <Route path="/the-matrix/terminal"   element={<MatrixTerminal   />} />
                    <Route path="/the-matrix/transition" element={<MatrixTransition />} />
                    <Route path="/the-matrix/portal"     element={<MatrixPortal     />} />

          {/* Matrix v1 journey */}
                    <Route path="/matrix-v1" element={<Entry />} />
                    <Route path="/matrix-v1/terminal" element={<Terminal />} />
                    <Route path="/matrix-v1/transition" element={<Transition />} />
          <Route path="/matrix-v1/message" element={<Message />} />
                    <Route path="/matrix-v1/puzzle" element={<Puzzle />} />
          <Route path="/matrix-v1/trace" element={<Trace />} />
                    <Route path="/matrix-v1/portal" element={<Portal />} />

                    <Route path="*" element={<Navigate to="/snack-trail" />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}
