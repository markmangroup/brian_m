import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserIcon from './UserIcon';
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
  { name: 'The Trail',      path: '/snack-trail',      color: 'bg-yellow-400 text-black' },
  { name: 'Pixel Lab',      path: '/pixel-art',        color: 'bg-blue-500' },
  { name: 'Robot Room',     path: '/robot-lab',        color: 'bg-green-500' },
  { name: 'Build Mode',     path: '/lego-build',       color: 'bg-red-500' },
  { name: 'Inventory',      path: '/lego-inventory',   color: 'bg-yellow-600' },
  { name: 'Alchemy',        path: '/little-alchemy',   color: 'bg-cyan-500' },
  { name: 'The Matrix',     path: '/matrix-v1',        color: 'bg-green-700 text-black' },
  { name: 'Story Map',      path: '/matrix-v1/map',    color: 'bg-purple-500', icon: FaCompass }
];

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-2 left-0 right-0 z-50">
      <div className="overflow-x-auto px-4">
        <nav className="flex w-max gap-2 bg-white/80 backdrop-blur-md shadow-xl rounded-full px-4 py-2 mx-auto">
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
        </nav>
      </div>
      <UserIcon />
    </div>
  );
}
