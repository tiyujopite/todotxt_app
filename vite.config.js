import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { promises as fs} from 'fs'


function after_build(callback) {
  return { name: 'after_build', apply: 'build', closeBundle: callback }
}

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: [
    'CHANGELOG.md',
  ],
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['relative-time'].includes(tag),
        }
      }
    }),
    after_build(async () => {
      await fs.copyFile('CHANGELOG.md', 'dist/CHANGELOG.md')
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
