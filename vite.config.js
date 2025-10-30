// 项目配置页面
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const CWD = process.cwd();

//配置参考 https://vitejs.dev/config/
export default defineConfig((mode) => {
  // const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
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
      host: '0.0.0.0',
      proxy: {
        '/img-tx': {
          // target:  'http://117.72.198.60/',
          target: "http://localhost:10010",
          changeOrigin: true,
          // rewrite: (path) => {
          //   return path.replace(/^\/img-tx/, '')
          // }
        },
        '/mock/3359':{
          target: 'http://172.17.0.137:8321/mock/3359',
          changeOrigin: true,
        }
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
  }
})
