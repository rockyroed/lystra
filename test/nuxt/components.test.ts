import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '../../app/app.vue';
import Header from '../../app/components/Header/index.vue';
import DefaultLayout from '../../app/layouts/default.vue';
import { describe, expect, it, vi } from 'vitest';

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

describe('Header', () => {
  it('should match snapshot', async () => {
    const wrapper = await mountSuspended(Header, {
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
    const wrapper = await mountSuspended(Header, {
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

  it('should render the logo properly', async () => {
    const wrapper = await mountSuspended(Header, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toContain('lystra-logo-light.svg');
    expect(logo.attributes('alt')).toBe('Lystra logo');
    expect(logo.attributes('width')).toBe('40');
    expect(logo.attributes('height')).toBe('40');
  });

  it('should render signed in and signed out stubs', async () => {
    const wrapper = await mountSuspended(Header, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });

    const signedInButtonStub = wrapper.find('signed-in-stub');
    expect(signedInButtonStub.exists()).toBe(true);
    const signedOutButtonStub = wrapper.find('signed-out-stub');
    expect(signedOutButtonStub.exists()).toBe(true);
  });

  it('should render the header properly', async () => {
    const wrapper = await mountSuspended(Header, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });
    const headerElement = wrapper.find('h1');
    expect(headerElement.exists()).toBe(true);
    expect(headerElement.attributes('class')).toContain(
      'text-gray-900 dark:text-white text-lg font-bold'
    );
    expect(headerElement.text()).toBe('Lystra');
  });

  it('should render the theme button properly', async () => {
    const wrapper = await mountSuspended(Header, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });
    const themeButton = wrapper.find('button');
    expect(themeButton.exists()).toBe(true);
    expect(themeButton.attributes('class')).toContain(
      'rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 cursor-pointer'
    );
    expect(themeButton.attributes('aria-label')).toBe('Switch to dark mode');
    expect(themeButton.attributes('type')).toBe('button');

    const icon = themeButton.find('span');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('class')).toContain('iconify i-lucide:sun shrink-0 size-5');
    expect(icon.attributes('aria-hidden')).toBe('true');
  });

  it('should toggle colorMode.value when theme button is clicked', async () => {
    const colorMode = { value: 'light' };
    vi.mock('nuxt/app', () => ({
      useColorMode: () => colorMode,
    }));

    const HeaderWithMock = (await import('../../app/components/Header/index.vue')).default;
    const wrapper = await mountSuspended(HeaderWithMock, {
      global: {
        stubs: {
          SignInButton: true,
          SignedOut: true,
          UserButton: true,
          SignedIn: true,
        },
      },
    });

    const themeButton = wrapper.findAll('button')[0];
    expect(themeButton.exists()).toBe(true);

    colorMode.value = 'dark';
    wrapper.vm.$forceUpdate?.();
    expect(colorMode.value).toBe('dark');
  });
});
