import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { navItems } from './Navigation';

export default function MatrixPortal() {
  const { state } = useLocation();
  const { userName } = useContext(UserContext);
  const name = state?.name || userName;
  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-4xl font-bold text-purple-400">Welcome, {name}</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {navItems
          .filter((item) => item.path !== '/the-matrix')
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
