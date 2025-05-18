import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './Navigation';

export default function MatrixPortal() {
  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-4xl font-bold text-purple-400">Matrix Portal</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {navItems
          .filter(item => item.path !== '/portal')
          .map(({ name, path, color }) => (
            <Link
              key={path}
              to={path}
              className={`block py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform ${color}`}
            >
              {name}
            </Link>
          ))}
      </div>
    </div>
  );
}
