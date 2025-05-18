import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'The Trail',      path: '/snack-trail',      color: 'bg-yellow-400 text-black' },
  { name: 'Pixel Lab',      path: '/pixel-art',        color: 'bg-blue-500' },
  { name: 'Robot Room',     path: '/robot-lab',        color: 'bg-green-500' },
  { name: 'Build Mode',     path: '/lego-build',       color: 'bg-red-500' },
  { name: 'Inventory',      path: '/lego-inventory',   color: 'bg-yellow-600' },
  { name: 'Alchemy',        path: '/little-alchemy',   color: 'bg-cyan-500' },
  { name: 'The Matrix',     path: '/the-matrix',       color: 'bg-green-700 text-black' }
];

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-2 left-0 right-0 z-50">
      <div className="overflow-x-auto px-4">
        <nav className="flex w-max gap-2 bg-white/80 backdrop-blur-md shadow-xl rounded-full px-4 py-2 mx-auto">
          {navItems.map(({ name, path, color }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm px-3 py-1 rounded-full font-semibold whitespace-nowrap hover:scale-105 transition-all duration-200 ${
                pathname === path ? `${color} shadow-md` : 'bg-gray-200 text-gray-700'
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
