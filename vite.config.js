import autoprefixer from 'autoprefixer'

export default {
  css: {
      postcss: {
        plugins: [
          autoprefixer({}) // add options if needed
        ]
    }
  }
}