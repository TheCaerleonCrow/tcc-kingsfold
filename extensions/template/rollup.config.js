import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import Package from './package.json';
import Extension from './extension.json';

const production = !process.env.ROLLUP_WATCH;

const svelte_warnings = 
[
	'missing-declaration',
	'a11y-missing-attribute',
];

export default {
	input: 'src/index.js',

	output: {
		format: 'iife',
		dir: 'build/bundle/',
		name: Extension.name,
	},

	plugins: [
		svelte({
			compilerOptions: {
				dev: !production,
			},

			onwarn: (warning, handler) =>
			{
				if (svelte_warnings.find(e => e==warning.code) !== undefined) return;
				handler(warning);
			},
		}),

		css({ 
			output: 'index.css',
		}),

		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),

		commonjs(),
		production && terser(),
	],

	watch: {
		clearScreen: false,
	},
};