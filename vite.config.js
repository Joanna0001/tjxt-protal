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
        target: "http://14.103.164.47:10010",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/img-tx/, '')
        }
      },
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor-vue'
            if (id.includes('vue-router')) return 'vendor-router'
            if (id.includes('element-plus')) return 'vendor-element'
            if (id.includes('echarts')) return 'vendor-echarts'
            if (id.includes('lodash')) return 'vendor-lodash'
            if (id.includes('moment')) return 'vendor-moment'
            if (id.includes('swiper')) return 'vendor-swiper'
            return 'vendor'
          }
        },
      },
    },
  },
})
