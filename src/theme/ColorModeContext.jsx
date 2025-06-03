import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ColorModeContext = createContext();

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorMode must be used within a ColorModeProvider');
  return ctx;
};

export const ColorModeProvider = ({ children }) => {
  const getInitial = () => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('color-mode');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [colorMode, setColorMode] = useState(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode);
    localStorage.setItem('color-mode', colorMode);
  }, [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode(m => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = { colorMode, setColorMode, toggleColorMode };
  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};
