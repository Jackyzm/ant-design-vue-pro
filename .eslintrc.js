// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: 'plugin:vue/strongly-recommended',
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-indent': [0],
    'vue/max-attributes-per-line': [0],
    'vue/attribute-hyphenation': [0],
    'vue/html-self-closing': [0],
    'vue/require-default-prop': [0],
    'no-unused-vars': [2],
    'no-use-before-define': [2],
    camelcase: [2],
    'no-duplicate-imports': [2],
    'no-const-assign': [2],
    'no-var': [2],
    'prefer-const': [2],
    'vue/singleline-html-element-content-newline': [0],
    'vue/html-quotes': [0],
    'vue/html-closing-bracket-spacing': [0],
    'vue/multiline-html-element-content-newline': [0]
  }
};
