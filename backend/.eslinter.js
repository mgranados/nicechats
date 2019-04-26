module.exports = {
  extends: 'airbnb',
  rules: {
    'arrow-parens': ['error', 'always'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
};
