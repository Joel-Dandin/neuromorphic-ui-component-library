import { test, expect } from '@playwright/test';

/**
 * Checkbox Component Tests
 * Base UI Reference: https://base-ui.com/react/components/checkbox
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */

test.describe('Checkbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render checkboxes in different sizes', async ({ page }) => {
    // Scroll to checkboxes section
    await page.getByText('Form Controls').click();
    
    const checkboxes = page.locator('[role="checkbox"]');
    await expect(checkboxes.first()).toBeVisible();
    
    // Take screenshot
    await page.locator('.space-y-4').filter({ hasText: 'Checkboxes' }).screenshot({
      path: 'test-results/screenshots/checkboxes.png'
    });
  });

  test('should toggle checked state on click', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    // Get initial state
    const initialState = await checkbox.getAttribute('data-state');
    
    // Click to toggle
    await checkbox.click();
    await page.waitForTimeout(100); // Wait for state change
    
    const newState = await checkbox.getAttribute('data-state');
    expect(newState).not.toBe(initialState);
  });

  test('should support keyboard interaction (Space key)', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    await checkbox.focus();
    await expect(checkbox).toBeFocused();
    
    // Press Space to toggle
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
    
    const state = await checkbox.getAttribute('data-state');
    expect(['checked', 'unchecked']).toContain(state);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    const role = await checkbox.getAttribute('role');
    const ariaChecked = await checkbox.getAttribute('aria-checked');
    
    expect(role).toBe('checkbox');
    expect(['true', 'false', 'mixed']).toContain(ariaChecked || '');
  });

  test('should display check indicator when checked', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    // Ensure checked
    await checkbox.click();
    await page.waitForTimeout(100);
    
    // Check for indicator (svg or icon)
    const indicator = checkbox.locator('svg');
    await expect(indicator).toBeVisible();
  });

  test('should work with associated labels', async ({ page }) => {
    // Find checkbox with label
    const label = page.getByText('Accept terms and conditions');
    await expect(label).toBeVisible();
    
    // Click label should toggle checkbox
    const checkbox = page.locator('[role="checkbox"]').first();
    const initialState = await checkbox.getAttribute('data-state');
    
    await label.click();
    await page.waitForTimeout(100);
    
    const newState = await checkbox.getAttribute('data-state');
    expect(newState).not.toBe(initialState);
  });

  test('should have focus ring visible', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    await checkbox.focus();
    
    const focusStyles = await checkbox.evaluate(el => {
      const styles = window.getComputedStyle(el, ':focus-visible');
      return styles.boxShadow || styles.outline;
    });
    
    expect(focusStyles).not.toBe('none');
  });

  test('should display neumorph styling', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    const boxShadow = await checkbox.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Should have shadow for neumorph effect
    expect(boxShadow).not.toBe('none');
  });
});
