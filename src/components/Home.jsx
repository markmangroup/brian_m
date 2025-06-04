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

        {/* Primary Story Entry */}
        <div className="mb-8">
          <Link
            to="/start"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-purple-600 
                     hover:from-green-500 hover:to-purple-500 text-white font-bold py-4 px-8 
                     rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300
                     border border-white/20 hover:border-white/40 text-xl"
          >
            <span className="text-2xl">🌟</span>
            <span className="font-mono tracking-wider">BEGIN STORY</span>
            <span className="text-2xl">🌟</span>
          </Link>
          <p className="mt-3 text-sm text-gray-400 font-mono">
            Experience interactive narratives across multiple worlds
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-64"></div>
          <span className="mx-4 text-gray-500 text-sm font-mono">OR EXPLORE</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-64"></div>
        </div>

        {/* Other Navigation Options */}
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
