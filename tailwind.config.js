/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#111111',
          800: '#181818',
          700: '#222222',
          600: '#2a2a2a',
          500: '#333333',
          400: '#444444',
        },
        lime: {
          DEFAULT: '#c7ff00',
          dark: '#a8d900',
          glow: 'rgba(199, 255, 0, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      spacing: {
        18: '4.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
