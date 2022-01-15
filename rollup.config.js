// NOTE; This is for building the renderer code.
// This has nothing to do with electron.

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

const svelte_warnings = 
[
	'missing-declaration',
	'a11y-missing-attribute',
];

const JsonOutput = (options = {}) => 
{
	const dest = options.output;

	return {
		name: 'jsonoutput',

		transform(json, id) 
		{
			if (id.slice(-5) !== '.json') return null;

			let fileName = id.substring(id.lastIndexOf('/') + 1);
			fileName = fileName.replace('.json', '.js');
			
			this.emitFile({type: 'asset', fileName, source: json});
		},
	};
};

export default {
	input: 'src/renderer/src/index.js',

	output: {
		format: 'iife',
		dir: 'src/renderer/build/bundle/',
		name: 'Kingsfold',
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

		json(),

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
