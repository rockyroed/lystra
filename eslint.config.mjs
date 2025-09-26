// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-console': 'error',
    'vue/html-self-closing': 'off',
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
  },
});
