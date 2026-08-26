/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#090A0F', // deep background
          900: '#0F1017', // canvas dark
          850: '#151622', // elevated layer
          800: '#1C1C28', // Behance primary deep navy
          700: '#272838', // subtle surface
          600: '#38394E', // borders dark
        },
        cyan: {
          DEFAULT: '#1EC1CB', // Behance primary cyan accent
          hover: '#26D3DE',
          muted: '#14868D',
          glow: 'rgba(30, 193, 203, 0.25)',
          subtle: 'rgba(30, 193, 203, 0.08)',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#F1F5F9',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(30, 193, 203, 0.3)',
        'glow-cyan-sm': '0 0 15px -3px rgba(30, 193, 203, 0.2)',
        'card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-light': '0 8px 30px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
