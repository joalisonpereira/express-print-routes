import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src',
    '!src/**/*.spec.*',
    '!src/tests/**',
    '!src/mocks/*.ts',
    '!src/@types/**.d.ts'
  ],
  splitting: false,
  sourcemap: false,
  clean: false,
  dts: false
});
