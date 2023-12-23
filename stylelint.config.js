export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'property-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'v-bind',
          'map-get',
          'lighten',
          'darken',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          '/^view-transition/',
        ],
      },
    ],
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,
    '@stylistic/max-line-length': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
  },
  allowEmptyInput: true,
  ignoreFiles: [
    'node_modules/**/*',
    'dist*/**/*',
  ],
}
