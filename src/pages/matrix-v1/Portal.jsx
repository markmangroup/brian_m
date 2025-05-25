import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../components/Navigation';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import { NAOE_QUOTES } from '../../data/naoeQuotes';
import FlowDrawer from './components/FlowDrawer';
import Rain from './components/Rain';

export default function Portal() {
  const name = localStorage.getItem('matrixV1Name') || 'Traveler';
  const q = NAOE_QUOTES[Math.floor(Math.random() * NAOE_QUOTES.length)];
  const [welcomeText] = useTypewriterEffect(`Welcome, ${name}`, 50);
  const [quoteText] = useTypewriterEffect(`${q.text} — ${q.attribution}`, 50);

  return (
    <div className="p-8 text-center space-y-6 min-h-screen relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <Rain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-purple-400">{welcomeText}</h1>
        <p className="text-lg text-center max-w-md">{quoteText}</p>
        <p className="text-sm text-gray-300">Select a destination</p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {navItems
            .filter((item) => item.path !== '/the-matrix')
            .map(({ name, path, color, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-4 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform ${color}`}
              >
                {Icon && <Icon className="mb-1 text-xl" />}
                {name}
              </Link>
            ))}
        </div>
        <FlowDrawer />
      </div>
    </div>
  );
}
