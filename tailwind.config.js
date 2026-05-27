/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Barlow"', 'sans-serif'],
        display: ['"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        surface2: '#1a1a1a',
        border: '#2a2a2a',
        red: '#c0392b',
        'red-hover': '#e74c3c',
        muted: '#666666',
        light: '#e8e8e8',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.4)',
        modal: '0 24px 80px rgba(0,0,0,0.7)',
        red: '0 4px 20px rgba(192,57,43,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
