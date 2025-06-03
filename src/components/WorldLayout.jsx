import React from 'react';
import { useTheme } from '../theme/ThemeContext';

export default function WorldLayout({ children, className = '', ...props }) {
  const { theme } = useTheme();
  const classes = ['min-h-screen', 'relative', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={{ background: theme.background }} {...props}>
      {children}
    </div>
  );
}
