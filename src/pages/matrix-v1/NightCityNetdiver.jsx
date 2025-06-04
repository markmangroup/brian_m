import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

export default function NightCityNetdiver() {
  const navigate = useNavigate();
  const { setWorld } = useTheme();

  useEffect(() => {
    // Ensure Night City theme is active
    setWorld('nightcity');
  }, [setWorld]);

  const proceedToFile = () => {
    const progress = JSON.parse(localStorage.getItem('matrixProgress') || '{}');
    progress.completedNodes = [...(progress.completedNodes || []), 'nc-netdiver'];
    localStorage.setItem('matrixProgress', JSON.stringify(progress));
    navigate('/matrix-v1/night-city/file');
  };

  return (
    <div className="min-h-screen text-white p-6 font-mono bg-gradient-to-br from-purple-950 via-black to-pink-950">
      <div className="max-w-xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
          🧠 Netrunner Dive
        </h1>
        <p className="text-gray-300">
          Jacked in to the Afterlife&apos;s secret network, data streams swirl around you.
          Time to snag the target file before security traces your signal.
        </p>
        <button
          onClick={proceedToFile}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Hack the Data Vault
        </button>
      </div>
    </div>
  );
}
