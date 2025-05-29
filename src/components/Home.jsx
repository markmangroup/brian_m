import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './Navigation';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixRain from './MatrixRain';

export default function Home() {
  const [welcomeText] = useTypewriterEffect('Welcome to Brian\'s Playground', 50);
  const [promptText] = useTypewriterEffect('Choose your destination', 50);

  return (
    <div className="p-8 text-center space-y-6 min-h-screen relative overflow-hidden">
      {typeof window !== 'undefined' && (
        <MatrixRain zIndex={0} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      )}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400 font-mono">{welcomeText}</h1>
        <p className="text-lg text-green-200 font-mono">{promptText}</p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {navItems.map(({ name, path, color, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-6 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform ${color}`}
            >
              {Icon && <Icon className="mb-2 text-2xl" />}
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
