/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'twinkle': 'twinkle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'progress-slow': 'progress 6s linear forwards',
        'shake': 'shake 0.4s linear',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|shadow)-(emerald|blue|purple|cyan|red|gray|yellow)-(400|500|600|700|800|900)/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /from-(gray|purple|black)-(900)/,
    },
    {
      pattern: /to-(purple|black)-(900)/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /opacity-(20|30|40|50|60|70|80|90)/,
    },
    {
      pattern: /transform|scale-x-100|-scale-x-100|rotate-90|-rotate-90/,
    }
  ],
} 
