module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'warn',
    'max-len': 'off',
    'import/no-duplicates': 'off',
    semi: 'warn',
    'no-lonely-if': 'off',
    'vue/no-custom-modifiers-on-v-model': 'off',
    'no-unused-vars': 'warn',
    'vue/no-mutating-props': 'off',
  },
};
