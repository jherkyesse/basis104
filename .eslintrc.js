module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
