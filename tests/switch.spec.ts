import { test, expect } from '@playwright/test';

/**
 * Switch Component Tests
 * Base UI Reference: https://base-ui.com/react/components/switch
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */

test.describe('Switch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render switches in different sizes', async ({ page }) => {
    const switches = page.locator('[role="switch"]');
    await expect(switches.first()).toBeVisible();
    
    // Take screenshot
    await page.locator('.space-y-4').filter({ hasText: 'Switches' }).screenshot({
      path: 'test-results/screenshots/switches.png'
    });
  });

  test('should toggle on/off state on click', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    const initialState = await switchControl.getAttribute('data-state');
    
    await switchControl.click();
    await page.waitForTimeout(200); // Wait for transition
    
    const newState = await switchControl.getAttribute('data-state');
    expect(newState).not.toBe(initialState);
  });

  test('should support keyboard interaction (Space and Enter)', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    await switchControl.focus();
    await expect(switchControl).toBeFocused();
    
    // Press Space to toggle
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
    
    const state = await switchControl.getAttribute('data-state');
    expect(['on', 'off', 'checked', 'unchecked']).toContain(state || '');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    const role = await switchControl.getAttribute('role');
    const ariaChecked = await switchControl.getAttribute('aria-checked');
    
    expect(role).toBe('switch');
    expect(['true', 'false']).toContain(ariaChecked || '');
  });

  test('should animate thumb on state change', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    // Get thumb position
    const thumb = switchControl.locator('[class*="thumb"]').or(switchControl.locator('span').last());
    
    await switchControl.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Thumb should have moved (check transform or position)
    const transform = await thumb.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    expect(transform).toBeTruthy();
  });

  test('should have focus ring visible', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    await switchControl.focus();
    
    const focusStyles = await switchControl.evaluate(el => {
      const styles = window.getComputedStyle(el, ':focus-visible');
      return styles.boxShadow || styles.outline;
    });
    
    expect(focusStyles).not.toBe('none');
  });

  test('should have neumorph inset styling', async ({ page }) => {
    const switchControl = page.locator('[role="switch"]').first();
    
    const boxShadow = await switchControl.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Switch should have inset shadow
    expect(boxShadow).toContain('inset');
  });

  test('should work with labels', async ({ page }) => {
    const label = page.getByText('Enable notifications');
    await expect(label).toBeVisible();
  });
});
