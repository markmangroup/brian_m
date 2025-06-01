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
  ...props 
}) {
  const variants = {
    primary: 'bg-theme-secondary hover:bg-theme-primary text-theme-inverse',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-theme-primary border border-theme-secondary',
    danger: 'bg-red-900 hover:bg-red-800 text-red-400',
    warning: 'bg-yellow-900 hover:bg-yellow-800 text-yellow-400',
    success: 'bg-green-900 hover:bg-green-800 text-theme-primary',
    info: 'bg-blue-900 hover:bg-blue-800 text-blue-400'
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const buttonClasses = [
    'rounded',
    'transition-all duration-200',
    'focus-matrix',
    variants[variant],
    sizes[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
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