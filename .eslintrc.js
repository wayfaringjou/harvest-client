module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/camelcase': 'off',
  },
};
