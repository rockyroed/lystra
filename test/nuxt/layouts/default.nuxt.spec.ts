import { mountSuspended } from '@nuxt/test-utils/runtime';
import DefaultLayout from '../../../app/layouts/default.vue';
import { describe, expect, it } from 'vitest';

describe('DefaultLayout', () => {
  it('should match snapshot', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render properly', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  // TODO: Add more tests as needed
});
