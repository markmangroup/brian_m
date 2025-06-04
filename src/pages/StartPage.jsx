import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import MatrixLayout from '../components/MatrixLayout';

const WORLD_OPTIONS = [
  {
    id: 'matrix',
    name: 'The Matrix',
    description: 'Discover the truth behind reality. Red pill or blue pill?',
    route: '/matrix-v1',
    theme: 'matrix',
    icon: '🔴',
    background: 'bg-gradient-to-br from-red-900/20 to-green-900/20',
    border: 'border-green-400/60',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]',
    features: ['Digital Awakening', 'Choice & Consequence', 'Reality Hacking', 'Progress Dashboard']
  },
  {
    id: 'witcher',
    name: 'The Witcher',
    description: 'Hunt monsters, master signs, and embrace your mutations.',
    route: '/witcher/entry',
    theme: 'witcher',
    icon: '⚔️',
    background: 'bg-gradient-to-br from-orange-900/20 to-yellow-900/20',
    border: 'border-orange-400/60',
    glow: 'shadow-[0_0_20px_rgba(251,146,60,0.4)]',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.6)]',
    features: ['Monster Hunting', 'Witcher Signs', 'Mutation Paths']
  },
  {
    id: 'night-city',
    name: 'Night City',
    description: 'Chrome, code, and corporate espionage in a cyberpunk dystopia.',
    route: '/matrix-v1/night-city/entry',
    theme: 'cyberpunk',
    icon: '🌆',
    background: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20',
    border: 'border-purple-400/60',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.4)]',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]',
    features: ['Corporate Intrigue', 'Netrunning', 'Street Credibility']
  },
  {
    id: 'progress',
    name: 'Progress Dashboard',
    description: 'Visualize cleansing momentum across worlds.',
    route: '/matrix-v1/progress',
    theme: 'matrix',
    icon: '📈',
    background: 'bg-gradient-to-br from-gray-700/20 to-green-700/20',
    border: 'border-green-400/60',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]',
    features: ['Metrics', 'Animations', 'Data Upgrades']
  }
];

export default function StartPage() {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const { setCurrentWorld } = useTheme();

  const handleWorldSelect = (world) => {
    setSelectedWorld(world.id);
    setCurrentWorld(world.theme);
  };

  return (
    <MatrixLayout centered={true} contentClassName="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Reality
          </h1>
          <p className="text-xl text-gray-300 font-mono">
            Select a world to begin your journey
          </p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-green-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* World Selection Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {WORLD_OPTIONS.map((world) => (
            <div
              key={world.id}
              className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                selectedWorld === world.id ? 'scale-105' : ''
              }`}
              onClick={() => handleWorldSelect(world)}
            >
              {/* Card */}
              <div className={`
                relative overflow-hidden rounded-2xl border-2 p-6 h-96
                ${world.background} ${world.border} ${world.glow} ${world.hoverGlow}
                backdrop-blur-sm transition-all duration-500
                ${selectedWorld === world.id ? 'ring-4 ring-white/20' : ''}
              `}>
                {/* Animated Background Effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-grid-pattern animate-pulse"></div>
                </div>

                {/* World Icon */}
                <div className="text-center mb-4">
                  <span className="text-6xl filter drop-shadow-lg">
                    {world.icon}
                  </span>
                </div>

                {/* World Title */}
                <h2 className="text-2xl font-bold text-center mb-4 text-white font-mono">
                  {world.name}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-center mb-6 text-sm leading-relaxed">
                  {world.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {world.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-400">
                      <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Enter Button */}
                <Link
                  to={world.route}
                  className="absolute bottom-4 left-4 right-4 bg-black/60 hover:bg-black/80 
                           text-white py-3 px-6 rounded-lg font-mono font-semibold text-center
                           transition-all duration-300 border border-white/20 hover:border-white/40
                           transform hover:translate-y-[-2px] hover:shadow-lg group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    ENTER WORLD
                  </span>
                </Link>

                {/* Selection Indicator */}
                {selectedWorld === world.id && (
                  <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full animate-pulse shadow-lg"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedWorld && (
          <div className="text-center animate-fade-in">
            <Link
              to={WORLD_OPTIONS.find(w => w.id === selectedWorld)?.route}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-purple-600 
                       hover:from-green-500 hover:to-purple-500 text-white font-bold py-4 px-8 
                       rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300
                       border border-white/20 hover:border-white/40"
            >
              <span className="text-lg">🚀</span>
              <span className="text-xl font-mono tracking-wider">BEGIN JOURNEY</span>
              <span className="text-lg">🚀</span>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm font-mono">
            Each world offers unique mechanics, storylines, and challenges
          </p>
          <div className="mt-4 flex justify-center space-x-8 text-xs text-gray-600">
            <span>💾 Progress Auto-Saved</span>
            <span>🔄 Multiple Paths</span>
            <span>🎯 Consequential Choices</span>
          </div>
        </div>
      </div>
    </MatrixLayout>
  );
} 