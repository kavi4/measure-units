import {terser} from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'

export default {
    input: 'index.js',
    output: [
        {
            file: 'dist/bundle.esm.js',
            format: 'es'
        },
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/bundle.min.js',
            format: 'iife',
            name: 'measureUnits',
            plugins: [terser()]
        }
    ],
    plugins: [babel({ babelHelpers: 'bundled' })]
};
