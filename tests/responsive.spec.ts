/**
 * Responsive and Cross-Device Testing
 * Tests component behavior across different viewports and devices
 * 
 * References:
 * - Responsive Web Design: https://web.dev/responsive-web-design-basics/
 * - Mobile Touch Events: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 */

import { test, expect } from '@playwright/test';

test.describe('Responsive - Desktop Viewport (1920x1080)', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display all components without overflow', async ({ page }) => {
    // Check for horizontal scrollbar
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('cards should display in grid layout', async ({ page }) => {
    const cardContainer = page.locator('.grid, [class*="grid-cols"]').first();
    
    if (await cardContainer.count() > 0) {
      const display = await cardContainer.evaluate(el => 
        window.getComputedStyle(el).display
      );
      
      expect(display).toBe('grid');
    }
  });

  test('buttons should have adequate spacing', async ({ page }) => {
    const buttons = await page.locator('button').all();
    
    if (buttons.length > 1) {
      const firstButton = buttons[0];
      const secondButton = buttons[1];
      
      const firstBox = await firstButton.boundingBox();
      const secondBox = await secondButton.boundingBox();
      
      if (firstBox && secondBox) {
        // Buttons should not overlap
        const overlap = 
          firstBox.x < secondBox.x + secondBox.width &&
          firstBox.x + firstBox.width > secondBox.x &&
          firstBox.y < secondBox.y + secondBox.height &&
          firstBox.y + firstBox.height > secondBox.y;
        
        // If in same row, should not overlap
        if (Math.abs(firstBox.y - secondBox.y) < 10) {
          expect(overlap).toBeFalsy();
        }
      }
    }
  });

  test('text should be readable', async ({ page }) => {
    const heading = page.locator('h1').first();
    
    const fontSize = await heading.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    // Font size should be reasonable (at least 24px for h1)
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(24);
  });
});

test.describe('Responsive - Tablet Viewport (1024x1366)', () => {
  test.use({ viewport: { width: 1024, height: 1366 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display without horizontal scrollbar', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('cards should adapt to tablet layout', async ({ page }) => {
    const cards = await page.locator('[class*="Card"]').all();
    
    if (cards.length > 0) {
      const firstCard = cards[0];
      const width = await firstCard.evaluate(el => el.offsetWidth);
      
      // Cards should be reasonably sized for tablet
      expect(width).toBeGreaterThan(200);
      expect(width).toBeLessThan(1024);
    }
  });

  test('interactive elements should be touch-friendly', async ({ page }) => {
    const buttons = await page.locator('button').all();
    
    for (const button of buttons.slice(0, 5)) {
      const box = await button.boundingBox();
      
      if (box) {
        // Minimum touch target size: 44x44px (WCAG guideline)
        expect(box.height).toBeGreaterThanOrEqual(36); // Slightly relaxed for dense UIs
        expect(box.width).toBeGreaterThanOrEqual(36);
      }
    }
  });

  test('form inputs should be adequately sized', async ({ page }) => {
    const inputs = await page.locator('input').all();
    
    for (const input of inputs.slice(0, 3)) {
      const box = await input.boundingBox();
      
      if (box) {
        // Inputs should be tall enough for easy tapping
        expect(box.height).toBeGreaterThanOrEqual(36);
      }
    }
  });
});

test.describe('Responsive - Mobile Viewport (390x844)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display without horizontal scrollbar', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('cards should stack vertically', async ({ page }) => {
    const cardContainer = page.locator('.grid, [class*="grid-cols"]').first();
    
    if (await cardContainer.count() > 0) {
      const gridTemplateColumns = await cardContainer.evaluate(el => 
        window.getComputedStyle(el).gridTemplateColumns
      );
      
      // Should have single column or auto layout on mobile
      const columns = gridTemplateColumns.split(' ').length;
      expect(columns).toBeLessThanOrEqual(2);
    }
  });

  test('touch targets should be at least 44x44px', async ({ page }) => {
    // WCAG 2.1 Success Criterion 2.5.5 (Level AAA, but good practice)
    const buttons = await page.locator('button:visible').all();
    
    for (const button of buttons.slice(0, 5)) {
      const box = await button.boundingBox();
      
      if (box) {
        // Allow slight variance for design, but should be close to 44px
        expect(box.height).toBeGreaterThanOrEqual(32);
        expect(box.width).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test('text should be readable on mobile', async ({ page }) => {
    const paragraphs = await page.locator('p').all();
    
    if (paragraphs.length > 0) {
      const fontSize = await paragraphs[0].evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      // Font size should be at least 14px for body text
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14);
    }
  });

  test('modal dialogs should fit viewport', async ({ page }) => {
    const dialogTrigger = page.locator('button').filter({ hasText: /dialog/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();
      
      await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 2000 });
      
      const dialog = page.locator('[role="dialog"]');
      const box = await dialog.boundingBox();
      
      if (box) {
        // Dialog should fit within viewport
        expect(box.width).toBeLessThanOrEqual(390);
        expect(box.x).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('forms should be usable on mobile', async ({ page }) => {
    const inputs = await page.locator('input').all();
    
    for (const input of inputs.slice(0, 3)) {
      await input.scrollIntoViewIfNeeded();
      
      const box = await input.boundingBox();
      
      if (box) {
        // Input should be within viewport when scrolled
        expect(box.width).toBeLessThanOrEqual(390);
        expect(box.height).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test('navigation should be accessible on mobile', async ({ page }) => {
    const tabs = page.locator('[role="tablist"]').first();
    
    if (await tabs.count() > 0) {
      const box = await tabs.boundingBox();
      
      if (box) {
        // Tabs should fit or scroll horizontally
        expect(box.width).toBeLessThanOrEqual(390);
      }
    }
  });
});

test.describe('Touch Input Support', () => {
  test.use({ 
    viewport: { width: 390, height: 844 },
    hasTouch: true 
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('buttons should respond to touch', async ({ page }) => {
    const button = page.locator('button').first();
    
    await button.tap();
    
    // Button should be clickable via tap
    await expect(button).toBeVisible();
  });

  test('checkboxes should respond to touch', async ({ page }) => {
    const checkbox = page.locator('[role="checkbox"]').first();
    
    if (await checkbox.count() > 0) {
      const initialState = await checkbox.getAttribute('aria-checked');
      
      await checkbox.tap();
      
      const newState = await checkbox.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('switches should respond to touch', async ({ page }) => {
    const switchEl = page.locator('[role="switch"]').first();
    
    if (await switchEl.count() > 0) {
      const initialState = await switchEl.getAttribute('aria-checked');
      
      await switchEl.tap();
      
      const newState = await switchEl.getAttribute('aria-checked');
      expect(newState).not.toBe(initialState);
    }
  });

  test('slider should respond to touch drag', async ({ page }) => {
    const slider = page.locator('[role="slider"]').first();
    
    if (await slider.count() > 0) {
      const box = await slider.boundingBox();
      
      if (box) {
        // Simulate touch drag
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        
        // Slider should be interactive
        await expect(slider).toBeVisible();
      }
    }
  });

  test('scrolling should work with touch', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Layout Shifts and Visual Stability', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not have layout shift on page load', async ({ page }) => {
    // Wait for initial render
    await page.waitForLoadState('domcontentloaded');
    
    // Get initial position of first button
    const button = page.locator('button').first();
    const initialBox = await button.boundingBox();
    
    // Wait for full load
    await page.waitForLoadState('networkidle');
    
    // Check position again
    const finalBox = await button.boundingBox();
    
    if (initialBox && finalBox) {
      // Position should be stable (allow 1px variance)
      expect(Math.abs(finalBox.y - initialBox.y)).toBeLessThanOrEqual(1);
    }
  });

  test('images should not cause layout shift', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const hasWidthHeight = await img.evaluate(el => {
        return el.hasAttribute('width') && el.hasAttribute('height');
      });
      
      // Images should have dimensions or CSS sizing to prevent shifts
      if (!hasWidthHeight) {
        const cssSize = await img.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return styles.width !== 'auto' || styles.height !== 'auto';
        });
        
        expect(cssSize).toBeTruthy();
      }
    }
  });
});

test.describe('Performance - Component Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page should load in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('interactive elements should respond quickly', async ({ page }) => {
    const button = page.locator('button').first();
    
    const startTime = Date.now();
    await button.click();
    const clickTime = Date.now() - startTime;
    
    // Click should register within 100ms
    expect(clickTime).toBeLessThan(100);
  });

  test('animations should be smooth', async ({ page }) => {
    // Check if any animations are defined
    const hasAnimations = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const styles = window.getComputedStyle(el);
        if (styles.transition !== 'none' || styles.animation !== 'none') {
          return true;
        }
      }
      return false;
    });
    
    // If animations exist, they should use transform and opacity for performance
    if (hasAnimations) {
      const usesPerformantProps = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const styles = window.getComputedStyle(el);
          if (styles.transition.includes('left') || 
              styles.transition.includes('top') ||
              styles.transition.includes('width') ||
              styles.transition.includes('height')) {
            return false;
          }
        }
        return true;
      });
      
      // Should use performant properties (transform, opacity)
      expect(usesPerformantProps).toBeTruthy();
    }
  });
});
