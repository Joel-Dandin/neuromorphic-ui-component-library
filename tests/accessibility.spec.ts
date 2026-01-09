import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Test Suite
 * Tests WCAG 2.1 AA compliance for all components
 * Reference: https://www.w3.org/WAI/WCAG21/quickref/
 */

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have any automatically detectable accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper color contrast for text elements', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.color'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.aria'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.keyboard'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper semantic structure', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.semantics'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Test focus on buttons
    const buttons = page.locator('button').first();
    await buttons.focus();
    
    // Check that focus ring is visible
    const focusRing = await buttons.evaluate(el => {
      const styles = window.getComputedStyle(el, ':focus-visible');
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow
      };
    });

    // Should have either outline or box-shadow for focus
    expect(focusRing.outline !== 'none' || focusRing.boxShadow !== 'none').toBeTruthy();
  });

  test('should have proper label associations for form fields', async ({ page }) => {
    const inputs = page.locator('input[type="email"], input[type="text"], input[type="password"]');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const id = await input.getAttribute('id');
      
      // Input should have either aria-label, aria-labelledby, or associated label
      if (!ariaLabel && !ariaLabelledBy && id) {
        const label = page.locator(`label[for="${id}"]`);
        expect(await label.count()).toBeGreaterThan(0);
      }
    }
  });
});
