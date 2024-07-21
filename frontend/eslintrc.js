module.exports = {
    extends: [
      'eslint:recommended',
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended', 
      'plugin:react-hooks/recommended', 
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      'ecmaVersion': 2021,
      'sourceType': 'module',
    },
    plugins: [
      '@typescript-eslint',
      'react',
      'react-hooks',
      'prettier'
    ],
    rules: {
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      'react/jsx-uses-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error', // Ensure hooks are called in the right order
      'react-hooks/exhaustive-deps': 'warn', // Ensure dependencies in useEffect are correct
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'prettier/prettier': 'error'
    },  
    settings: {
      react: {
        version: 'detect',
      },
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parserOptions: {
          project: './tsconfig.json',
        },
      },
    ],
  }