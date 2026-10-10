import {defineConfig} from 'astro/config'
import preact from '@astrojs/preact'

export default defineConfig({
	srcDir: './src/ui',
	base: './',
	trailingSlash: 'never',
	build: {
		format: 'file',
		assetsPrefix: './',
		sourcemap: false,
	},
	devToolbar: {
		enabled: false
	},
	integrations: [
		preact(),
	],
})
