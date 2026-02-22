import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D2D2D',
        accent: '#C9A227',
        background: '#FDFBF7',
        'background-alt': '#F8F6F3',
        border: '#E8E4DF',
        'text-secondary': '#6B6B6B',
        'text-muted': '#8B8B8B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.1em',
        wider: '0.15em',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config
