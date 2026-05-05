/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: '#0C0B08',
      surface: '#141210',
      'surface-2': '#1C1A16',
      border: '#272420',
      ink: '#EDE9E0',
      muted: '#787068',
      faint: '#3E3B34',
      accent: '#4EE2EC',
    },
    fontFamily: {
      display: ['Figtree', 'system-ui', 'sans-serif'],
      sans: ['Figtree', 'system-ui', 'sans-serif'],
    },
    extend: {
      fontSize: {
        base: ['17px', { lineHeight: '1.65' }],
      },
      spacing: {
        section: '160px',
        'section-sm': '96px',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
