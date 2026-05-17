import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F4EFE6',
          100: '#E8E1D2',
          200: '#C8BFAE',
          300: '#9A9387',
          400: '#6B6760',
          500: '#3F3D38',
          600: '#262522',
          700: '#1A1A18',
          800: '#121211',
          900: '#0B0B0E',
          950: '#06060A',
        },
        amber: {
          50: '#FBF3E4',
          100: '#F4E1BE',
          200: '#E9C893',
          300: '#DEB078',
          400: '#D4A574',
          500: '#C2925F',
          600: '#A07747',
          700: '#7A5B36',
          800: '#54402A',
          900: '#33271C',
        },
        sage: {
          400: '#7FB069',
          500: '#5B8F4A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter2: '-0.025em',
      },
      backgroundImage: {
        'grain':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        'inner-edge':
          'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)',
        'inner-edge-light':
          'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.04)',
        'diffuse-dark':
          '0 30px 60px -20px rgba(0,0,0,0.55), 0 8px 20px -10px rgba(0,0,0,0.4)',
        'diffuse-light':
          '0 20px 40px -15px rgba(40,30,20,0.10), 0 8px 16px -8px rgba(40,30,20,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        'marquee-x': 'marquee-x 40s linear infinite',
        'marquee-x-slow': 'marquee-x 75s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'float-y': 'float-y 7s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
      keyframes: {
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.6)', opacity: '0.35' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
