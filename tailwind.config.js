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
        // Neumorphism color palette
        neumorph: {
          light: {
            bg: '#e0e5ec',
            shadow: {
              dark: '#a3b1c6',
              light: '#ffffff',
            },
          },
          dark: {
            bg: '#2c3e50',
            shadow: {
              dark: '#1a2634',
              light: '#3e5266',
            },
          },
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        // Neumorphism shadows
        'neumorph': '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
        'neumorph-inset': 'inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff',
        'neumorph-sm': '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff',
        'neumorph-lg': '12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff',
        'neumorph-dark': '8px 8px 16px #1a2634, -8px -8px 16px #3e5266',
        'neumorph-dark-inset': 'inset 8px 8px 16px #1a2634, inset -8px -8px 16px #3e5266',
        'neumorph-dark-sm': '4px 4px 8px #1a2634, -4px -4px 8px #3e5266',
        'neumorph-dark-lg': '12px 12px 24px #1a2634, -12px -12px 24px #3e5266',
      },
      borderRadius: {
        'neumorph': '20px',
        'neumorph-sm': '12px',
        'neumorph-lg': '30px',
      },
      animation: {
        'press': 'press 0.15s ease-in-out',
      },
      keyframes: {
        press: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
        },
      },
    },
  },
  plugins: [],
}
