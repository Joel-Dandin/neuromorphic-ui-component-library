import { test, expect } from '@playwright/test';

/**
 * Tabs Component Tests
 * Base UI Reference: https://base-ui.com/react/components/tabs
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render tabs correctly', async ({ page }) => {
    const tab1 = page.getByRole('tab', { name: 'Account' });
    const tab2 = page.getByRole('tab', { name: 'Password' });
    const tab3 = page.getByRole('tab', { name: 'Settings' });
    
    await expect(tab1).toBeVisible();
    await expect(tab2).toBeVisible();
    await expect(tab3).toBeVisible();
    
    // Take screenshot
    await page.locator('[role="tablist"]').first().screenshot({
      path: 'test-results/screenshots/tabs.png'
    });
  });

  test('should switch tabs on click', async ({ page }) => {
    const accountTab = page.getByRole('tab', { name: 'Account' });
    const passwordTab = page.getByRole('tab', { name: 'Password' });
    
    await accountTab.click();
    const accountContent = page.getByText('Manage your account settings');
    await expect(accountContent).toBeVisible();
    
    await passwordTab.click();
    const passwordContent = page.getByText('Change your password and security');
    await expect(passwordContent).toBeVisible();
  });

  test('should support arrow key navigation', async ({ page }) => {
    const accountTab = page.getByRole('tab', { name: 'Account' });
    
    await accountTab.focus();
    await expect(accountTab).toBeFocused();
    
    // Arrow right to next tab
    await page.keyboard.press('ArrowRight');
    const passwordTab = page.getByRole('tab', { name: 'Password' });
    await expect(passwordTab).toBeFocused();
    
    // Arrow right to next tab
    await page.keyboard.press('ArrowRight');
    const settingsTab = page.getByRole('tab', { name: 'Settings' });
    await expect(settingsTab).toBeFocused();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const tab = page.getByRole('tab', { name: 'Account' });
    const tablist = page.locator('[role="tablist"]').first();
    
    await expect(tablist).toBeVisible();
    
    const ariaSelected = await tab.getAttribute('aria-selected');
    const ariaControls = await tab.getAttribute('aria-controls');
    
    expect(['true', 'false']).toContain(ariaSelected || '');
    expect(ariaControls).toBeTruthy();
  });

  test('should display tabpanel for selected tab', async ({ page }) => {
    const tab = page.getByRole('tab', { name: 'Account' });
    await tab.click();
    
    const tabpanel = page.getByRole('tabpanel');
    await expect(tabpanel).toBeVisible();
  });
});
