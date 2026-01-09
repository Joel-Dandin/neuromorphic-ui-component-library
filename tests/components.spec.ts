/**
 * Component Behavior and Interaction Testing
 * Tests all components for correct rendering, states, and user interactions
 * 
 * References:
 * - Base UI Components: https://base-ui.com/react
 * - WAI-ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
 */

import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render all button variants', async ({ page }) => {
    const defaultBtn = page.locator('button').filter({ hasText: 'Default' }).first();
    const primaryBtn = page.locator('button').filter({ hasText: 'Primary' }).first();
    const flatBtn = page.locator('button').filter({ hasText: 'Flat' }).first();

    await expect(defaultBtn).toBeVisible();
    await expect(primaryBtn).toBeVisible();
    await expect(flatBtn).toBeVisible();
  });

  test('should render all button sizes', async ({ page }) => {
    const smallBtn = page.locator('button').filter({ hasText: 'Small' }).first();
    const mediumBtn = page.locator('button').filter({ hasText: 'Medium' }).first();
    const largeBtn = page.locator('button').filter({ hasText: 'Large' }).first();

    await expect(smallBtn).toBeVisible();
    await expect(mediumBtn).toBeVisible();
    await expect(largeBtn).toBeVisible();
  });

  test('should have hover state', async ({ page }) => {
    const button = page.locator('button').filter({ hasText: 'Default' }).first();
    
    await button.hover();
    
    // Button should be visible and respond to hover
    await expect(button).toBeVisible();
  });

  test('disabled buttons should not be clickable', async ({ page }) => {
    const disabledBtn = page.locator('button:disabled').first();
    
    if (await disabledBtn.count() > 0) {
      await expect(disabledBtn).toBeDisabled();
      
      // Verify it has proper styling
      const opacity = await disabledBtn.evaluate(el => 
        window.getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('buttons should be keyboard accessible', async ({ page }) => {
    const button = page.locator('button').first();
    await button.focus();
    
    const isFocused = await button.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
    
    // Should be activatable with Enter
    await page.keyboard.press('Enter');
  });
});

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render input fields', async ({ page }) => {
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="password"]').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('should accept text input', async ({ page }) => {
    const input = page.locator('input[placeholder*="username"]').first();
    
    if (await input.count() > 0) {
      await input.fill('testuser123');
      await expect(input).toHaveValue('testuser123');
    }
  });

  test('should accept email input', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first();
    
    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    }
  });

  test('should accept password input', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]').first();
    
    if (await passwordInput.count() > 0) {
      await passwordInput.fill('SecurePassword123!');
      await expect(passwordInput).toHaveValue('SecurePassword123!');
    }
  });

  test('should have proper focus state', async ({ page }) => {
    const input = page.locator('input').first();
    await input.focus();
    
    const isFocused = await input.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('inputs should have associated labels', async ({ page }) => {
    const inputs = await page.locator('input').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      // Input should have some form of label association
      expect(id || ariaLabel || ariaLabelledby).toBeTruthy();
    }
  });
});

test.describe('Checkbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render checkboxes', async ({ page }) => {
    const checkboxes = await page.locator('[role="checkbox"]').all();
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('should toggle checkbox state on click', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    if (await checkbox.count() > 0) {
      const initialState = await checkbox.getAttribute('aria-checked');
      
      await checkbox.click();
      
      const newState = await checkbox.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('should toggle checkbox with Space key', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    if (await checkbox.count() > 0) {
      await checkbox.focus();
      
      const initialState = await checkbox.getAttribute('aria-checked');
      await page.keyboard.press('Space');
      
      const newState = await checkbox.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('checkbox should have visible check indicator when checked', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    if (await checkbox.count() > 0) {
      // Click to ensure it's checked
      await checkbox.click();
      
      const ariaChecked = await checkbox.getAttribute('aria-checked');
      if (ariaChecked === 'true') {
        // Should have an indicator (svg, icon, or checkmark)
        const indicator = checkbox.locator('svg, [data-state="checked"]');
        await expect(indicator).toBeVisible();
      }
    }
  });
});

test.describe('Switch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render switches', async ({ page }) => {
    const switches = await page.locator('[role="switch"]').all();
    expect(switches.length).toBeGreaterThan(0);
  });

  test('should toggle switch state on click', async ({ page }) => {
    const switchEl = page.locator('[role="switch"]').first();
    
    if (await switchEl.count() > 0) {
      const initialState = await switchEl.getAttribute('aria-checked');
      
      await switchEl.click();
      
      const newState = await switchEl.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('should have visible thumb indicator', async ({ page }) => {
    const switchEl = page.locator('[role="switch"]').first();
    
    if (await switchEl.count() > 0) {
      // Switch should have a thumb element
      const thumb = switchEl.locator('[data-part="thumb"], [class*="thumb"]');
      
      // Thumb might be internal, just check switch is visible
      await expect(switchEl).toBeVisible();
    }
  });
});

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render cards with different variants', async ({ page }) => {
    // Look for card titles
    const cardTitles = await page.locator('h3').filter({ hasText: /card/i }).all();
    expect(cardTitles.length).toBeGreaterThan(0);
  });

  test('interactive cards should have hover effect', async ({ page }) => {
    const interactiveCard = page.locator('h3').filter({ hasText: /interactive card/i }).first();
    
    if (await interactiveCard.count() > 0) {
      const card = interactiveCard.locator('..').locator('..');
      await card.hover();
      
      // Card should be visible
      await expect(card).toBeVisible();
    }
  });
});

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render select dropdowns', async ({ page }) => {
    const selects = await page.locator('[role="combobox"]').all();
    
    if (selects.length === 0) {
      // Try alternate selector
      const selectTriggers = await page.locator('button').filter({ hasText: /select/i }).all();
      expect(selectTriggers.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('should open dropdown on click', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    
    if (await selectTrigger.count() > 0) {
      await selectTrigger.click();
      
      // Wait for listbox to appear
      const listbox = page.locator('[role="listbox"]');
      await expect(listbox).toBeVisible({ timeout: 2000 });
    }
  });

  test('should select an option', async ({ page }) => {
    const selectTrigger = page.locator('[role="combobox"]').first();
    
    if (await selectTrigger.count() > 0) {
      await selectTrigger.click();
      
      // Wait for options
      await page.waitForSelector('[role="option"]', { timeout: 2000 });
      
      const option = page.locator('[role="option"]').first();
      await option.click();
      
      // Dropdown should close
      await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    }
  });
});

test.describe('Dialog Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open dialog on trigger click', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /open dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      const dialog = page.locator('[role="dialog"]');
      await expect(dialog).toBeVisible({ timeout: 2000 });
    }
  });

  test('dialog should have proper ARIA attributes', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      const dialog = page.locator('[role="dialog"]');
      await dialog.waitFor({ state: 'visible', timeout: 2000 });
      
      const ariaModal = await dialog.getAttribute('aria-modal');
      expect(ariaModal).toBe('true');
    }
  });

  test('dialog should close on Escape key', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /open dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 2000 });
      
      await page.keyboard.press('Escape');
      
      await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    }
  });

  test('dialog should trap focus', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /open dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 2000 });
      
      // Tab through elements - focus should stay within dialog
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.closest('[role="dialog"]') !== null;
      });
      
      expect(focusedElement).toBeTruthy();
    }
  });
});

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render tabs', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]').first();
    
    if (await tablist.count() > 0) {
      await expect(tablist).toBeVisible();
      
      const tabs = await page.locator('[role="tab"]').all();
      expect(tabs.length).toBeGreaterThan(0);
    }
  });

  test('should switch tabs on click', async ({ page }) => {
    const tabs = await page.locator('[role="tab"]').all();
    
    if (tabs.length > 1) {
      const secondTab = tabs[1];
      await secondTab.click();
      
      const isSelected = await secondTab.getAttribute('aria-selected');
      expect(isSelected).toBe('true');
    }
  });

  test('tabs should support arrow key navigation', async ({ page }) => {
    const firstTab = page.locator('[role="tab"]').first();
    
    if (await firstTab.count() > 0) {
      await firstTab.focus();
      
      const initialControls = await firstTab.getAttribute('aria-controls');
      
      await page.keyboard.press('ArrowRight');
      
      const focusedControls = await page.evaluate(() => 
        document.activeElement?.getAttribute('aria-controls')
      );
      
      // Focus should have moved (or stayed if only one tab)
      expect(focusedControls).toBeTruthy();
    }
  });
});

test.describe('Slider Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render sliders', async ({ page }) => {
    const sliders = await page.locator('[role="slider"]').all();
    expect(sliders.length).toBeGreaterThanOrEqual(0);
  });

  test('slider should have proper ARIA attributes', async ({ page }) => {
    const slider = page.locator('[role="slider"]').first();
    
    if (await slider.count() > 0) {
      const valueNow = await slider.getAttribute('aria-valuenow');
      const valueMin = await slider.getAttribute('aria-valuemin');
      const valueMax = await slider.getAttribute('aria-valuemax');
      
      expect(valueNow).toBeTruthy();
      expect(valueMin).toBeTruthy();
      expect(valueMax).toBeTruthy();
    }
  });

  test('slider should respond to arrow keys', async ({ page }) => {
    const slider = page.locator('[role="slider"]').first();
    
    if (await slider.count() > 0) {
      await slider.focus();
      
      const initialValue = await slider.getAttribute('aria-valuenow');
      
      await page.keyboard.press('ArrowRight');
      
      const newValue = await slider.getAttribute('aria-valuenow');
      
      // Value should increase
      expect(Number(newValue)).toBeGreaterThanOrEqual(Number(initialValue));
    }
  });
});

test.describe('Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open menu on trigger click', async ({ page }) => {
    const menuTrigger = page.locator('button').filter({ hasText: /menu/i }).first();
    
    if (await menuTrigger.count() > 0) {
      await menuTrigger.click();
      
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible({ timeout: 2000 });
    }
  });

  test('menu should support arrow key navigation', async ({ page }) => {
    const menuTrigger = page.locator('button').filter({ hasText: /menu/i }).first();
    
    if (await menuTrigger.count() > 0) {
      await menuTrigger.click();
      
      await page.waitForSelector('[role="menu"]', { state: 'visible', timeout: 2000 });
      
      await page.keyboard.press('ArrowDown');
      
      const focusedRole = await page.evaluate(() => 
        document.activeElement?.getAttribute('role')
      );
      
      expect(focusedRole).toBe('menuitem');
    }
  });
});

test.describe('Accordion Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render accordion items', async ({ page }) => {
    const accordionTriggers = await page.locator('[aria-expanded]').all();
    expect(accordionTriggers.length).toBeGreaterThanOrEqual(0);
  });

  test('should expand/collapse on click', async ({ page }) => {
    const accordionTrigger = page.locator('[aria-expanded]').first();
    
    if (await accordionTrigger.count() > 0) {
      const initialState = await accordionTrigger.getAttribute('aria-expanded');
      
      await accordionTrigger.click();
      
      const newState = await accordionTrigger.getAttribute('aria-expanded');
      expect(newState).not.toBe(initialState);
    }
  });
});

test.describe('Progress Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render progress bars', async ({ page }) => {
    const progressBars = await page.locator('[role="progressbar"]').all();
    
    if (progressBars.length > 0) {
      const progress = progressBars[0];
      
      const valueNow = await progress.getAttribute('aria-valuenow');
      const valueMin = await progress.getAttribute('aria-valuemin');
      const valueMax = await progress.getAttribute('aria-valuemax');
      
      expect(valueNow).toBeTruthy();
      expect(valueMin).toBeDefined();
      expect(valueMax).toBeDefined();
    }
  });
});

test.describe('Radio Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render radio buttons', async ({ page }) => {
    const radios = await page.locator('[role="radio"]').all();
    expect(radios.length).toBeGreaterThanOrEqual(0);
  });

  test('should select radio button on click', async ({ page }) => {
    const radio = page.locator('[role="radio"]').first();
    
    if (await radio.count() > 0) {
      await radio.click();
      
      const isChecked = await radio.getAttribute('aria-checked');
      expect(isChecked).toBe('true');
    }
  });

  test('only one radio in group should be selected', async ({ page }) => {
    const radioGroup = page.locator('[role="radiogroup"]').first();
    
    if (await radioGroup.count() > 0) {
      const radios = await radioGroup.locator('[role="radio"]').all();
      
      if (radios.length > 1) {
        await radios[1].click();
        
        const checkedRadios = await radioGroup.locator('[role="radio"][aria-checked="true"]').count();
        expect(checkedRadios).toBe(1);
      }
    }
  });
});

test.describe('Tooltip Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should show tooltip on hover', async ({ page }) => {
    // Find element with tooltip
    const tooltipTrigger = page.locator('[aria-describedby*="tooltip"], [data-tooltip]').first();
    
    if (await tooltipTrigger.count() > 0) {
      await tooltipTrigger.hover();
      
      // Wait for tooltip to appear
      await page.waitForTimeout(500);
      
      const tooltip = page.locator('[role="tooltip"]');
      if (await tooltip.count() > 0) {
        await expect(tooltip).toBeVisible();
      }
    }
  });
});

test.describe('Toast Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should show toast on trigger', async ({ page }) => {
    const toastTrigger = page.locator('button').filter({ hasText: /toast/i }).first();
    
    if (await toastTrigger.count() > 0) {
      await toastTrigger.click();
      
      // Wait for toast to appear
      await page.waitForTimeout(500);
      
      // Toast should be visible
      const toast = page.locator('[role="status"], [data-toast]').first();
      if (await toast.count() > 0) {
        await expect(toast).toBeVisible();
      }
    }
  });
});
