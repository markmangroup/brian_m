import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './Navigation';
import useTypewriterEffect from './useTypewriterEffect';
import MatrixLayout from './MatrixLayout';

export default function Home() {
  const [welcomeText] = useTypewriterEffect('Welcome to Brian\'s Playground', 50);
  const [promptText] = useTypewriterEffect('Choose your destination', 50);

  return (
    <MatrixLayout centered={false} contentClassName="p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold heading-theme animate-theme-glow">
          {welcomeText}
        </h1>
        <p className="text-lg subheading-theme">
          {promptText}
        </p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {navItems.map(({ name, path, color, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-6 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform focus-matrix ${color}`}
              aria-label={`Navigate to ${name}`}
            >
              {Icon && (
                <Icon 
                  className="mb-2 text-2xl" 
                  aria-hidden="true"
                />
              )}
              {name}
            </Link>
          ))}
        </div>
      </div>
    </MatrixLayout>
  );
}
