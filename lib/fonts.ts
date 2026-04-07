import localFont from 'next/font/local'

export const jakarta = localFont({
  src: [
    { path: '../public/fonts/outfit-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/outfit-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/outfit-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/outfit-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/outfit-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/outfit-800.woff2', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-jakarta',
})

export const inter = localFont({
  src: [
    { path: '../public/fonts/inter-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
})

export const plexMono = localFont({
  src: [
    { path: '../public/fonts/jetbrains-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/jetbrains-mono-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/jetbrains-mono-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/jetbrains-mono-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const fontVariables = [
  jakarta.variable,
  inter.variable,
  plexMono.variable,
].join(' ')
