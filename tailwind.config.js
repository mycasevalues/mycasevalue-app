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
          navy:        '#1B2D45',   // Westlaw deep navy (nav, footer)
          panel:       '#F9F8F6',   // sidebar bg
          border:      '#E2DFD8',   // panel edge
          blue:        '#0A50A2',   // Westlaw blue (links)
          'blue-dark': '#083A7A',   // link hover
          'blue-mid':  '#0A50A2',   // borders / focus rings
          'blue-pale': 'rgba(10,80,162,0.08)',   // tints / selected states
          white:       '#FFFFFF',   // surface
          link:        '#0A50A2',   // link color
          muted:       '#8AAAC8',   // secondary / muted text
          dim:         '#A8A6A0',   // disclaimer / fine print
          sep:         '#E2DFD8',   // separator
          surface:     '#FFFFFF',   // main bg
          'surface-2': '#F6F5F2',   // alt bg (Westlaw --surf)
          ink:         '#18181A',   // heading text
          'ink-2':     '#42403C',   // body text
          gray:        '#78766C',
          'text-secondary': '#42403C',
          'text-muted': '#78766C',
          // Westlaw gold CTA (replaces Bloomberg orange)
          cta:         '#C4882A',
          'cta-hover': '#A87222',
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
        // Legacy compat — mapped to Westlaw tokens
        navy: { DEFAULT: '#1B2D45', dark: '#121F32', light: '#2A3F58' },
        midnight: { DEFAULT: '#1B2D45', 50: '#0A50A2', 100: '#C4882A', 200: '#A87222', 800: '#F6F5F2', 900: '#1B2D45' },
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
        // Westlaw-specific (legacy bl.* names preserved for compat)
        bl: {
          nav:       '#1B2D45',
          surface:   '#FFFFFF',
          'surface-alt': '#F6F5F2',
          link:      '#0A50A2',
          cta:       '#C4882A',
          'cta-hover': '#A87222',
          divider:   '#E2DFD8',
          sidebar:   '#F9F8F6',
          'row-hover': '#EEF2FA',
        },
      },
      fontFamily: {
        serif: ['var(--font-baskerville)', 'Libre Baskerville', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Source Sans 3', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['var(--font-sans)', 'Source Sans 3', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
        data: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
        inter: ['var(--font-ui)', 'Source Sans 3', 'Inter', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
        baskerville: ['var(--font-baskerville)', 'Libre Baskerville', 'Georgia', 'serif'],
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
        'glow-accent': '0 2px 12px rgba(196,136,42,0.15)',
        glass: '0 1px 3px rgba(0,0,0,0.06)',
        accent: '0 2px 8px rgba(196,136,42,0.15)',
        'accent-lg': '0 4px 16px rgba(196,136,42,0.20)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.04)',
        'brand-nav': '0 1px 3px rgba(0,0,0,0.08)',
        'brand-mock': '0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)',
        'brand-card': '0 1px 3px rgba(0,0,0,0.06)',
        'brand-btn': '0 2px 6px rgba(196,136,42,0.20)',
        'brand-btn-lg': '0 4px 12px rgba(196,136,42,0.25)',
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
