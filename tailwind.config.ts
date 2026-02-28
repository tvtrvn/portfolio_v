import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#020617',
          foreground: '#e5e7eb'
        },
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#eef2ff'
        },
        accent: {
          DEFAULT: '#22c55e',
          foreground: '#ecfdf3'
        },
        muted: {
          DEFAULT: '#0f172a',
          foreground: '#9ca3af'
        }
      },
      backgroundImage: {
        'subtle-radial':
          'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.15), transparent 55%), radial-gradient(circle at 100% 100%, rgba(129,140,248,0.15), transparent 55%)'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15,23,42,0.45)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
};

export default config;

