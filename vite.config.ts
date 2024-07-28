/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './setup.ts',
    coverage: {
      exclude: [
        'src/**/index.tsx',
        'src/**/index.ts',
        'src/**/*.ts',
        '.eslintrc.cjs',
        'vite.config.ts',
        'src/main.tsx',
      ],
    },
  },
});
