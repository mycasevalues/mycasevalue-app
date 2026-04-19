import localFont from 'next/font/local'

/* Legacy font aliases — kept as thin wrappers for backward compat */
export const jakarta = localFont({
  src: [
    { path: '../public/fonts/outfit-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/outfit-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-jakarta',
})

export const inter = localFont({
  src: [
    { path: '../public/fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-600.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
})

export const plexMono = localFont({
  src: [
    { path: '../public/fonts/ibm-plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/ibm-plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const baskerville = localFont({
  src: [
    { path: '../public/fonts/libre-baskerville-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/libre-baskerville-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-baskerville',
})

export const sourceSans = localFont({
  src: [
    { path: '../public/fonts/source-sans-3-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/source-sans-3-600.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
})

export const fontVariables = [
  jakarta.variable,
  inter.variable,
  plexMono.variable,
  baskerville.variable,
  sourceSans.variable,
].join(' ')
