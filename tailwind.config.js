/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0A0A0A',
          surface: '#111118',
          elevated: '#16161F',
          border: '#1E1E2A',
          'border-bright': '#2A2A3A',
          cyan: '#00E5FF',
          'cyan-dim': '#0099AA',
          green: '#00FF41',
          'green-dim': '#00AA2C',
          amber: '#FFB300',
          'amber-dim': '#AA7800',
          red: '#FF3E3E',
          'red-dim': '#AA2222',
          muted: '#5A5A6A',
          text: '#D0D0E0',
          'text-dim': '#808090',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Roboto Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'flicker': 'flicker 0.15s ease-in-out',
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'progress-fill': 'progressFill 1.5s ease-out forwards',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress, 100%)' },
        },
      },
    },
  },
  plugins: [],
};
