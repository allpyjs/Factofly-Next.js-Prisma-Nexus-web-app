// This is a workaround for https://github.com/eslint/eslint/issues/3458
// require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  // extends: ['@rushstack/eslint-config/mixins/react', '@rushstack/eslint-config/profile/web-app'],
  // extends: ['next', 'prettier'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier', 'plugin:@next/next/recommended'],
  plugins: ['prettier'],
  ignorePatterns: ['**/.generated/*.*', 'jest.config.js'],
  settings: {
    next: {
      rootDir: 'apps/factofly-web-app/'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.eslint.json']
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // nextjs adds react to jsx/tsx scopes
    'react/require-default-props': 'off', // ['error', { functions: 'defaultArguments' }], // TODO: This is causing an unknown error which needs to be fixed.
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],

    'import/extensions': 'off',
    'no-restricted-exports': 'off',
    'class-methods-use-this': 'off' // apollo dataSources use class methods without this
  },
  overrides: [
    {
      files: ['src/server/**/*'],
      rules: {
        '@typescript-eslint/no-floating-promises': ['error']
      }
    }
  ]
};
