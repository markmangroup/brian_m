import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { themes, getThemeVariables, defaultTheme } from './themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('brian-m-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
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
    
    // Add theme class to body for additional styling
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '') // Remove existing theme classes
      .trim() + ` theme-${themeId}`;
  }, []);

  // Set theme function
  const setTheme = useCallback((themeId) => {
    if (!themes[themeId]) {
      console.warn(`Theme "${themeId}" does not exist. Available themes:`, Object.keys(themes));
      return;
    }
    
    setCurrentTheme(themeId);
    localStorage.setItem('brian-m-theme', themeId);
    applyThemeVariables(themeId);
  }, [applyThemeVariables]);

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

  // Check if theme is specific type
  const isMatrix = currentTheme === 'matrix';
  const isWitcher = currentTheme === 'witcher';
  const isNightCity = currentTheme === 'nightcity';

  const contextValue = {
    // Current theme state
    currentTheme,
    theme,
    isLoading,
    
    // Theme switching
    setTheme,
    
    // Available themes
    availableThemes,
    themes,
    
    // Theme type checks
    isMatrix,
    isWitcher,
    isNightCity,
    
    // Utility functions
    getThemeColor: (colorKey) => theme?.colors?.[colorKey] || '#ffffff',
    getThemeFont: (fontKey) => theme?.fonts?.[fontKey] || 'inherit',
    getThemeD3: (d3Key) => theme?.d3?.[d3Key] || undefined,
    
    // CSS variable helpers
    cssVar: (varName) => `var(--${varName})`,
    themeVar: (key) => `var(--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 