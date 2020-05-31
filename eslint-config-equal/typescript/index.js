
module.exports = {
  extends: 'standard-with-typescript',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json'
      },
      rules: {
        'import/order': ['error', {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index']
        }],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false
            }
          }
        ],
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': [
          'error',
          {
            asyncArrow: 'always',
            anonymous: 'always',
            named: 'never'
          }
        ],
        '@typescript-eslint/promise-function-async': ['error', {
          allowAny: false,
          checkArrowFunctions: false,
          checkFunctionDeclarations: false,
          checkFunctionExpressions: false,
          checkMethodDeclarations: false
        }]

      }
    }
  ]
}
