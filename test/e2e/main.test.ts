import { createPage, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

describe('Header Component', async () => {
  await setup({
    server: true,
    port: 3000,
    browser: true,
  });

  it('should render the logo', async () => {
    const page = await createPage('/');

    const logo = page.getByTestId('logo');
    expect(await logo.isVisible()).toBe(true);
    expect(await logo.getAttribute('src')).toContain('lystra-logo-light.svg');
    expect(await logo.getAttribute('alt')).toBe('Lystra logo');
  });

  it('should render the header', async () => {
    const page = await createPage('/');

    const heading = page.getByRole('heading', { name: 'Lystra' });
    expect(await heading.isVisible()).toBe(true);
  });

  it('should render the theme button', async () => {
    const page = await createPage('/');

    const button = page.getByTestId('color-mode-toggle');
    expect(await button.isVisible()).toBe(true);
  });

  it('should switch the theme on theme button click', async () => {
    const page = await createPage('/');

    const button = page.getByTestId('color-mode-toggle');
    expect(await button.isVisible()).toBe(true);

    const logo = page.getByTestId('logo');
    const initialSrc = await logo.getAttribute('src');
    expect(initialSrc).toContain('lystra-logo-light.svg');

    await button.click();

    await page.waitForFunction(
      () => {
        const logoElement = document.querySelector('[data-testId="logo"]');
        return logoElement?.getAttribute('src')?.includes('lystra-logo-dark.svg');
      },
      { timeout: 5000 }
    );

    const newSrc = await logo.getAttribute('src');
    expect(newSrc).toContain('lystra-logo-dark.svg');

    await button.click();

    await page.waitForFunction(
      () => {
        const logoElement = document.querySelector('[data-testId="logo"]');
        return logoElement?.getAttribute('src')?.includes('lystra-logo-light.svg');
      },
      { timeout: 5000 }
    );

    const finalSrc = await logo.getAttribute('src');
    expect(finalSrc).toContain('lystra-logo-light.svg');
  });
});
