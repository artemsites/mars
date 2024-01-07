import autoprefixer from 'autoprefixer'
import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default {
  base: "./",

  plugins: [
    splitVendorChunkPlugin(),
    legacy({
    //   // targets: [
    //   //   // 'cover 99.5%',
    //   //   'defaults',
    //   //   'not dead',
    //   //   'iOS 12',
    //   //   'safari 12',
    //   // ],
    }),
  ],

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-browser.prod.js', // для браузера, без компиляции шаблонов
      // 'vue': 'vue/dist/vue.esm-browser.prod.js', // для браузера, без компиляции шаблонов
    },
  },

  define: {
  	// https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: true,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
  },

  build: {
    rollupOptions: {
      // 8.1 Как в vite.js удалить или изменить постфикс выходных файлов стилей, картиинок, шрифтов и т.п.   
      output: { 
        entryFileNames: `assets/[name].js`, 
        chunkFileNames: `assets/[name].js`, 
        // 8.2 Чтобы удалить хэш из имени файла нужно убрать ".[hash]" 
        assetFileNames: `assets/[name].[hash].[ext]` 
      }, 
    },
  },

  css: {
      postcss: {
        plugins: [
          autoprefixer({}) // add options if needed
        ]
    }
  }
}