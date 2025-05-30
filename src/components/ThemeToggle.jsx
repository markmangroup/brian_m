import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { FaPalette, FaCaretDown } from 'react-icons/fa';

const ThemeToggle = () => {
  const { currentTheme, availableThemes, setTheme, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = availableThemes.find(theme => theme.id === currentTheme);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-400">
        <FaPalette className="animate-spin" />
        <span className="text-sm font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative z-[200]" ref={dropdownRef}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm
          theme-button relative z-[201]
          ${currentTheme === 'matrix' ? 'bg-green-600 text-green-100 border border-green-400' : ''}
          ${currentTheme === 'witcher' ? 'bg-amber-600 text-amber-100 border border-amber-400' : ''}
          ${currentTheme === 'nightcity' ? 'bg-purple-600 text-purple-100 border border-purple-400' : ''}
        `}
        style={{
          backgroundColor: currentThemeData?.colors?.buttonPrimary,
          color: currentThemeData?.colors?.textInverse,
          borderColor: currentThemeData?.colors?.borderPrimary,
          boxShadow: currentThemeData?.colors?.shadowSecondary
        }}
      >
        <FaPalette className="text-xs" />
        <span>{currentThemeData?.name || 'Theme'}</span>
        <FaCaretDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`
          absolute top-full mt-1 right-0 min-w-56 rounded-lg border theme-dropdown z-[1000]
          transition-all duration-200 origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
          ${currentTheme === 'matrix' ? 'bg-black/95 border-green-400/40' : ''}
          ${currentTheme === 'witcher' ? 'bg-amber-900/95 border-amber-400/40' : ''}
          ${currentTheme === 'nightcity' ? 'bg-gray-900/95 border-purple-400/40' : ''}
        `}
        style={{
          backgroundColor: currentThemeData?.colors?.overlayBackground,
          borderColor: currentThemeData?.colors?.borderSecondary,
          boxShadow: `${currentThemeData?.colors?.shadowPrimary}, 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)`
        }}
      >
        <div className="p-2">
          <div className="text-xs font-mono text-gray-400 px-3 py-1 border-b border-gray-600/30 mb-2">
            Select Theme
          </div>
          
          {availableThemes.map((theme) => {
            const isSelected = theme.id === currentTheme;
            
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm
                  theme-option group
                  ${isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent' : 'hover:bg-white/10'}
                `}
                style={{
                  backgroundColor: isSelected ? theme.colors.buttonPrimary + '20' : 'transparent',
                  color: theme.colors.textPrimary,
                  ...(isSelected && { 
                    ringColor: theme.colors.borderPrimary,
                    boxShadow: theme.colors.glowSecondary 
                  })
                }}
              >
                {/* Theme Preview Circle */}
                <div 
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    background: `linear-gradient(45deg, ${theme.colors.textPrimary}, ${theme.colors.textSecondary})`,
                    borderColor: theme.colors.borderPrimary,
                    boxShadow: `0 0 8px ${theme.colors.textPrimary}40`
                  }}
                />
                
                {/* Theme Info */}
                <div className="flex-1 text-left">
                  <div className="font-semibold">{theme.name}</div>
                  <div 
                    className="text-xs opacity-70"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {theme.id === 'matrix' && '🟢 Terminal Hacker'}
                    {theme.id === 'witcher' && '🟡 Medieval Fantasy'}
                    {theme.id === 'nightcity' && '🟣 Cyberpunk Future'}
                  </div>
                </div>
                
                {/* Selected Indicator */}
                {isSelected && (
                  <div 
                    className="text-xs font-mono font-bold"
                    style={{ color: theme.colors.textAccent }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Footer */}
        <div 
          className="px-3 py-2 border-t text-xs font-mono text-center opacity-60"
          style={{ 
            borderColor: currentThemeData?.colors?.borderSecondary + '30',
            color: currentThemeData?.colors?.textMuted 
          }}
        >
          Themes persist across sessions
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle; 