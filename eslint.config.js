import globals from 'globals'
import ts from 'typescript-eslint'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier'

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
