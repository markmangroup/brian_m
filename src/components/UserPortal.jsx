import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './Navigation';

export default function UserPortal() {
  return (
    <div className="pt-20 px-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 max-w-md mx-auto">
        {navItems.map(({ name, path, color }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center justify-center w-20 h-20 rounded-full text-center text-sm font-semibold shadow-lg hover:scale-110 transition-transform duration-300 ${color} animate-float`}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
