/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: '#FAF8F2',
      surface: '#F1EDE4',
      'surface-2': '#E7E1D5',
      border: '#DCD5C8',
      ink: '#1A1712',
      muted: '#6B635A',
      faint: '#B3AA9B',
      accent: '#0A7C84',
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
