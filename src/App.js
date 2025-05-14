import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import PixelArtMaker   from './components/PixelArtMaker';
import RobotLab        from './components/RobotLab';
import LegoBuildMode   from './components/LegoBuildMode';
import LegoInventory   from './components/LegoInventory';
import LittleAlchemy   from './components/LittleAlchemy';
import SnackTrail      from './components/SnackTrail';          // ← NEW
import Login           from './components/Login';
import { FaSignOutAlt } from 'react-icons/fa';

/* ---------- PRIVATE ROUTE ---------- */
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* ---------- NAV BAR ---------- */}
      <nav className="bg-gray-800 p-4">
        {/* nowrap keeps pills on one row; overflow-x lets you swipe on tiny screens */}
        <div className="container mx-auto flex flex-nowrap overflow-x-auto gap-4 items-center">

          <NavLink
            to="/gimkit"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition-all ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`
            }
          >
            {/* Gimkit removed but kept route placeholder */}
          </NavLink>

          <Link to="/pixel-art"      className="px-3 py-1.5 rounded-full bg-blue-600   hover:bg-blue-500   transition-colors">Pixel Art</Link>
          <Link to="/robot-lab"      className="px-3 py-1.5 rounded-full bg-green-600  hover:bg-green-500  transition-colors">Robot Lab</Link>
          <Link to="/lego-build"     className="px-3 py-1.5 rounded-full bg-red-600    hover:bg-red-500    transition-colors">Build Mode</Link>
          <Link to="/lego-inventory" className="px-3 py-1.5 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors">Inventory</Link>
          <Link to="/little-alchemy" className="px-3 py-1.5 rounded-full bg-cyan-600   hover:bg-cyan-500   transition-colors">Little Alchemy</Link>
          <Link to="/snack-trail"    className="px-3 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black transition-colors">Snack Trail</Link>

          {currentUser && (
            <button
              onClick={logout}
              className="ml-auto px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ---------- ROUTES ---------- */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login"         element={<Login />} />
          <Route path="/gimkit"        element={<div />} />

          <Route path="/pixel-art"      element={<PrivateRoute><PixelArtMaker   /></PrivateRoute>} />
          <Route path="/robot-lab"      element={<PrivateRoute><RobotLab        /></PrivateRoute>} />
          <Route path="/lego-build"     element={<PrivateRoute><LegoBuildMode   /></PrivateRoute>} />
          <Route path="/lego-inventory" element={<PrivateRoute><LegoInventory   /></PrivateRoute>} />
          <Route path="/little-alchemy" element={<PrivateRoute><LittleAlchemy   /></PrivateRoute>} />
          <Route path="/snack-trail"    element={<PrivateRoute><SnackTrail      /></PrivateRoute>} />

          <Route path="/" element={<Navigate to="/gimkit" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;