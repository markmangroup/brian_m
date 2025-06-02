import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import MatrixRain from './MatrixRain';

export default function MatrixLayout({ 
  children, 
  withRain = true, 
  className = '',
  contentClassName = '',
  centered = true,
  fullHeight = true,
  glitch = false,
  background = 'bg-black'
}) {
  const { currentTheme } = useTheme();
  
  const baseClasses = [
    fullHeight ? 'min-h-screen' : '',
    background,
    'font-mono',
    'relative',
    'overflow-hidden',
    'text-theme-primary',
    className
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'relative',
    'z-10',
    centered ? 'flex flex-col items-center justify-center' : 'flex flex-col',
    fullHeight ? 'min-h-screen' : '',
    'space-y-6',
    'px-4',
    glitch ? 'animate-glitch' : '',
    contentClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={baseClasses}>
      {/* Matrix Rain Background */}
      {withRain && typeof window !== 'undefined' && (
        <MatrixRain 
          zIndex={0} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%'
          }} 
        />
      )}
      
      {/* Content Container */}
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
}

// Additional helper components for common patterns
export function MatrixCard({ children, className = '' }) {
  return (
    <div className={`bg-black/50 p-6 rounded-lg border border-theme-primary backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

export function MatrixButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ariaLabel,
  type = 'button',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded focus-matrix transition-all duration-200 font-semibold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  
  const variantClasses = {
    primary: 'btn-theme-primary',
    secondary: 'btn-theme-secondary',
    danger: 'btn-theme-danger',
    info: 'btn-theme-info',
    success: 'btn-theme-success'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export function MatrixInput({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  ariaLabel,
  ...props 
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-theme px-4 py-2 rounded focus-matrix ${className}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
} 