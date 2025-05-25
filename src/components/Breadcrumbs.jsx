import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from './Navigation';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const to = '/' + segments.slice(0, idx + 1).join('/');
    const navItem = navItems.find((n) => n.path === to);
    const label = navItem ? navItem.name : seg.replace(/-/g, ' ');
    return { to, label };
  });

  return (
    <nav className="fixed top-14 left-0 right-0 z-40 px-4 py-2 bg-white/70 backdrop-blur-md shadow rounded-b-lg">
      <ol className="flex text-sm text-gray-700 space-x-2">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {crumbs.map(({ to, label }, idx) => (
          <li key={to} className="flex items-center space-x-2">
            <span>/</span>
            {idx === crumbs.length - 1 ? (
              <span className="font-semibold capitalize">{label}</span>
            ) : (
              <Link to={to} className="hover:underline capitalize">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
