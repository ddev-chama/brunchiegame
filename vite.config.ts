import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    ViteImageOptimizer({
      /* pass your config */
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
              },
              cleanupIDs: {
                minify: true,
                remove: true,
              },
              convertPathData: false,
            },
          }
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 50,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 50,
      },
      cache: false,
      cacheLocation: undefined,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://brunchtime.org/wp-json/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // remove /api prefix when forwarding
      },
      '/core-api': {
        target: 'https://core-api.diamondgrains-staging.brunchtimeshop.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/core-api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
