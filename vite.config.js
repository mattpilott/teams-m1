import { sveltekit } from '@sveltejs/kit/vite'
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

export default {
   plugins: [sveltekit()],
   define: {
      'process.env.version': JSON.stringify(version)
   },
   resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
   },
   ssr: {
      noExternal: ['@neuekit/utils']
   }
}