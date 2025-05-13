import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Gimkit from './components/Gimkit';
import PixelArtMaker from './components/PixelArtMaker';
import RobotLab from './components/RobotLab';
import LegoBuildMode from './components/LegoBuildMode';
import LegoInventory from './components/LegoInventory';
import LittleAlchemy from './components/LittleAlchemy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex flex-wrap gap-4">
            <NavLink
              to="/gimkit"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`
              }
            >
              Gimkit
            </NavLink>
            <Link to="/pixel-art" className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors">
              Pixel Art
            </Link>
            <Link to="/robot-lab" className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors">
              Robot Lab
            </Link>
            <Link to="/lego-build" className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition-colors">
              Build Mode
            </Link>
            <Link to="/lego-inventory" className="px-4 py-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors">
              Inventory
            </Link>
            <Link to="/little-alchemy" className="px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors">
              Little Alchemy
            </Link>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/gimkit" element={<Gimkit />} />
            <Route path="/pixel-art" element={<PixelArtMaker />} />
            <Route path="/robot-lab" element={<RobotLab />} />
            <Route path="/lego-build" element={<LegoBuildMode />} />
            <Route path="/lego-inventory" element={<LegoInventory />} />
            <Route path="/little-alchemy" element={<LittleAlchemy />} />
            <Route path="/" element={<Gimkit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 