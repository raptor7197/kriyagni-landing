/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#232323',
        'black-deep': '#000000',
        grey: '#d9d9d9',
        mint: '#a1ffcb',
        white: '#ffffff',
        'theme-bg': 'rgb(var(--theme-bg) / <alpha-value>)',
        'theme-fg': 'rgb(var(--theme-fg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      /* px-based spacing scale, mirroring the reference (--spacing: 1px) */
      spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        60: '60px',
        80: '80px',
        100: '100px',
        120: '120px',
        168: '168px',
        188: '188px',
        200: '200px',
        348: '348px',
      },
      fontSize: {
        /* fluid between 375px and 1600px viewports */
        'headline-50': [
          'clamp(52px, calc(52px + (200 - 52) * (100vw - 375px) / 1225), 200px)',
          { lineHeight: '0.8', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'headline-40': [
          'clamp(40px, calc(40px + (100 - 40) * (100vw - 375px) / 1225), 100px)',
          { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'headline-30': [
          'clamp(40px, calc(40px + (56 - 40) * (100vw - 375px) / 1225), 56px)',
          { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'headline-20': [
          'clamp(32px, calc(32px + (48 - 32) * (100vw - 375px) / 1225), 48px)',
          { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'headline-10': [
          'clamp(24px, calc(24px + (40 - 24) * (100vw - 375px) / 1225), 40px)',
          { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'body-30': [
          'clamp(24px, calc(24px + (32 - 24) * (100vw - 375px) / 1225), 32px)',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '450' },
        ],
        'body-20': ['24px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '450' }],
        'body-10': ['16px', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '450' }],
        'caption-20': ['14px', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'caption-10': ['12px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'digit-30': [
          'clamp(80px, calc(80px + (140 - 80) * (100vw - 375px) / 1225), 140px)',
          { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'digit-20': [
          'clamp(80px, calc(80px + (120 - 80) * (100vw - 375px) / 1225), 120px)',
          { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' },
        ],
        'digit-10': ['80px', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '450' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        600: '600ms',
        800: '800ms',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'coin-flip': 'coin-flip 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
