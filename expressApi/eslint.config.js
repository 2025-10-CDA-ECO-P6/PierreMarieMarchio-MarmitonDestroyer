const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: {
      console: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly',
      __dirname: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    ...prettier.rules,
  },
});
