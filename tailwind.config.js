/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:        '#1A1A1A',   // Bloomberg charcoal (nav, footer)
          panel:       '#F7F7F5',   // sidebar bg
          border:      '#E0E0E0',   // panel edge
          blue:        '#0052CC',   // Bloomberg blue (links)
          'blue-dark': '#003D99',   // link hover
          'blue-mid':  '#0052CC',   // borders / focus rings
          'blue-pale': 'rgba(0,82,204,0.08)',   // tints / selected states
          white:       '#FFFFFF',   // surface
          link:        '#0052CC',   // link color
          muted:       '#888888',   // secondary / muted text
          dim:         '#AAAAAA',   // disclaimer / fine print
          sep:         '#E8E8E8',   // separator
          surface:     '#FFFFFF',   // main bg
          'surface-2': '#F5F5F5',   // alt bg
          ink:         '#1A1A1A',   // heading text
          'ink-2':     '#555555',   // body text
          gray:        '#888888',
          'text-secondary': '#555555',
          'text-muted': '#888888',
          // Bloomberg CTA orange
          cta:         '#E65C00',
          'cta-hover': '#CC4F00',
        },
        // Data / status colors (unchanged)
        data: {
          positive:    '#15803D',
          negative:    '#B91C1C',
          neutral:     '#B45309',
          'bg-pos':    'rgba(21,128,61,0.08)',
          'bg-neg':    'rgba(185,28,28,0.08)',
          'bg-neu':    'rgba(180,83,9,0.08)',
        },
        // Legacy compat — mapped to Bloomberg tokens
        navy: { DEFAULT: '#1A1A1A', dark: '#111111', light: '#333333' },
        midnight: { DEFAULT: '#1A1A1A', 50: '#0052CC', 100: '#E65C00', 200: '#CC4F00', 800: '#F5F5F5', 900: '#1A1A1A' },
        outcome: {
          win: '#15803D',
          'win-bg': 'rgba(21,128,61,0.08)',
          'win-border': 'rgba(21,128,61,0.25)',
          loss: '#B91C1C',
          'loss-bg': 'rgba(185,28,28,0.08)',
          'loss-border': 'rgba(185,28,28,0.25)',
          mixed: '#B45309',
          'mixed-bg': 'rgba(180,83,9,0.08)',
          'mixed-border': 'rgba(180,83,9,0.25)',
          neutral: '#888888',
          'neutral-bg': 'rgba(0,0,0,0.03)',
          'neutral-border': 'rgba(0,0,0,0.08)',
        },
        // Bloomberg-specific
        bl: {
          nav:       '#1A1A1A',
          surface:   '#FFFFFF',
          'surface-alt': '#F5F5F5',
          link:      '#0052CC',
          cta:       '#E65C00',
          'cta-hover': '#CC4F00',
          divider:   '#E8E8E8',
          sidebar:   '#F7F7F5',
          'row-hover': '#EFF5FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
        data: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.07em' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.09em' }],
        'data-lg': ['2rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'data-sm': ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'brand-display': ['56px', { lineHeight: '1.05', letterSpacing: '-2.5px', fontWeight: '800' }],
        'brand-h1': ['22px', { lineHeight: '1.2', letterSpacing: '-0.3px', fontWeight: '800' }],
        'brand-h2': ['17px', { lineHeight: '1.3', letterSpacing: '-0.1px', fontWeight: '700' }],
        'brand-h3': ['15px', { lineHeight: '1.4', fontWeight: '700' }],
        'brand-body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'brand-label': ['11px', { lineHeight: '1', letterSpacing: '0.08em', fontWeight: '600' }],
        'brand-data': ['13px', { lineHeight: '1', letterSpacing: '0', fontWeight: '400' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 6px rgba(0,0,0,0.08)',
        'card-elevated': '0 4px 12px rgba(0,0,0,0.08)',
        'glow-accent': '0 2px 12px rgba(230,92,0,0.15)',
        glass: '0 1px 3px rgba(0,0,0,0.06)',
        accent: '0 2px 8px rgba(230,92,0,0.15)',
        'accent-lg': '0 4px 16px rgba(230,92,0,0.20)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.04)',
        'brand-nav': '0 1px 3px rgba(0,0,0,0.08)',
        'brand-mock': '0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)',
        'brand-card': '0 1px 3px rgba(0,0,0,0.06)',
        'brand-btn': '0 2px 6px rgba(230,92,0,0.20)',
        'brand-btn-lg': '0 4px 12px rgba(230,92,0,0.25)',
      },
      spacing: {
        '0':  '0px',
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '6':  '24px',
        '7':  '28px',
        '8':  '32px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
      },
      borderRadius: {
        'btn': '3px',     // Bloomberg tight rectangular buttons
        'card': '4px',    // Bloomberg near-flat cards
        'icon': '36%',
        sm: '2px',
        md: '3px',
        lg: '4px',
        xl: '4px',
        full: '9999px',
        badge: '2px',
        pill: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'draw': 'draw 1.5s ease forwards',
        'count': 'countUp 0.4s ease forwards',
        'bar-fill': 'barFill 1.2s ease forwards',
        'fade-up': 'fadeUp 0.45s ease-out forwards',
        'scale-in': 'scaleIn 0.25s ease-out forwards',
        'slide-in-right': 'slideInRight 0.35s ease forwards',
        'slide-in-left': 'slideInLeft 0.35s ease forwards',
        shimmer: 'shimmer 1.8s infinite linear',
        marquee: 'marquee 60s linear infinite',
        'page-enter': 'pageEnterTw 0.15s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'none' } },
        draw: { from: { strokeDashoffset: 'var(--circumference)' }, to: { strokeDashoffset: 'var(--offset)' } },
        countUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        barFill: { from: { width: '0%' }, to: { width: 'var(--target-width)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideInRight: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        slideInLeft: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pageEnterTw: { from: { opacity: '0.99' }, to: { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
