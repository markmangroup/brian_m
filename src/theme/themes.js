export const themes = {
  matrix: {
    name: 'Matrix',
    id: 'matrix',
    modes: {
      dark: {
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
          textBright: '#ffffff',
          
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
          
          // Shadows and glows - Reduced intensity
          shadowPrimary: '0 0 10px rgba(34, 197, 94, 0.3)',
          shadowSecondary: '0 0 5px rgba(16, 185, 129, 0.2)',
          glowPrimary: '0 0 8px #00ff41',
          glowSecondary: '0 0 5px #22c55e'
        }
      },
      light: {
        background: '#f8f9fa',
        colors: {
          // Background colors
          primary: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#e9ecef',
          
          // Text colors - High contrast for light mode
          textPrimary: '#0d4d1a',
          textSecondary: '#166e30',
          textAccent: '#0c5a26',
          textMuted: '#6c757d',
          textInverse: '#ffffff',
          textBright: '#000000',
          
          // Interactive colors - Accessible contrast
          buttonPrimary: '#166e30',
          buttonSecondary: '#0d4d1a',
          buttonHover: '#0c5a26',
          buttonDanger: '#dc3545',
          buttonInfo: '#0dcaf0',
          buttonSuccess: '#198754',
          linkColor: '#0c5a26',
          
          // Border and UI colors
          borderPrimary: '#166e30',
          borderSecondary: '#0c5a26',
          borderAccent: '#0d4d1a',
          
          // Status colors
          success: '#198754',
          warning: '#fd7e14',
          error: '#dc3545',
          info: '#0dcaf0',
          
          // Glass/overlay effects
          glassBackground: 'rgba(13, 77, 26, 0.1)',
          overlayBackground: 'rgba(255, 255, 255, 0.95)',
          
          // Minimal shadows for light mode
          shadowPrimary: '0 2px 4px rgba(0, 0, 0, 0.1)',
          shadowSecondary: '0 1px 2px rgba(0, 0, 0, 0.05)',
          glowPrimary: 'none',
          glowSecondary: 'none'
        }
      }
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
    }
  },
  
  witcher: {
    name: 'Witcher',
    id: 'witcher',
    modes: {
      dark: {
        background: '#1a0f08',
        colors: {
          // Background colors - Darker for better contrast
          primary: '#2c1810',
          secondary: '#3d2317',
          tertiary: '#4f2f1f',
          
          // Text colors - Enhanced readability
          textPrimary: '#fde047',
          textSecondary: '#f59e0b',
          textAccent: '#d97706',
          textMuted: '#a16207',
          textInverse: '#2c1810',
          textBright: '#fef3c7',
          
          // Interactive colors - Better contrast
          buttonPrimary: '#f59e0b',
          buttonSecondary: '#d97706',
          buttonHover: '#fde047',
          buttonDanger: '#dc2626',
          buttonInfo: '#0ea5e9',
          buttonSuccess: '#22c55e',
          linkColor: '#d97706',
          
          // Border and UI colors
          borderPrimary: '#f59e0b',
          borderSecondary: '#d97706',
          borderAccent: '#fde047',
          
          // Status colors
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#dc2626',
          info: '#0ea5e9',
          
          // Glass/overlay effects
          glassBackground: 'rgba(245, 158, 11, 0.1)',
          overlayBackground: 'rgba(44, 24, 16, 0.95)',
          
          // Reduced shadows and glows for readability
          shadowPrimary: '0 0 10px rgba(245, 158, 11, 0.2)',
          shadowSecondary: '0 0 5px rgba(217, 119, 6, 0.15)',
          glowPrimary: '0 0 8px #f59e0b',
          glowSecondary: '0 0 5px #d97706'
        }
      },
      light: {
        background: '#fef7ed',
        colors: {
          // Background colors
          primary: '#ffffff',
          secondary: '#fef7ed',
          tertiary: '#fed7aa',
          
          // Text colors - Dark colors for light background
          textPrimary: '#92400e',
          textSecondary: '#b45309',
          textAccent: '#d97706',
          textMuted: '#6b7280',
          textInverse: '#ffffff',
          textBright: '#000000',
          
          // Interactive colors - High contrast
          buttonPrimary: '#92400e',
          buttonSecondary: '#b45309',
          buttonHover: '#d97706',
          buttonDanger: '#dc2626',
          buttonInfo: '#0ea5e9',
          buttonSuccess: '#059669',
          linkColor: '#b45309',
          
          // Border and UI colors
          borderPrimary: '#92400e',
          borderSecondary: '#b45309',
          borderAccent: '#d97706',
          
          // Status colors
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          info: '#0ea5e9',
          
          // Glass/overlay effects
          glassBackground: 'rgba(146, 64, 14, 0.1)',
          overlayBackground: 'rgba(255, 255, 255, 0.95)',
          
          // Minimal shadows for light mode
          shadowPrimary: '0 2px 4px rgba(0, 0, 0, 0.1)',
          shadowSecondary: '0 1px 2px rgba(0, 0, 0, 0.05)',
          glowPrimary: 'none',
          glowSecondary: 'none'
        }
      }
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
    }
  },
  
  nightcity: {
    name: 'Night City',
    id: 'nightcity',
    modes: {
      dark: {
        background: '#0f0f23',
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
          textBright: '#ffffff',
          
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
          
          // Reduced glow intensity
          shadowPrimary: '0 0 10px rgba(0, 255, 255, 0.3)',
          shadowSecondary: '0 0 8px rgba(255, 0, 255, 0.2)',
          glowPrimary: '0 0 10px #00ffff',
          glowSecondary: '0 0 8px #ff00ff'
        }
      },
      light: {
        background: '#f8fafc',
        colors: {
          // Background colors
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#e2e8f0',
          
          // Text colors - Dark variants for light mode
          textPrimary: '#0c4a6e',
          textSecondary: '#be185d',
          textAccent: '#7c3aed',
          textMuted: '#6b7280',
          textInverse: '#ffffff',
          textBright: '#000000',
          
          // Interactive colors - Accessible for light mode
          buttonPrimary: '#0c4a6e',
          buttonSecondary: '#be185d',
          buttonHover: '#7c3aed',
          buttonDanger: '#dc2626',
          buttonInfo: '#0ea5e9',
          buttonSuccess: '#059669',
          linkColor: '#7c3aed',
          
          // Border and UI colors
          borderPrimary: '#0c4a6e',
          borderSecondary: '#be185d',
          borderAccent: '#7c3aed',
          
          // Status colors
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          info: '#0ea5e9',
          
          // Glass/overlay effects
          glassBackground: 'rgba(12, 74, 110, 0.1)',
          overlayBackground: 'rgba(255, 255, 255, 0.95)',
          
          // Minimal shadows for light mode
          shadowPrimary: '0 2px 4px rgba(0, 0, 0, 0.1)',
          shadowSecondary: '0 1px 2px rgba(0, 0, 0, 0.05)',
          glowPrimary: 'none',
          glowSecondary: 'none'
        }
      }
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
    }
  }
};

export const getThemeVariables = (themeId, colorMode = 'dark') => {
  const theme = themes[themeId];
  if (!theme) return {};
  
  const modeColors = theme.modes[colorMode]?.colors || theme.modes.dark.colors;
  const variables = {};
  
  // Convert color object to CSS variables
  Object.entries(modeColors).forEach(([key, value]) => {
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

  // Background for world - use mode-specific background
  if (theme.modes[colorMode]?.background) {
    variables['--world-background'] = theme.modes[colorMode].background;
  }

  // Add D3 colors based on mode
  const d3Colors = {
    nodeColor: modeColors.borderPrimary,
    linkColor: modeColors.borderSecondary,
    nodeGlow: modeColors.glowPrimary || 'none',
    textColor: modeColors.textPrimary,
    backgroundColor: modeColors.primary,
    gridOpacity: colorMode === 'light' ? 0.2 : 0.3,
    strokeWidth: 2
  };

  Object.entries(d3Colors).forEach(([key, value]) => {
    variables[`--d3-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });

  return variables;
};

export const defaultTheme = 'matrix'; 