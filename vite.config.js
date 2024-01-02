import autoprefixer from 'autoprefixer'
import { splitVendorChunkPlugin } from 'vite'

export default {
  plugins: [splitVendorChunkPlugin()],

  build: {
    rollupOptions: {
      // 8.1 Как в vite.js удалить или изменить постфикс выходных файлов стилей, картиинок, шрифтов и т.п.   
      output: { 
        entryFileNames: `assets/[name].js`, 
        chunkFileNames: `assets/[name].js`, 
        // 8.2 Чтобы удалить хэш из имени файла нужно убрать ".[hash]" 
        assetFileNames: `assets/[name].[ext]` 
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