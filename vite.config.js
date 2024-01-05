import autoprefixer from 'autoprefixer'
import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default {
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