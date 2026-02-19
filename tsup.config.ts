import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/piximps/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
})
