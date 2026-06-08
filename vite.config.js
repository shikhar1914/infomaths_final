import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        philosophy: resolve(__dirname, 'philosophy.html'),
        belief: resolve(__dirname, 'belief.html'),
        faculty: resolve(__dirname, 'faculty.html'),
        mcaEntrance: resolve(__dirname, 'mca-entrance.html'),
        iitJam: resolve(__dirname, 'iit-jam.html'),
        bankPoSsc: resolve(__dirname, 'bank-po-ssc.html'),
        contact: resolve(__dirname, 'contact.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
      },
    },
  },
})
