// Character System - Centralized character images, dialogue, and styling
export const CHARACTERS = {
  // === MAIN CHARACTERS ===
  morpheus: {
    name: 'Morpheus',
    image: '🕴️', // Could be replaced with actual image URL
    color: 'blue',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-400/40',
    textColor: 'text-blue-300',
    role: 'Mentor',
    title: 'Leader of the Resistance',
    voice: 'wise',
    description: 'The wise leader who offers truth and guidance'
  },
  neo: {
    name: 'Neo',
    image: '👤',
    color: 'cyan',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-400/40',
    textColor: 'text-cyan-300',
    role: 'The One',
    title: 'The Chosen One',
    voice: 'questioning',
    description: 'You - the one who must choose'
  },
  trinity: {
    name: 'Trinity',
    image: '👩‍💻',
    color: 'green',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-300',
    role: 'Hacker',
    title: 'Elite Operative',
    voice: 'determined',
    description: 'Skilled fighter and Neo\'s guide'
  },
  oracle: {
    name: 'Oracle',
    image: '👵',
    color: 'purple',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-400/40',
    textColor: 'text-purple-300',
    role: 'Prophet',
    title: 'Keeper of Wisdom',
    voice: 'cryptic',
    description: 'All-seeing prophet who knows the future'
  },

  // === FACTION LEADERS ===
  tank: {
    name: 'Tank',
    image: '👨‍🔧',
    color: 'green',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-300',
    role: 'Hacker Leader',
    title: 'Tech Specialist',
    voice: 'technical',
    description: 'Underground hacker network leader'
  },
  dozer: {
    name: 'Dozer',
    image: '🔧',
    color: 'green',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-300',
    role: 'Engineer',
    title: 'Systems Engineer',
    voice: 'practical',
    description: 'Tank\'s brother, engineering expert'
  },
  locke: {
    name: 'Commander Locke',
    image: '👨‍✈️',
    color: 'red',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-400/40',
    textColor: 'text-red-300',
    role: 'Military Commander',
    title: 'Zion Defense Commander',
    voice: 'authoritative',
    description: 'Military leader of Zion\'s defense forces'
  },
  niobe: {
    name: 'Niobe',
    image: '👩‍✈️',
    color: 'red',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-400/40',
    textColor: 'text-red-300',
    role: 'Captain',
    title: 'Ship Captain',
    voice: 'fierce',
    description: 'Fierce captain of the Logos'
  },
  seraph: {
    name: 'Seraph',
    image: '👼',
    color: 'blue',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-400/40',
    textColor: 'text-blue-300',
    role: 'Guardian',
    title: 'Oracle\'s Protector',
    voice: 'serene',
    description: 'Angelic guardian of the Oracle'
  },

  // === AGENTS & ANTAGONISTS ===
  smith: {
    name: 'Agent Smith',
    image: '🕴️‍♂️',
    color: 'gray',
    bgColor: 'bg-gray-900/20',
    borderColor: 'border-gray-400/40',
    textColor: 'text-gray-300',
    role: 'Agent',
    title: 'System Agent',
    voice: 'cold',
    description: 'Relentless enforcer of Matrix order'
  },
  echo: {
    name: 'Agent Echo',
    image: '🔄',
    color: 'red',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-400/40',
    textColor: 'text-red-300',
    role: 'System Guardian',
    title: 'Echo Protocol',
    voice: 'mechanical',
    description: 'System guardian monitoring user behavior'
  },
  architect: {
    name: 'The Architect',
    image: '👴',
    color: 'white',
    bgColor: 'bg-gray-900/20',
    borderColor: 'border-white/40',
    textColor: 'text-white',
    role: 'Creator',
    title: 'Matrix Creator',
    voice: 'analytical',
    description: 'Cold creator of the Matrix system'
  },

  // === SUPPORTING CHARACTERS ===
  archivist: {
    name: 'Archivist',
    image: '📚',
    color: 'orange',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-400/40',
    textColor: 'text-orange-300',
    role: 'Data Keeper',
    title: 'Information Archive',
    voice: 'scholarly',
    description: 'Keeper of system archives and data'
  },
  mouse: {
    name: 'Mouse',
    image: '🖱️',
    color: 'green',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-300',
    role: 'Code Artist',
    title: 'Reality Programmer',
    voice: 'excited',
    description: 'Young programmer who creates digital worlds'
  },
  system: {
    name: 'System',
    image: '💻',
    color: 'cyan',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-400/40',
    textColor: 'text-cyan-300',
    role: 'AI Interface',
    title: 'System Protocol',
    voice: 'robotic',
    description: 'The Matrix\'s own voice'
  }
};

// Character dialogue component
export function CharacterDialogue({ 
  characterKey, 
  text, 
  showImage = true, 
  showName = true, 
  showTitle = false,
  size = 'md',
  className = '' 
}) {
  const character = CHARACTERS[characterKey];
  
  if (!character) {
    console.warn(`Character not found: ${characterKey}`);
    return null;
  }

  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
    xl: 'text-9xl'
  };

  return (
    <div className={`
      ${character.bgColor} 
      ${character.borderColor} 
      border rounded-lg p-4 space-y-3 
      backdrop-blur-sm shadow-lg
      ${className}
    `}>
      {showImage && (
        <div className="flex items-center gap-4">
          <div className={`${sizeClasses[size]} leading-none`}>
            {character.image}
          </div>
          <div>
            {showName && (
              <h3 className={`font-bold ${character.textColor} text-lg`}>
                {character.name}
              </h3>
            )}
            {showTitle && (
              <p className="text-gray-400 text-sm">{character.title}</p>
            )}
          </div>
        </div>
      )}
      
      <div className={`text-white leading-relaxed ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
        {typeof text === 'string' ? (
          <p>{text}</p>
        ) : (
          text
        )}
      </div>
    </div>
  );
}

// Character avatar component (smaller, for quick references)
export function CharacterAvatar({ 
  characterKey, 
  size = 'md', 
  showName = false,
  className = '',
  onClick = null
}) {
  const character = CHARACTERS[characterKey];
  
  if (!character) return null;

  const sizeClasses = {
    xs: 'text-lg w-8 h-8',
    sm: 'text-2xl w-12 h-12',
    md: 'text-3xl w-16 h-16',
    lg: 'text-4xl w-20 h-20',
    xl: 'text-6xl w-24 h-24'
  };

  return (
    <div 
      className={`
        flex flex-col items-center gap-1 
        ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className={`
        ${sizeClasses[size]}
        ${character.bgColor}
        ${character.borderColor}
        border rounded-full
        flex items-center justify-center
        backdrop-blur-sm
      `}>
        {character.image}
      </div>
      {showName && (
        <span className={`text-xs ${character.textColor} font-bold`}>
          {character.name}
        </span>
      )}
    </div>
  );
}

// Character speaker component (for dialogue sequences)
export function CharacterSpeaker({ 
  characterKey, 
  text, 
  timestamp = null,
  className = '' 
}) {
  const character = CHARACTERS[characterKey];
  
  if (!character) return null;

  return (
    <div className={`flex gap-3 items-start ${className}`}>
      <CharacterAvatar characterKey={characterKey} size="sm" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-bold ${character.textColor} text-sm`}>
            {character.name}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-500">{timestamp}</span>
          )}
        </div>
        <div className={`
          ${character.bgColor} 
          ${character.borderColor} 
          border rounded-lg p-3 text-white text-sm
        `}>
          {text}
        </div>
      </div>
    </div>
  );
}

// Get character by key (utility function)
export function getCharacter(key) {
  return CHARACTERS[key];
}

// Get all characters (utility function) 
export function getAllCharacters() {
  return CHARACTERS;
} 