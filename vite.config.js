// 项目配置页面
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

//配置参考 https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader()
  ],
  server: {
    port: 18082,
    proxy: {
      '/img-tx': {
        target: "http://localhost:10010",
        // target: "http://61.153.188.157:10010",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/img-tx/, '')
        }
      },
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          elementPlus: ['element-plus', '@element-plus/icons-vue'],
          moment: ['moment'],
          swiper: ['swiper'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
})
