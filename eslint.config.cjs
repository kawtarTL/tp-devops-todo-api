/** @type {import('eslint').Linter.Config} */
module.exports = [
  {
    files: ['*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      // Ajoute ici tes règles personnalisées
    },
  },
];
