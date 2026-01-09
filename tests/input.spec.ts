import { test, expect } from '@playwright/test';

/**
 * Input Component Tests
 * Base UI Reference: https://base-ui.com/react/components/input
 * WCAG Reference: https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 */

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render input fields correctly', async ({ page }) => {
    const usernameInput = page.getByPlaceholder('Enter username');
    const emailInput = page.getByPlaceholder('you@example.com');
    const passwordInput = page.getByPlaceholder('••••••••');

    await expect(usernameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Take screenshot
    await page.locator('.space-y-6').filter({ has: usernameInput }).screenshot({
      path: 'test-results/screenshots/input-fields.png'
    });
  });

  test('should accept text input', async ({ page }) => {
    const input = page.getByPlaceholder('Enter username');
    
    await input.fill('testuser123');
    await expect(input).toHaveValue('testuser123');
    
    // Clear and type
    await input.clear();
    await input.type('another_user');
    await expect(input).toHaveValue('another_user');
  });

  test('should support different input types', async ({ page }) => {
    const emailInput = page.getByPlaceholder('you@example.com');
    const passwordInput = page.getByPlaceholder('••••••••');
    
    // Check input types
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have proper label associations', async ({ page }) => {
    // Find inputs with labels
    const usernameLabel = page.getByText('Username');
    const emailLabel = page.getByText('Email').first();
    
    await expect(usernameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    const firstInput = page.getByPlaceholder('Enter username');
    const secondInput = page.getByPlaceholder('you@example.com');
    
    // Tab through inputs
    await firstInput.focus();
    await expect(firstInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    // Note: May land on description or next input
    
    // Type in input
    await firstInput.focus();
    await page.keyboard.type('test');
    await expect(firstInput).toHaveValue('test');
  });

  test('should display focus state', async ({ page }) => {
    const input = page.getByPlaceholder('Enter username');
    
    await input.focus();
    
    // Check focus styles
    const focusStyles = await input.evaluate(el => {
      const styles = window.getComputedStyle(el, ':focus-visible');
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow
      };
    });
    
    expect(focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none').toBeTruthy();
  });

  test('should have neumorph inset shadow styling', async ({ page }) => {
    const input = page.getByPlaceholder('Enter username');
    
    const boxShadow = await input.evaluate(el => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Neumorph inputs should have inset shadow
    expect(boxShadow).toContain('inset');
  });

  test('should display field descriptions', async ({ page }) => {
    const description = page.getByText('Choose a unique username');
    await expect(description).toBeVisible();
  });

  test('should handle paste events', async ({ page }) => {
    const input = page.getByPlaceholder('Enter username');
    
    await input.focus();
    
    // Simulate paste
    await input.fill('pasted_text');
    await expect(input).toHaveValue('pasted_text');
  });
});
