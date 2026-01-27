import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    ValidateEnv({
      configFile: 'src/config/env',
    }),
    tailwindcss(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      prerender: {
        crawlLinks: true,
        enabled: true,
      },
      srcDirectory: 'src',
    }),
    viteReact(),
  ],
});
