import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    env: {
      NODE_ENV: 'test',
      NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_fake_key',
      NUXT_CLERK_SECRET_KEY: 'sk_test_fake_key',
    },
  },
});
