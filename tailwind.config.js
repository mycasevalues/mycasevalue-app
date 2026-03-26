/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#0B1221', 50: '#F0F2F5', 100: '#D8DCE4', 200: '#A8B0C0', 800: '#162035', 900: '#0B1221' },
        cream: { DEFAULT: '#FDFBF7', 100: '#FDFBF7', 200: '#F2EBD9' },
        gold: { DEFAULT: '#B8923A', light: '#F5EDD8', dark: '#9A7520' },
        emerald: { DEFAULT: '#0D9488', light: '#CCFBF1', dark: '#0D9488' },
        coral: { DEFAULT: '#E87461', light: '#FEE2E2', dark: '#C0392B' },
        steel: { DEFAULT: '#64748B', light: '#F1F5F9', dark: '#334155' },
      },
      fontFamily: {
        display: ['"Newsreader"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
        data: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'draw': 'draw 1.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'count': 'countUp 0.4s ease forwards',
        'glow-pulse': 'glowPulse 3s ease infinite',
        'bar-fill': 'barFill 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(32px)' }, to: { opacity: 1, transform: 'none' } },
        draw: { from: { strokeDashoffset: 'var(--circumference)' }, to: { strokeDashoffset: 'var(--offset)' } },
        countUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(184,146,58,0.08)' }, '50%': { boxShadow: '0 0 40px rgba(184,146,58,0.16)' } },
        barFill: { from: { width: '0%' }, to: { width: 'var(--target-width)' } },
      },
    },
  },
  plugins: [],
};
