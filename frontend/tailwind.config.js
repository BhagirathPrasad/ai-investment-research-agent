/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Already supported via Tailwind default palette
      },
      animation: {
        blob: 'blob 7s infinite',
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        glow: {
          '0%, 100%': {
            opacity: '0.5',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(6, 182, 212, 0.5)',
        'glow-md': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-lg': '0 0 40px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
