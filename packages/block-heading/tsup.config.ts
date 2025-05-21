import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  splitting: false,
  dts: true,
  sourcemap: true,
  clean: true,
});
