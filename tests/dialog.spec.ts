import { test, expect } from '@playwright/test';

/**
 * Dialog and Modal Component Tests
 * Base UI Reference: https://base-ui.com/react/components/dialog
 * ARIA Reference: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */

test.describe('Dialog Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open dialog on trigger click', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300); // Wait for animation
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/dialog-open.png' });
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    const dialog = page.getByRole('dialog');
    
    const ariaModal = await dialog.getAttribute('aria-modal');
    const ariaLabelledby = await dialog.getAttribute('aria-labelledby');
    const ariaDescribedby = await dialog.getAttribute('aria-describedby');
    
    expect(ariaModal).toBe('true');
    expect(ariaLabelledby || ariaDescribedby).toBeTruthy();
  });

  test('should trap focus within dialog', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Focus should stay within dialog
    const focusedElement = page.locator(':focus');
    const dialog = page.getByRole('dialog');
    
    const isWithinDialog = await focusedElement.evaluate((el, dialogEl) => {
      return dialogEl.contains(el);
    }, await dialog.elementHandle());
    
    expect(isWithinDialog).toBeTruthy();
  });

  test('should close on Escape key', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    await expect(dialog).not.toBeVisible();
  });

  test('should close on backdrop click', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Click outside dialog (on backdrop)
    await page.click('body', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);
    
    await expect(dialog).not.toBeVisible();
  });

  test('should restore focus after closing', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    
    await triggerButton.focus();
    await triggerButton.click();
    await page.waitForTimeout(300);
    
    // Close dialog
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // Focus should return to trigger
    await expect(triggerButton).toBeFocused();
  });

  test('should have neumorph styling', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    const dialog = page.getByRole('dialog');
    const boxShadow = await dialog.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    expect(boxShadow).not.toBe('none');
  });

  test('should display title and description', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Open Dialog' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    const title = page.getByText('Welcome to Neumorphism UI');
    const description = page.getByText('This is a dialog component');
    
    await expect(title).toBeVisible();
    await expect(description).toBeVisible();
  });
});

test.describe('AlertDialog Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open alert dialog on trigger click', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Delete Account' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    const alertDialog = page.getByRole('alertdialog');
    await expect(alertDialog).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/alert-dialog-open.png' });
  });

  test('should have proper ARIA role', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Delete Account' });
    await triggerButton.click();
    
    const alertDialog = page.getByRole('alertdialog');
    await expect(alertDialog).toBeVisible();
  });

  test('should close on action button click', async ({ page }) => {
    const triggerButton = page.getByRole('button', { name: 'Delete Account' });
    await triggerButton.click();
    
    await page.waitForTimeout(300);
    
    // Click cancel button
    const cancelButton = page.getByRole('button', { name: 'Cancel' }).last();
    await cancelButton.click();
    
    await page.waitForTimeout(300);
    
    const alertDialog = page.getByRole('alertdialog');
    await expect(alertDialog).not.toBeVisible();
  });
});
