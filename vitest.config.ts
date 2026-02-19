import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/piximps/index.ts'],
    },
  },
  resolve: {
    alias: {
      '@piximps': path.resolve(__dirname, './src/piximps'),
    },
  },
})
