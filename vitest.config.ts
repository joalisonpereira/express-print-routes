import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['json-summary', 'lcov', 'text']
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
});
