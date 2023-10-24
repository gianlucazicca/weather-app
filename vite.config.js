import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
      }
      /*{
      registerType: 'autoUpdate',
      mode: 'development',
      base: '/',
      devOptions: {
        enabled: true,
      },
      srcDir: 'src',
      strategies: 'injectManifest',
      manifest: {
        theme_color: '#50e3c2',
        background_color: '#50e3c2',
        display: 'fullscreen',
        scope: '/',
        start_url: '/',
        name: 'ios weather app clone',
        short_name: 'weather app',
        description: 'description',
        icons: [
          {
            src: './src/assets/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './src/assets/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: './src/assets/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: './src/assets/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }*/
    ),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
});
