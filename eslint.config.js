import prettier from 'eslint-config-prettier'
import js from '@eslint/js'
import { includeIgnoreFile } from '@eslint/compat'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			camelcase: [
				'error',
				{
					properties: 'always',
					ignoreDestructuring: false,
					ignoreImports: false,
					ignoreGlobals: false
				}
			],
			'id-match': [
				'error',
				'^([a-z]+([A-Z][a-z]+)*)|([A-Z][a-z]+([A-Z][a-z]+)*)|(^\\$[a-z]+([A-Z][a-z]+)*)$',
				{
					properties: true,
					onlyDeclarations: true
				}
			],
			'id-length': [
				'error',
				{
					min: 2,
					exceptions: ['i', 'j', 'x', 'y']
				}
			],
			'new-cap': [
				'error',
				{
					newIsCap: true,
					capIsNew: false,
					properties: true
				}
			],
			'no-underscore-dangle': [
				'error',
				{
					allowAfterThis: true,
					enforceInMethodNames: true
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
)
