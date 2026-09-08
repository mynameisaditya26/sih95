/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#dbe9ff',
          200: '#b3d4ff',
          300: '#7ab3ff',
          400: '#3d8bff',
          500: '#1465e6',
          600: '#0d4fc2',
          700: '#0b3f9c',
          800: '#0c357e',
          900: '#0f2f68',
          950: '#081b3d',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b1b9c9',
          400: '#8590a8',
          500: '#65728c',
          600: '#505b73',
          700: '#414a5e',
          800: '#38404f',
          900: '#232833',
          950: '#171a21',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.08)',
        pop: '0 8px 24px -4px rgba(16,24,40,0.15)',
      },
      keyframes: {
        fadein: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseSlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: .55 } },
        slidein: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
      animation: {
        fadein: 'fadein .25s ease-out',
        pulseSlow: 'pulseSlow 2s ease-in-out infinite',
        slidein: 'slidein .25s ease-out',
      },
    },
  },
  plugins: [],
}
