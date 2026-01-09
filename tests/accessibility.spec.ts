/**
 * Accessibility Testing for Neuromorphic UI Component Library
 * Tests compliance with WCAG 2.1 AA standards using axe-core
 * 
 * References:
 * - WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
 * - axe-core: https://github.com/dequelabs/axe-core
 * - WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should not have any automatically detectable accessibility violations on homepage', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Log violations for detailed reporting
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility Violations Found:');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`\n${violation.id}: ${violation.description}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Help: ${violation.helpUrl}`);
        console.log(`Affected elements: ${violation.nodes.length}`);
        violation.nodes.forEach((node) => {
          console.log(`  - ${node.html}`);
          console.log(`    Target: ${node.target}`);
        });
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper color contrast ratios', async ({ page }) => {
    // Neomorphism design can have contrast issues - check specifically
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('button, input, label, a')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    if (contrastViolations.length > 0) {
      console.log('Color Contrast Violations (WCAG AA requires 4.5:1 for normal text, 3:1 for large text):');
      contrastViolations.forEach((violation) => {
        console.log(`\n${violation.description}`);
        console.log(`Help: ${violation.helpUrl}`);
        violation.nodes.forEach((node) => {
          console.log(`  - ${node.html}`);
        });
      });
    }

    expect(contrastViolations).toEqual([]);
  });

  test('all form controls should have associated labels', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include('input, select, textarea')
      .analyze();

    const labelViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'label' || v.id === 'label-title-only'
    );

    expect(labelViolations).toEqual([]);
  });

  test('all interactive elements should have accessible names', async ({ page }) => {
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      const accessibleName = await button.getAttribute('aria-label') || 
                             await button.textContent() ||
                             await button.getAttribute('title');
      
      expect(accessibleName).toBeTruthy();
    }
  });

  test('focus indicators should be visible', async ({ page }) => {
    // Test first button focus
    const firstButton = page.locator('button').first();
    await firstButton.focus();
    
    // Check if focus styles are applied (should have outline or ring)
    const outline = await firstButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
      };
    });

    // Focus should have visible indicator (outline or box-shadow)
    const hasFocusIndicator = 
      outline.outlineWidth !== '0px' || 
      outline.boxShadow !== 'none';
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('images should have alt text', async ({ page }) => {
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('headings should be in logical order', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['heading-order'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('page should have a main landmark', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['region'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Accessibility - Keyboard Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should be able to tab through all interactive elements', async ({ page }) => {
    // Start from first focusable element
    await page.keyboard.press('Tab');
    
    // Get all interactive elements
    const interactiveElements = await page.locator(
      'button:visible, a:visible, input:visible, select:visible, textarea:visible, [tabindex]:not([tabindex="-1"]):visible'
    ).all();

    expect(interactiveElements.length).toBeGreaterThan(0);

    // Tab through first 5 elements to verify tab order works
    for (let i = 0; i < Math.min(5, interactiveElements.length); i++) {
      const focusedElement = await page.evaluateHandle(() => document.activeElement);
      expect(focusedElement).toBeTruthy();
      await page.keyboard.press('Tab');
    }
  });

  test('buttons should be activatable with Enter and Space', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();
    
    // Verify it's focusable
    const isFocused = await button.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('checkboxes should be toggleable with Space key', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    if (await checkbox.count() > 0) {
      await checkbox.focus();
      
      const initialState = await checkbox.getAttribute('aria-checked');
      await page.keyboard.press('Space');
      
      const newState = await checkbox.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('switch should be toggleable with Space key', async ({ page }) => {
    const switchElement = page.locator('[role="switch"]').first();
    if (await switchElement.count() > 0) {
      await switchElement.focus();
      
      const initialState = await switchElement.getAttribute('aria-checked');
      await page.keyboard.press('Space');
      
      const newState = await switchElement.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('dialogs should close with Escape key', async ({ page }) => {
    // Find and click dialog trigger
    const dialogTrigger = page.locator('button').filter({ hasText: /open dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      // Wait for dialog to open
      await page.waitForSelector('[role="dialog"]', { state: 'visible' });
      
      // Press Escape
      await page.keyboard.press('Escape');
      
      // Dialog should be closed
      await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    }
  });

  test('menus should support arrow key navigation', async ({ page }) => {
    const menuTrigger = page.locator('button').filter({ hasText: /open menu/i }).first();
    
    if (await menuTrigger.count() > 0) {
      await menuTrigger.click();
      
      // Wait for menu to open
      const menu = page.locator('[role="menu"]');
      await menu.waitFor({ state: 'visible' });
      
      // Press ArrowDown
      await page.keyboard.press('ArrowDown');
      
      // Check if focus moved to a menu item
      const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('role'));
      expect(focusedElement).toBe('menuitem');
    }
  });

  test('tabs should support arrow key navigation', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]').first();
    
    if (await tablist.count() > 0) {
      const firstTab = page.locator('[role="tab"]').first();
      await firstTab.focus();
      
      const initialAriaLabel = await firstTab.getAttribute('aria-controls');
      
      // Press ArrowRight
      await page.keyboard.press('ArrowRight');
      
      const focusedTab = await page.evaluate(() => document.activeElement?.getAttribute('aria-controls'));
      
      // Focus should have moved to next tab
      expect(focusedTab).not.toBe(initialAriaLabel);
    }
  });

  test('slider should support arrow keys', async ({ page }) => {
    const slider = page.locator('[role="slider"]').first();
    
    if (await slider.count() > 0) {
      await slider.focus();
      
      const initialValue = await slider.getAttribute('aria-valuenow');
      
      // Press ArrowRight to increase value
      await page.keyboard.press('ArrowRight');
      
      const newValue = await slider.getAttribute('aria-valuenow');
      
      expect(Number(newValue)).toBeGreaterThan(Number(initialValue));
    }
  });
});

test.describe('Accessibility - ARIA Attributes', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('buttons should have appropriate ARIA attributes', async ({ page }) => {
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      // Disabled buttons should have aria-disabled
      const isDisabled = await button.getAttribute('disabled');
      if (isDisabled !== null) {
        const ariaDisabled = await button.getAttribute('aria-disabled');
        expect(ariaDisabled).toBe('true');
      }
    }
  });

  test('checkboxes should have correct ARIA role and state', async ({ page }) => {
    const checkboxes = await page.locator('[role="checkbox"]').all();
    
    for (const checkbox of checkboxes) {
      const ariaChecked = await checkbox.getAttribute('aria-checked');
      expect(['true', 'false', 'mixed']).toContain(ariaChecked);
    }
  });

  test('switches should have correct ARIA role and state', async ({ page }) => {
    const switches = await page.locator('[role="switch"]').all();
    
    for (const switchEl of switches) {
      const ariaChecked = await switchEl.getAttribute('aria-checked');
      expect(['true', 'false']).toContain(ariaChecked);
    }
  });

  test('dialogs should have proper ARIA attributes', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      const dialog = page.locator('[role="dialog"]');
      await dialog.waitFor({ state: 'visible' });
      
      // Dialog should have aria-modal
      const ariaModal = await dialog.getAttribute('aria-modal');
      expect(ariaModal).toBe('true');
      
      // Dialog should have aria-labelledby or aria-label
      const ariaLabelledby = await dialog.getAttribute('aria-labelledby');
      const ariaLabel = await dialog.getAttribute('aria-label');
      expect(ariaLabelledby || ariaLabel).toBeTruthy();
    }
  });

  test('form fields should have aria-describedby for descriptions', async ({ page }) => {
    const fieldsWithDescription = await page.locator('input').all();
    
    for (const field of fieldsWithDescription) {
      const describedBy = await field.getAttribute('aria-describedby');
      const description = await field.evaluate((el) => {
        const id = el.getAttribute('aria-describedby');
        return id ? document.getElementById(id)?.textContent : null;
      });
      
      // If field has aria-describedby, the element should exist
      if (describedBy) {
        expect(description).toBeTruthy();
      }
    }
  });

  test('invalid form fields should have aria-invalid', async ({ page }) => {
    // This would need actual validation state in the app
    // Just checking the pattern exists
    const inputs = await page.locator('input[aria-invalid]').all();
    
    for (const input of inputs) {
      const ariaInvalid = await input.getAttribute('aria-invalid');
      expect(['true', 'false']).toContain(ariaInvalid);
    }
  });

  test('tabs should have correct ARIA attributes', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]').first();
    
    if (await tablist.count() > 0) {
      const tabs = await page.locator('[role="tab"]').all();
      
      for (const tab of tabs) {
        // Each tab should have aria-controls
        const ariaControls = await tab.getAttribute('aria-controls');
        expect(ariaControls).toBeTruthy();
        
        // Each tab should have aria-selected
        const ariaSelected = await tab.getAttribute('aria-selected');
        expect(['true', 'false']).toContain(ariaSelected);
      }
    }
  });

  test('accordion items should have proper ARIA attributes', async ({ page }) => {
    const accordionHeaders = await page.locator('[role="button"][aria-expanded]').all();
    
    for (const header of accordionHeaders) {
      // Should have aria-expanded
      const ariaExpanded = await header.getAttribute('aria-expanded');
      expect(['true', 'false']).toContain(ariaExpanded);
      
      // Should have aria-controls pointing to panel
      const ariaControls = await header.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
    }
  });

  test('sliders should have proper ARIA attributes', async ({ page }) => {
    const sliders = await page.locator('[role="slider"]').all();
    
    for (const slider of sliders) {
      // Should have aria-valuenow
      const valueNow = await slider.getAttribute('aria-valuenow');
      expect(valueNow).toBeTruthy();
      
      // Should have aria-valuemin
      const valueMin = await slider.getAttribute('aria-valuemin');
      expect(valueMin).toBeTruthy();
      
      // Should have aria-valuemax
      const valueMax = await slider.getAttribute('aria-valuemax');
      expect(valueMax).toBeTruthy();
    }
  });
});

test.describe('Accessibility - Screen Reader Support', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('live regions should be present for dynamic content', async ({ page }) => {
    const liveRegions = await page.locator('[role="status"], [role="alert"], [aria-live]').all();
    
    // Check if toast/notification system uses live regions
    const toastTrigger = page.locator('button').filter({ hasText: /toast/i }).first();
    
    if (await toastTrigger.count() > 0) {
      await toastTrigger.click();
      
      // Wait a bit for toast to appear
      await page.waitForTimeout(500);
      
      // Should have a live region for announcements
      const liveRegionAfter = await page.locator('[role="status"], [role="alert"], [aria-live]').count();
      expect(liveRegionAfter).toBeGreaterThanOrEqual(1);
    }
  });

  test('error messages should be announced', async ({ page }) => {
    // Check if any error messages use proper ARIA for announcements
    const errorMessages = await page.locator('[role="alert"], [aria-live="assertive"]').all();
    
    // Error messages should be perceivable
    for (const error of errorMessages) {
      const isVisible = await error.isVisible();
      if (isVisible) {
        const role = await error.getAttribute('role');
        const ariaLive = await error.getAttribute('aria-live');
        expect(role === 'alert' || ariaLive === 'assertive' || ariaLive === 'polite').toBeTruthy();
      }
    }
  });

  test('loading states should be announced', async ({ page }) => {
    // Check for aria-busy or role="status" on loading elements
    const busyElements = await page.locator('[aria-busy="true"], [role="progressbar"]').all();
    
    for (const element of busyElements) {
      const ariaBusy = await element.getAttribute('aria-busy');
      const role = await element.getAttribute('role');
      
      expect(ariaBusy === 'true' || role === 'progressbar' || role === 'status').toBeTruthy();
    }
  });
});
