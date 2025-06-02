import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../../../components/CharacterSystem';

const GUARDIAN_ROLES = {
  mentor: { title: 'Mentor', icon: '📘', color: 'text-theme-secondary' },
  agent: { title: 'Enforcer', icon: '🟥', color: 'text-red-400' },
  oracle: { title: 'Monitor', icon: '🟣', color: 'text-purple-400' }
};

export default function NPC({ 
  name, 
  quote, 
  style = 'mentor', 
  className = '', 
  type = 'mentor',
  speaker = null,
  children 
}) {
  const [show, setShow] = useState(false);
  const role = GUARDIAN_ROLES[style] || GUARDIAN_ROLES.mentor;

  // Support both speaker prop and name prop for backwards compatibility
  const characterKey = speaker || name?.toLowerCase().replace(/\s+/g, '');
  const character = characterKey ? CHARACTERS[characterKey] : null;
  
  // Use character data if available, otherwise fallback to props
  const displayName = character?.name || name || 'Unknown';
  const displayQuote = children || quote || '';
  const characterImage = character?.image || '👤';
  const characterTitle = character?.title || role.title;

  useEffect(() => {
    setShow(true);
  }, []);

  let variant = '';
  let cardClasses = '';
  
  if (style === 'oracle') {
    variant = 'border-purple-400/60 text-theme-bright bg-purple-900/20 shadow-lg backdrop-blur-md';
    cardClasses = 'animate-pulse shadow-purple-400/20';
  } else if (style === 'agent') {
    variant = 'border-red-400/60 text-theme-bright bg-red-900/20 shadow-lg backdrop-blur-md';
    cardClasses = 'animate-pulse shadow-red-400/20';
  } else {
    variant = 'border-theme-primary text-theme-bright bg-theme-secondary shadow-lg backdrop-blur-md';
    cardClasses = 'shadow-theme-secondary';
  }

  return (
    <div
      className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
    >
      {/* Character Header */}
      <div className="mb-3 flex items-center justify-center gap-3">
        <div className="text-2xl">{characterImage}</div>
        <div className="text-center">
          <div className="text-lg font-bold text-theme-bright font-theme-primary">
            {displayName}
          </div>
          <div className="text-sm text-theme-accent font-theme-secondary">
            {characterTitle}
          </div>
        </div>
        <div className={`text-lg ${role.color}`}>{role.icon}</div>
      </div>
      
      {/* Dialogue Box */}
      <div className={`
        dialogue-text
        p-4 rounded-lg border-2 transition-all duration-300
        ${variant} ${cardClasses}
        relative
      `}>
        {/* Quote decoration */}
        <div className="absolute top-2 left-2 text-theme-accent opacity-60 text-xl font-bold">"</div>
        <div className="absolute bottom-2 right-2 text-theme-accent opacity-60 text-xl font-bold">"</div>
        
        {/* Main content */}
        <div className="px-2">
          {displayQuote}
        </div>
      </div>
    </div>
  );
}
