import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { composeVisitors } from 'lightningcss'
import { formatDate } from 'kitto'
import { breakpoints, fluid, size } from 'kitto/lightningcss'
import basicSsl from '@vitejs/plugin-basic-ssl'
import devtoolsJson from 'vite-plugin-devtools-json'

const { name, version } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

export default defineConfig({
	build: { cssMinify: 'lightningcss' },
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			drafts: { customMedia: true },
			visitor: composeVisitors([
				breakpoints({
					mobile: 640,
					tablet: 1024,
					laptop: 1280,
					desktop: 1440
				}),
				fluid({ vmax: 1600 }),
				size
			])
		}
	},
	define: {
		'import.meta.env.name': JSON.stringify(name),
		'import.meta.env.version': JSON.stringify(version),
		'import.meta.env.build': JSON.stringify(formatDate('{DD}-{MM}-{YYYY}@{HH}:{mm}:{ss}'))
	},
	plugins: [sveltekit(), basicSsl(), devtoolsJson()],
	resolve: { extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte'] },
	server: { proxy: {} }
})
