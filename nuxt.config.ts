import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/test-utils',
    '@nuxt/test-utils/module',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt',
    ...(process.env.NODE_ENV !== 'test' ? ['@clerk/nuxt'] : []),
  ],

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: {
        style: 'background-color: #0E172B;',
      },
    },
  },
});
