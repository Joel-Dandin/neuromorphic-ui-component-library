import { test, expect } from '@playwright/test';

/**
 * Button Component Tests
 * Base UI Reference: https://base-ui.com/react/components/button
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render buttons with all variants', async ({ page }) => {
    const defaultButton = page.getByRole('button', { name: 'Default' }).first();
    const primaryButton = page.getByRole('button', { name: 'Primary' }).first();
    const flatButton = page.getByRole('button', { name: 'Flat' }).first();

    await expect(defaultButton).toBeVisible();
    await expect(primaryButton).toBeVisible();
    await expect(flatButton).toBeVisible();

    // Take screenshot of button variants
    await page.locator('.space-y-3').filter({ hasText: 'Variants' }).screenshot({
      path: 'test-results/screenshots/button-variants.png'
    });
  });

  test('should render buttons with all sizes', async ({ page }) => {
    const smallButton = page.getByRole('button', { name: 'Small' });
    const mediumButton = page.getByRole('button', { name: 'Medium' });
    const largeButton = page.getByRole('button', { name: 'Large' });

    await expect(smallButton).toBeVisible();
    await expect(mediumButton).toBeVisible();
    await expect(largeButton).toBeVisible();

    // Take screenshot of button sizes
    await page.locator('.space-y-3').filter({ hasText: 'Sizes' }).screenshot({
      path: 'test-results/screenshots/button-sizes.png'
    });
  });

  test('should handle click events', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' }).first();
    
    // Button should be clickable
    await expect(button).toBeEnabled();
    await button.click();
  });

  test('should show disabled state correctly', async ({ page }) => {
    const disabledButton = page.getByRole('button', { name: 'Disabled' });
    
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
    
    // Take screenshot of disabled state
    await page.locator('.space-y-3').filter({ hasText: 'States' }).screenshot({
      path: 'test-results/screenshots/button-states.png'
    });
  });

  test('should support keyboard navigation', async ({ page }) => {
    const firstButton = page.getByRole('button', { name: 'Default' }).first();
    
    // Focus should work with Tab key
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if button can be focused
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
    
    // Should activate with Enter key
    await page.keyboard.press('Enter');
    
    // Should activate with Space key
    await firstButton.focus();
    await page.keyboard.press('Space');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' }).first();
    
    // Button role should be implicit or explicit
    const role = await button.getAttribute('role');
    const tagName = await button.evaluate(el => el.tagName.toLowerCase());
    
    expect(tagName === 'button' || role === 'button').toBeTruthy();
  });

  test('should display hover effects', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' }).first();
    
    // Get initial box-shadow
    const initialShadow = await button.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Hover over button
    await button.hover();
    
    // Small delay for transition
    await page.waitForTimeout(300);
    
    // Get hover box-shadow
    const hoverShadow = await button.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Shadow should change on hover (neumorph effect)
    expect(hoverShadow).not.toBe(initialShadow);
  });

  test('should have proper focus ring', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' }).first();
    
    await button.focus();
    
    // Check for focus-visible ring
    const focusRing = await button.evaluate(el => {
      const styles = window.getComputedStyle(el, ':focus-visible');
      return styles.boxShadow || styles.outline;
    });
    
    expect(focusRing).not.toBe('none');
  });

  test('should work with icon buttons', async ({ page }) => {
    // Look for icon-only button (heart icon)
    const iconButtons = page.locator('button').filter({ has: page.locator('svg') }).first();
    
    await expect(iconButtons).toBeVisible();
    await iconButtons.click();
  });
});
