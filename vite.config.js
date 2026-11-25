import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlAsset = bundle['index.html']
      if (!htmlAsset || htmlAsset.type !== 'asset') return

      let html = htmlAsset.source.toString()
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && asset.type === 'asset') {
          const cssTagRegex = new RegExp(
            `<link[^>]*href=["']/?${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
            'g'
          )
          if (cssTagRegex.test(html)) {
            html = html.replace(cssTagRegex, `<style>${asset.source}</style>`)
            delete bundle[fileName]
          }
        }
      }
      htmlAsset.source = html
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), inlineCssPlugin()],
})
