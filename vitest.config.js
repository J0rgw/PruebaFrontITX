import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/services/**/*.{js,jsx}',
        'src/components/**/*.{js,jsx}',
      ],
      exclude: [
        'node_modules/',
        'src/test/',
        'e2e/',
        '**/*.config.js',
        '**/main.jsx',
        '**/*.test.{js,jsx}',
        '**/dist/**',
        'src/microfrontends/**',
        'src/App.jsx'
      ],
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 70,
        statements: 75
      }
    }
  }
})
