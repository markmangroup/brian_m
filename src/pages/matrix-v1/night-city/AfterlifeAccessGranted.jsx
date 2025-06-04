import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../theme/ThemeContext';

export default function AfterlifeAccessGranted() {
  const { setWorld } = useTheme();

  useEffect(() => {
    setWorld('nightcity');
  }, [setWorld]);

  return (
    <div className="min-h-screen text-white p-6 font-mono bg-gradient-to-br from-purple-950 via-black to-pink-950">
      <div className="max-w-xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
          ✅ Access Granted
        </h1>
        <p className="text-gray-300">The bouncer steps aside, ushering you into the Afterlife.</p>
        <Link
          to="/matrix-v1/night-city/afterlife-interior"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Enter the Afterlife
        </Link>
      </div>
    </div>
  );
}
