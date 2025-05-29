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
import Updates from './components/Updates';
import Home from './components/Home';
// Matrix V1 Pages
import Entry from './pages/matrix-v1/Entry';
import Terminal from './pages/matrix-v1/Terminal';
import Checkpoint from './pages/matrix-v1/Checkpoint';
import Message from './pages/matrix-v1/Message';
import Puzzle from './pages/matrix-v1/Puzzle';
import Trace from './pages/matrix-v1/Trace';
import Observer from './pages/matrix-v1/Observer';
import Stage1 from './pages/matrix-v1/Stage1';
import Stage2 from './pages/matrix-v1/Stage2';
import Stage3 from './pages/matrix-v1/Stage3';
import GuardianCall from './pages/matrix-v1/GuardianCall';
import PathA from './pages/matrix-v1/PathA';
import PathB from './pages/matrix-v1/PathB';
import DeeperProfile from './pages/matrix-v1/DeeperProfile';
import Map from './pages/matrix-v1/Map';
import Interference from './pages/matrix-v1/Interference';
import PathBGlitch from './pages/matrix-v1/PathBGlitch';
import Factions from './pages/matrix-v1/Factions';
import Align from './pages/matrix-v1/Align';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white pt-16 relative">
          <Navigation />
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snack-trail" element={<SnackTrailPage />} />
            <Route path="/pixel-art" element={<PixelArtMaker />} />
            <Route path="/robot-lab" element={<RobotLab />} />
            <Route path="/lego-build" element={<LegoBuildMode />} />
            <Route path="/lego-inventory" element={<LegoInventory />} />
            <Route path="/rc-plane" element={<RCPlaneDesigner />} />
            <Route path="/little-alchemy" element={<LittleAlchemy />} />
            <Route path="/updates" element={<Updates />} />
            {/* Matrix V1 Routes */}
            <Route path="/matrix-v1" element={<Entry />} />
            <Route path="/matrix-v1/terminal" element={<Terminal />} />
            <Route path="/matrix-v1/checkpoint" element={<Checkpoint />} />
            <Route path="/matrix-v1/message" element={<Message />} />
            <Route path="/matrix-v1/puzzle" element={<Puzzle />} />
            <Route path="/matrix-v1/trace" element={<Trace />} />
            <Route path="/matrix-v1/observer" element={<Observer />} />
            <Route path="/matrix-v1/stage-1" element={<Stage1 />} />
            <Route path="/matrix-v1/stage-2" element={<Stage2 />} />
            <Route path="/matrix-v1/stage-3" element={<Stage3 />} />
            <Route path="/matrix-v1/guardian-call" element={<GuardianCall />} />
            <Route path="/matrix-v1/compliance-route" element={<PathA />} />
            <Route path="/matrix-v1/anomaly-route" element={<PathB />} />
            <Route path="/matrix-v1/map" element={<Map />} />
            <Route path="/matrix-v1/deeper-profile" element={<DeeperProfile />} />
            <Route path="/matrix-v1/interference" element={<Interference />} />
            <Route path="/matrix-v1/path-b-glitch" element={<PathBGlitch />} />
            <Route path="/matrix-v1/factions" element={<Factions />} />
            <Route path="/matrix-v1/align-:slug" element={<Align />} />
            {/* Legacy Matrix Routes - Redirect to V1 */}
            <Route path="/the-matrix/*" element={<Navigate to="/matrix-v1" replace />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
