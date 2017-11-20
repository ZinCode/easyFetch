import babel from 'rollup-plugin-babel'
export default {
  input: 'fetch/fetch.js',
  output: {
    format: 'iife',
    file: 'dist/dist.js',
    name: 'easy'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
