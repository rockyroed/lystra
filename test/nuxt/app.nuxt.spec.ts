import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '../../app/app.vue';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('should match snapshot', async () => {
    const wrapper = await mountSuspended(App, {
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
    const wrapper = await mountSuspended(App, {
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
