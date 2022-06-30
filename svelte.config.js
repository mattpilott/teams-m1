import adapter from '@sveltejs/adapter-auto'
import { readFileSync } from 'fs'
import path from 'path'

const { version } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

/** @type {import('@sveltejs/kit').Config} */
export default {
   kit: {
      adapter: adapter(),
      trailingSlash: 'always',
      vite: {
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
   }
}