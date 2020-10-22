// ./`rollup.config.js`

import typescript from 'rollup-plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import serve from 'rollup-plugin-serve'

import livereload from 'rollup-plugin-livereload'
import scss from 'rollup-plugin-scss'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    sourceMaps(),
    livereload(),
    scss(),
    // uglify(),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    })
  ],
  output: [
    {
      format: 'umd',
      file: 'lib/bundle.umd.js',
      name: 'TFullPage',
      sourcemap: true
    }
  ]
}
