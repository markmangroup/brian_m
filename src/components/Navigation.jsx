import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'The Trail',      path: '/snack-trail',      color: 'bg-yellow-400 text-black' },
  { name: 'Pixel Lab',      path: '/pixel-art',        color: 'bg-blue-500' },
  { name: 'Robot Room',     path: '/robot-lab',        color: 'bg-green-500' },
  { name: 'Build Mode',     path: '/lego-build',       color: 'bg-red-500' },
  { name: 'Inventory',      path: '/lego-inventory',   color: 'bg-yellow-600' },
  { name: 'Alchemy',        path: '/little-alchemy',   color: 'bg-cyan-500' }
];

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-md shadow-xl rounded-full px-4 py-2 flex gap-2 z-50">
      {navItems.map(({ name, path, color }) => (
        <Link
          key={path}
          to={path}
          className={`text-sm px-3 py-1 rounded-full font-semibold hover:scale-105 transition-all duration-200 whitespace-nowrap ${
            pathname === path ? `${color} shadow-md` : 'bg-gray-200 text-gray-700'
          }`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}