import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import PixelArtMaker   from './components/PixelArtMaker';
import RobotLab        from './components/RobotLab';
import LegoBuilder     from './components/LegoBuilder';
import LegoInventory   from './components/LegoInventory';
import LittleAlchemy   from './components/LittleAlchemy';
import SnackTrail from './features/SnackTrail/SnackTrail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* NAV BAR */}
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex flex-wrap gap-4">
            <Link to="/pixel-art"      className="px-4 py-2 rounded-full bg-blue-600   hover:bg-blue-500   transition-colors">Pixel Art</Link>
            <Link to="/robot-lab"      className="px-4 py-2 rounded-full bg-green-600  hover:bg-green-500  transition-colors">Robot Lab</Link>
            <Link to="/lego-builder"   className="px-4 py-2 rounded-full bg-red-600    hover:bg-red-500    transition-colors">LEGO Builder</Link>
            <Link to="/lego-inventory" className="px-4 py-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors">LEGO Inventory</Link>
            <Link to="/little-alchemy" className="px-4 py-2 rounded-full bg-cyan-600   hover:bg-cyan-500   transition-colors">Little Alchemy</Link>
            <Link to="/snack-trail"    className="px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black transition-colors">Snack Trail</Link> {/* NEW */}
          </div>
        </nav>

        {/* ROUTES */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/pixel-art"      element={<PixelArtMaker />} />
            <Route path="/robot-lab"      element={<RobotLab />} />
            <Route path="/lego-builder"   element={<LegoBuilder />} />
            <Route path="/lego-inventory" element={<LegoInventory />} />
            <Route path="/little-alchemy" element={<LittleAlchemy />} />
            <Route path="/snack-trail"    element={<SnackTrail />} /> {/* NEW */}
            <Route path="/"               element={<RobotLab />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;