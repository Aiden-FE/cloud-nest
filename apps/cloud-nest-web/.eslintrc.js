module.exports = {
  root: true,
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: ['@compass-aiden/eslint-config/next', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
  },
};
