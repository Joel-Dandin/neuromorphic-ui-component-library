import { test, expect } from '@playwright/test';

/**
 * Select Component Tests
 * Base UI Reference: https://base-ui.com/react/components/select
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render select trigger', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    await expect(selectTrigger).toBeVisible();
    
    // Take screenshot
    await selectTrigger.screenshot({
      path: 'test-results/screenshots/select-closed.png'
    });
  });

  test('should open listbox on trigger click', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    await selectTrigger.click();
    
    await page.waitForTimeout(200);
    
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/select-open.png' });
  });

  test('should select option on click', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    await selectTrigger.click();
    
    await page.waitForTimeout(200);
    
    const option = page.getByRole('option', { name: 'Vue' });
    await option.click();
    
    await page.waitForTimeout(200);
    
    // Check if value is displayed in trigger
    await expect(selectTrigger).toContainText('Vue');
  });

  test('should support keyboard navigation', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    
    await selectTrigger.focus();
    await expect(selectTrigger).toBeFocused();
    
    // Open with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    
    // Select with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
  });

  test('should close on Escape key', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    await selectTrigger.click();
    
    await page.waitForTimeout(200);
    
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    
    await expect(listbox).not.toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    
    const ariaExpanded = await selectTrigger.getAttribute('aria-expanded');
    const ariaHaspopup = await selectTrigger.getAttribute('aria-haspopup');
    
    expect(['true', 'false']).toContain(ariaExpanded || '');
    expect(ariaHaspopup).toBe('listbox');
  });

  test('should handle disabled state', async ({ page }) => {
    const disabledSelect = page.locator('[role="combobox"]').nth(1);
    
    await expect(disabledSelect).toBeDisabled();
  });
});
