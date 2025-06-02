import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { themes, getThemeVariables, defaultTheme } from './themes';

const ThemeContext = createContext();

// World mappings - each world corresponds to a theme
const WORLD_THEME_MAP = {
  'matrix': 'matrix',
  'witcher': 'witcher', 
  'nightcity': 'nightcity',
  'cyberpunk': 'nightcity' // Legacy support
};

// Reverse mapping for theme to world
const THEME_WORLD_MAP = {
  'matrix': 'matrix',
  'witcher': 'witcher',
  'nightcity': 'nightcity'
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [currentWorld, setCurrentWorld] = useState('matrix');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme and world from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('brian-m-theme');
    const savedMatrixTheme = localStorage.getItem('matrixTheme'); // Legacy support
    const savedWorld = localStorage.getItem('brian-m-world');
    
    let themeToLoad = defaultTheme;
    let worldToLoad = 'matrix';
    
    // Priority: saved theme > legacy matrixTheme > default
    if (savedTheme && themes[savedTheme]) {
      themeToLoad = savedTheme;
    } else if (savedMatrixTheme && WORLD_THEME_MAP[savedMatrixTheme]) {
      themeToLoad = WORLD_THEME_MAP[savedMatrixTheme];
    }
    
    // Set world based on theme if not explicitly saved
    if (savedWorld && WORLD_THEME_MAP[savedWorld]) {
      worldToLoad = savedWorld;
    } else {
      worldToLoad = THEME_WORLD_MAP[themeToLoad] || 'matrix';
    }
    
    setCurrentTheme(themeToLoad);
    setCurrentWorld(worldToLoad);
    setIsLoading(false);
  }, []);

  // Apply theme variables to the DOM
  const applyThemeVariables = useCallback((themeId) => {
    const variables = getThemeVariables(themeId);
    const root = document.documentElement;
    
    // Apply CSS variables to :root
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Set data-theme attribute for potential CSS selector usage
    document.body.setAttribute('data-theme', themeId);
    document.body.setAttribute('data-world', THEME_WORLD_MAP[themeId] || 'matrix');
    
    // Add theme class to body for additional styling
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '') // Remove existing theme classes
      .replace(/world-\w+/g, '') // Remove existing world classes
      .trim() + ` theme-${themeId} world-${THEME_WORLD_MAP[themeId] || 'matrix'}`;
  }, []);

  // Unified world/theme change function
  const setWorld = useCallback((worldKey) => {
    const themeId = WORLD_THEME_MAP[worldKey];
    if (!themeId || !themes[themeId]) {
      console.warn(`World "${worldKey}" does not exist. Available worlds:`, Object.keys(WORLD_THEME_MAP));
      return;
    }
    
    setCurrentWorld(worldKey);
    setCurrentTheme(themeId);
    
    // Update localStorage
    localStorage.setItem('brian-m-world', worldKey);
    localStorage.setItem('brian-m-theme', themeId);
    
    // Legacy support - update matrixTheme as well
    localStorage.setItem('matrixTheme', worldKey === 'nightcity' ? 'cyberpunk' : worldKey);
    
    // Apply theme variables
    applyThemeVariables(themeId);
    
    // Dispatch legacy theme change event for backward compatibility
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { 
        theme: worldKey === 'nightcity' ? 'cyberpunk' : worldKey,
        world: worldKey,
        themeId: themeId
      } 
    }));
  }, [applyThemeVariables]);

  // Set theme function (for direct theme changes)
  const setTheme = useCallback((themeId) => {
    if (!themes[themeId]) {
      console.warn(`Theme "${themeId}" does not exist. Available themes:`, Object.keys(themes));
      return;
    }
    
    const worldKey = THEME_WORLD_MAP[themeId] || 'matrix';
    setWorld(worldKey); // Use setWorld to maintain consistency
  }, [setWorld]);

  // Apply theme variables when theme changes
  useEffect(() => {
    if (!isLoading) {
      applyThemeVariables(currentTheme);
    }
  }, [currentTheme, applyThemeVariables, isLoading]);

  // Get current theme object
  const theme = themes[currentTheme];

  // Get all available themes
  const availableThemes = Object.values(themes);

  // Get all available worlds
  const availableWorlds = Object.keys(WORLD_THEME_MAP);

  // Check if theme is specific type
  const isMatrix = currentTheme === 'matrix';
  const isWitcher = currentTheme === 'witcher';
  const isNightCity = currentTheme === 'nightcity';

  // Check if world is specific type
  const isMatrixWorld = currentWorld === 'matrix';
  const isWitcherWorld = currentWorld === 'witcher';
  const isNightCityWorld = currentWorld === 'nightcity' || currentWorld === 'cyberpunk';

  const contextValue = {
    // Current theme state
    currentTheme,
    theme,
    isLoading,
    
    // Current world state
    currentWorld,
    
    // Theme switching
    setTheme,
    
    // World switching
    setWorld,
    
    // Available options
    availableThemes,
    availableWorlds,
    themes,
    
    // Theme type checks (legacy)
    isMatrix,
    isWitcher,
    isNightCity,
    
    // World type checks (new)
    isMatrixWorld,
    isWitcherWorld,
    isNightCityWorld,
    
    // Utility functions
    getThemeColor: (colorKey) => theme?.colors?.[colorKey] || '#ffffff',
    getThemeFont: (fontKey) => theme?.fonts?.[fontKey] || 'inherit',
    getThemeD3: (d3Key) => theme?.d3?.[d3Key] || undefined,
    
    // CSS variable helpers
    cssVar: (varName) => `var(--${varName})`,
    themeVar: (key) => `var(--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`,
    
    // World/theme mapping utilities
    getWorldFromTheme: (themeId) => THEME_WORLD_MAP[themeId],
    getThemeFromWorld: (worldKey) => WORLD_THEME_MAP[worldKey],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 