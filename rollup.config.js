export default {
  entry: 'fetch/fetch.js',
  targets: [
    {
      dest: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/bundle.umd.js',
      format: 'umd',
      moduleName: 'res'
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es'
    }
  ]
};
