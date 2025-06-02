import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from './UserIcon';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../theme/ThemeContext';
import {
  FaRoad,
  FaPaintBrush,
  FaRobot,
  FaCube,
  FaBox,
  FaFlask,
  FaCodeBranch,
  FaPaperPlane,
  FaBug,
  FaCompass
} from 'react-icons/fa';

export const navItems = [
  { name: 'The Trail',      path: '/snack-trail',      color: 'bg-yellow-400 text-black', icon: FaRoad },
  { name: 'Pixel Lab',      path: '/pixel-art',        color: 'bg-blue-500', icon: FaPaintBrush },
  { name: 'Robot Room',     path: '/robot-lab',        color: 'bg-green-500', icon: FaRobot },
  { name: 'Build Mode',     path: '/lego-build',       color: 'bg-red-500', icon: FaCube },
  { name: 'Inventory',      path: '/lego-inventory',   color: 'bg-yellow-600', icon: FaBox },
  { name: 'Alchemy',        path: '/little-alchemy',   color: 'bg-cyan-500', icon: FaFlask },
  { name: 'The Matrix',     path: '/matrix-v1',        color: 'bg-green-700 text-black', icon: FaCodeBranch },
  { name: 'Story Map',      path: '/matrix-v1/map',    color: 'bg-purple-500', icon: FaCompass }
];

export default function Navigation() {
  const { pathname } = useLocation();
  const { currentWorld } = useTheme();

  // World display mappings
  const worldDisplays = {
    'matrix': { icon: '💊', label: 'MATRIX', color: 'text-green-400 border-green-400' },
    'witcher': { icon: '⚔️', label: 'WITCHER', color: 'text-amber-400 border-amber-400' },
    'nightcity': { icon: '🌆', label: 'NIGHT_CITY', color: 'text-purple-400 border-purple-400' },
    'cyberpunk': { icon: '🌆', label: 'NIGHT_CITY', color: 'text-purple-400 border-purple-400' } // Legacy support
  };

  const worldDisplay = worldDisplays[currentWorld] || worldDisplays.matrix;

  return (
    <div className="fixed top-2 left-0 right-0 z-[100] navigation-container">
      <div className="px-4">
        <nav className="flex w-max gap-2 bg-white/80 backdrop-blur-md shadow-xl rounded-full px-4 py-3 mx-auto items-center relative">
          {navItems.map(({ name, path, color, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm px-3 py-1 rounded-full font-semibold whitespace-nowrap hover:scale-105 transition-all duration-200 ${
                pathname === path ? `${color} shadow-md` : 'bg-gray-200 text-gray-700'
              }`}
            >
              {Icon && <Icon className="inline mr-1" />}
              {name}
            </Link>
          ))}
          
          {/* World Debug Indicator */}
          <div className="ml-2 pl-2 border-l border-gray-300 relative">
            <div 
              className={`px-2 py-1 rounded-md text-xs font-mono border backdrop-blur-sm bg-black/10 ${worldDisplay.color}`}
              title={`Current World: ${currentWorld}`}
            >
              <span className="mr-1">{worldDisplay.icon}</span>
              <span>{worldDisplay.label}</span>
            </div>
          </div>
          
          {/* Theme Toggle - Positioned to allow dropdown overflow */}
          <div className="relative">
            <ThemeToggle />
          </div>
        </nav>
      </div>
      <UserIcon />
    </div>
  );
}
