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
          navy:        '#0966C3',   // page bg / dark section bg
          panel:       '#274464',   // raised card on dark
          border:      '#284565',   // panel edge on dark
          blue:        '#0966C3',   // primary CTA
          'blue-dark': '#004182',   // button hover
          'blue-mid':  '#1577D5',   // borders / focus rings
          'blue-pale': '#E8F4FD',   // tints / selected states
          white:       '#FFFFFF',   // section headers
          link:        '#E5E7EB',   // nav links / body on dark
          muted:       'rgba(213,216,220,0.6)',   // secondary / copyright
          dim:         'rgba(213,216,220,0.35)',   // disclaimer / fine print
          sep:         'rgba(213,216,220,0.4)',    // | separator
          // Light surface (for non-dark sections)
          surface:     '#F7F8FA',
          'surface-2': '#EEF0F4',
          ink:         '#0f0f0f',   // heading text on white
          'ink-2':     '#0f0f0f',   // body text on white
          gray:        '#4B5563',
          'text-secondary': '#4B5563',
          'text-muted': '#9CA3AF',
        },
        // Data / status colors
        data: {
          positive:    '#15803D',
          negative:    '#B91C1C',
          neutral:     '#B45309',
          'bg-pos':    '#F0FDF4',
          'bg-neg':    '#FEF2F2',
          'bg-neu':    '#FFFBEB',
        },
        // Legacy compat — mapped to brand tokens (consolidated)
        navy: { DEFAULT: '#0966C3', dark: '#004182', light: '#1577D5' },
        midnight: { DEFAULT: '#0966C3', 50: '#1577D5', 100: '#0966C3', 200: '#004182', 800: '#F7F8FA', 900: '#FFFFFF' },
        outcome: {
          win: '#15803D',
          'win-bg': '#F0FDF4',
          'win-border': 'rgba(21,128,61,0.25)',
          loss: '#B91C1C',
          'loss-bg': '#FEF2F2',
          'loss-border': 'rgba(185,28,28,0.25)',
          mixed: '#B45309',
          'mixed-bg': '#FFFBEB',
          'mixed-border': 'rgba(180,83,9,0.25)',
          neutral: '#9CA3AF',
          'neutral-bg': '#F7F8FA',
          'neutral-border': '#D1D5DB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
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
        'brand-h1': ['36px', { lineHeight: '1.1', letterSpacing: '-1.2px', fontWeight: '800' }],
        'brand-h2': ['24px', { lineHeight: '1.2', letterSpacing: '-0.6px', fontWeight: '700' }],
        'brand-h3': ['18px', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '700' }],
        'brand-body': ['15px', { lineHeight: '1.7', fontWeight: '400' }],
        'brand-label': ['10px', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
        'brand-data': ['26px', { lineHeight: '1', letterSpacing: '-0.5px', fontWeight: '600' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)',
        'card-elevated': '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
        'glow-accent': '0 2px 12px rgba(124,58,237,0.15)',
        glass: '0 1px 3px rgba(0,0,0,0.08)',
        accent: '0 2px 8px rgba(124,58,237,0.15)',
        'accent-lg': '0 4px 16px rgba(124,58,237,0.20)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.06)',
        'brand-nav': '0 1px 3px rgba(0,0,0,.07), 0 8px 28px rgba(0,0,0,.10), 0 32px 72px rgba(0,0,0,.09)',
        'brand-mock': '0 2px 8px rgba(0,0,0,.07), 0 16px 40px rgba(6,13,26,.12), 0 40px 72px rgba(6,13,26,.09)',
        'brand-card': '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)',
        'brand-btn': '0 3px 12px rgba(10,102,194,.22)',
        'brand-btn-lg': '0 4px 18px rgba(10,102,194,.28)',
      },
      spacing: {
        // Base-8 scale — use these values only, no arbitrary spacing
        '0':  '0px',
        '1':  '4px',    // Micro — icon-to-label gaps
        '2':  '8px',    // XS — inline spacing
        '3':  '12px',   // SM — nav link stack gap
        '4':  '16px',   // MD — default padding
        '6':  '24px',   // LG — card internal padding
        '7':  '28px',   // CTA box vertical padding
        '8':  '32px',   // XL — component gaps
        '12': '48px',   // 2XL — content section gaps
        '14': '56px',   // Grid — footer column gap
        '16': '64px',   // Page — footer top padding
      },
      borderRadius: {
        'btn': '20px',    // pill — all primary buttons
        'card': '12px',   // cards, panels, CTA box
        'icon': '36%',    // cube mark tile only
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
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
          navy:        '#0966C3',
          panel:       '#274464',
          border:      '#284565',
          blue:        '#0966C3',
          'blue-dark': '#004182',
          'blue-mid':  '#1577D5',
          'blue-pale': '#E8F4FD',
          white:       '#FFFFFF',
          link:        '#E5E7EB',
          muted:       'rgba(213,216,220,0.6)',
          dim:         'rgba(213,216,220,0.35)',
          sep:         'rgba(213,216,220,0.4)',
          surface:     '#F7F8FA',
          'surface-2': '#EEF0F4',
          ink:         '#0f0f0f',
          'ink-2':     '#0f0f0f',
          gray:        '#4B5563',
          'text-secondary': '#4B5563',
          'text-muted': '#9CA3AF',
        },
        data: {
          positive: '#15803D',
          negative: '#B91C1C',
          neutral:  '#B45309',
          'bg-pos': '#F0FDF4',
          'bg-neg': '#FEF2F2',
          'bg-neu': '#FFFBEB',
        },
        navy: { DEFAULT: '#0966C3', dark: '#004182', light: '#1577D5' },
        midnight: { DEFAULT: '#0966C3', 50: '#1577D5', 100: '#0966C3', 200: '#004182', 800: '#F7F8FA', 900: '#FFFFFF' },
        outcome: {
          win: '#15803D',
          'win-bg': '#F0FDF4',
          'win-border': 'rgba(21,128,61,0.25)',
          loss: '#B91C1C',
          'loss-bg': '#FEF2F2',
          'loss-border': 'rgba(185,28,28,0.25)',
          mixed: '#B45309',
          'mixed-bg': '#FFFBEB',
          'mixed-border': 'rgba(180,83,9,0.25)',
          neutral: '#9CA3AF',
          'neutral-bg': '#F7F8FA',
          'neutral-border': '#D1D5DB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
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
        'brand-h1': ['36px', { lineHeight: '1.1', letterSpacing: '-1.2px', fontWeight: '800' }],
        'brand-h2': ['24px', { lineHeight: '1.2', letterSpacing: '-0.6px', fontWeight: '700' }],
        'brand-h3': ['18px', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '700' }],
        'brand-body': ['15px', { lineHeight: '1.7', fontWeight: '400' }],
        'brand-label': ['10px', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '600' }],
        'brand-data': ['26px', { lineHeight: '1', letterSpacing: '-0.5px', fontWeight: '600' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)',
        'card-elevated': '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
        'glow-accent': '0 2px 12px rgba(124,58,237,0.15)',
        glass: '0 1px 3px rgba(0,0,0,0.08)',
        accent: '0 2px 8px rgba(124,58,237,0.15)',
        'accent-lg': '0 4px 16px rgba(124,58,237,0.20)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.06)',
        'brand-nav': '0 1px 3px rgba(0,0,0,.07), 0 8px 28px rgba(0,0,0,.10), 0 32px 72px rgba(0,0,0,.09)',
        'brand-mock': '0 2px 8px rgba(0,0,0,.07), 0 16px 40px rgba(6,13,26,.12), 0 40px 72px rgba(6,13,26,.09)',
        'brand-card': '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)',
        'brand-btn': '0 3px 12px rgba(10,102,194,.22)',
        'brand-btn-lg': '0 4px 18px rgba(10,102,194,.28)',
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
        'btn': '20px',
        'card': '12px',
        'icon': '36%',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
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
