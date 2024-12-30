// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    languageOptions: {
      globals: {
        defineNuxtConfig: 'readonly',
      },

    },
    rules: {
      'vue/multi-word-component-names': 'off',
      // 'vue/no-multiple-template-root': 'off',
    },
  },
)
