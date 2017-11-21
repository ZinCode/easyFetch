module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': [2, 'only-multiline'],
    indent: [0, 2],
    'linebreak-style': [0, 'unix'],
    quotes: [2, 'single'],
    'no-useless-escape': [0],
    semi: [
      2,
      'always',
      {
        omitLastInOneLineBlock: true
      }
    ],
    'no-unused-vars': [1],
    'no-console': [
      2,
      {
        allow: ['warn', 'error']
      }
    ],
    'arrow-body-style': [0, 'never'],
    'arrow-parens': [
      0,
      'as-needed',
      {
        requireForBlockBody: false
      }
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never'
      }
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 2,
        maxEOF: 2
      }
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
