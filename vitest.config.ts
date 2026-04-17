import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e', 'tests'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      // web-push is an optional dependency not installed in all environments
      'web-push': path.resolve(__dirname, './__tests__/__mocks__/web-push.ts'),
    },
  },
})
