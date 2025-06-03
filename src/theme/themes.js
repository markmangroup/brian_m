export const themes = {
  matrix: {
    name: 'Matrix',
    id: 'matrix',
    background: '#000',
    colors: {
      // Background colors
      primary: '#000000',
      secondary: '#0a0a0a',
      tertiary: '#1a1a1a',
      
      // Text colors - Enhanced contrast
      textPrimary: '#00ff41',
      textSecondary: '#22c55e',
      textAccent: '#10b981',
      textMuted: '#4ade80',
      textInverse: '#000000',
      textBright: '#ffffff', // Added for critical text
      
      // Interactive colors - Improved visibility
      buttonPrimary: '#00ff41',
      buttonSecondary: '#22c55e',
      buttonHover: '#4ade80',
      buttonDanger: '#ef4444',
      buttonInfo: '#06b6d4',
      buttonSuccess: '#10b981',
      linkColor: '#10b981',
      
      // Border and UI colors
      borderPrimary: '#22c55e',
      borderSecondary: '#10b981',
      borderAccent: '#4ade80',
      
      // Status colors
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#06b6d4',
      
      // Glass/overlay effects
      glassBackground: 'rgba(0, 255, 65, 0.1)',
      overlayBackground: 'rgba(0, 0, 0, 0.9)',
      
      // Shadows and glows
      shadowPrimary: '0 0 20px rgba(34, 197, 94, 0.5)',
      shadowSecondary: '0 0 10px rgba(16, 185, 129, 0.3)',
      glowPrimary: '0 0 15px #00ff41',
      glowSecondary: '0 0 10px #22c55e'
    },
    fonts: {
      primary: '"Courier New", "Monaco", "Consolas", monospace',
      secondary: '"JetBrains Mono", "Fira Code", monospace',
      ui: '"Inter", "system-ui", sans-serif'
    },
    spacing: {
      borderRadius: '0.25rem',
      borderWidth: '2px',
      shadowBlur: '20px'
    },
    d3: {
      nodeColor: '#22c55e',
      linkColor: '#10b981',
      nodeGlow: '0 0 15px #00ff41',
      textColor: '#00ff41',
      backgroundColor: '#000000',
      gridOpacity: 0.3,
      strokeWidth: 2
    }
  },
  
  witcher: {
    name: 'Witcher',
    id: 'witcher',
    background: '#f0f4f9',
    colors: {
      // Background colors
      primary: '#2c1810',
      secondary: '#3d2317',
      tertiary: '#4f2f1f',
      
      // Text colors - Enhanced readability
      textPrimary: '#fbbf24',
      textSecondary: '#f59e0b',
      textAccent: '#d97706',
      textMuted: '#a16207',
      textInverse: '#2c1810',
      textBright: '#fef3c7', // Added for critical text
      
      // Interactive colors - Better contrast
      buttonPrimary: '#fbbf24',
      buttonSecondary: '#f59e0b',
      buttonHover: '#fde047',
      buttonDanger: '#dc2626',
      buttonInfo: '#0ea5e9',
      buttonSuccess: '#22c55e',
      linkColor: '#d97706',
      
      // Border and UI colors
      borderPrimary: '#fbbf24',
      borderSecondary: '#f59e0b',
      borderAccent: '#fde047',
      
      // Status colors
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#0ea5e9',
      
      // Glass/overlay effects
      glassBackground: 'rgba(245, 158, 11, 0.1)',
      overlayBackground: 'rgba(44, 24, 16, 0.95)',
      
      // Shadows and glows
      shadowPrimary: '0 0 20px rgba(245, 158, 11, 0.4)',
      shadowSecondary: '0 0 10px rgba(217, 119, 6, 0.3)',
      glowPrimary: '0 0 15px #fbbf24',
      glowSecondary: '0 0 10px #f59e0b'
    },
    fonts: {
      primary: '"Cinzel", "Times New Roman", serif',
      secondary: '"Crimson Text", "Georgia", serif',
      ui: '"Inter", "system-ui", sans-serif'
    },
    spacing: {
      borderRadius: '0.5rem',
      borderWidth: '2px',
      shadowBlur: '25px'
    },
    d3: {
      nodeColor: '#fbbf24',
      linkColor: '#f59e0b',
      nodeGlow: '0 0 15px #fbbf24',
      textColor: '#fde047',
      backgroundColor: '#2c1810',
      gridOpacity: 0.2,
      strokeWidth: 2
    }
  },
  
  nightcity: {
    name: 'Night City',
    id: 'nightcity',
    background: '#1a1a2e',
    colors: {
      // Background colors
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      tertiary: '#16213e',
      
      // Text colors - High contrast for cyberpunk theme
      textPrimary: '#00ffff',
      textSecondary: '#ff00ff',
      textAccent: '#c084fc',
      textMuted: '#a855f7',
      textInverse: '#0f0f23',
      textBright: '#ffffff', // Added for critical text
      
      // Interactive colors - Neon visibility
      buttonPrimary: '#00ffff',
      buttonSecondary: '#ff00ff',
      buttonHover: '#e879f9',
      buttonDanger: '#f43f5e',
      buttonInfo: '#00ffff',
      buttonSuccess: '#22c55e',
      linkColor: '#a855f7',
      
      // Border and UI colors
      borderPrimary: '#00ffff',
      borderSecondary: '#ff00ff',
      borderAccent: '#c084fc',
      
      // Status colors
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#f43f5e',
      info: '#00ffff',
      
      // Glass/overlay effects
      glassBackground: 'rgba(0, 255, 255, 0.1)',
      overlayBackground: 'rgba(15, 15, 35, 0.95)',
      
      // Shadows and glows
      shadowPrimary: '0 0 20px rgba(0, 255, 255, 0.5)',
      shadowSecondary: '0 0 15px rgba(255, 0, 255, 0.4)',
      glowPrimary: '0 0 20px #00ffff, 0 0 40px #ff00ff',
      glowSecondary: '0 0 15px #c084fc'
    },
    fonts: {
      primary: '"Orbitron", "Roboto Mono", monospace',
      secondary: '"Exo 2", "Helvetica", sans-serif',
      ui: '"Inter", "system-ui", sans-serif'
    },
    spacing: {
      borderRadius: '0.375rem',
      borderWidth: '2px',
      shadowBlur: '30px'
    },
    d3: {
      nodeColor: '#a855f7',
      linkColor: '#c084fc',
      nodeGlow: '0 0 15px #00ffff, 0 0 30px #ff00ff, 0 0 45px #c084fc',
      textColor: '#00ffff',
      backgroundColor: '#0f0f23',
      gridOpacity: 0.4,
      strokeWidth: 2
    }
  }
};

export const getThemeVariables = (themeId) => {
  const theme = themes[themeId];
  if (!theme) return {};
  
  const variables = {};
  
  // Convert color object to CSS variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    variables[`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Convert font object to CSS variables
  Object.entries(theme.fonts).forEach(([key, value]) => {
    variables[`--font-${key}`] = value;
  });
  
  // Convert spacing object to CSS variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Convert D3 object to CSS variables
  Object.entries(theme.d3).forEach(([key, value]) => {
    variables[`--d3-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });

  // Background for world
  if (theme.background) {
    variables['--world-background'] = theme.background;
  }

  return variables;
};

export const defaultTheme = 'matrix'; 