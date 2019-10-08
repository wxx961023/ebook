module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 缩进
    'indent': 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
    'comma-dangle': 'off',
    'space-before-blocks': 'off',
    'keyword-spacing': 'off',
    'space-in-parens': 'off',
    'comma-spacing': 'off',
    'semi': 'off',
    'arrow-spacing': 'off',
    },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
