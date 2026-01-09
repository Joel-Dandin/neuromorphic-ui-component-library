# Testing Guide - Neuromorphism UI Component Library

## Overview

This component library includes comprehensive automated testing using Playwright and Axe-Core to ensure:
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Component functionality
- ✅ Keyboard navigation
- ✅ Responsive behavior
- ✅ Visual consistency

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in headed mode (watch the browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# View test report
npm run test:report
```

## Test Structure

```
tests/
├── accessibility.spec.ts   # WCAG 2.1 AA compliance tests
├── button.spec.ts          # Button component tests
├── checkbox.spec.ts        # Checkbox component tests
├── switch.spec.ts          # Switch component tests
├── input.spec.ts           # Input component tests
├── dialog.spec.ts          # Dialog & AlertDialog tests
├── tabs.spec.ts            # Tabs component tests
└── select.spec.ts          # Select component tests
```

## Test Reports

### 1. QA_SUMMARY.md
Executive summary of testing effort with:
- Quick stats and overview
- Testing infrastructure details
- Key findings and recommendations
- Visual evidence
- Compliance summary

### 2. TEST_REPORT.md
Detailed component-by-component analysis with:
- Feature completeness checklist
- Accessibility validation results
- Code references for issues
- Links to WCAG/ARIA standards
- Screenshots of visual states

## Testing Viewports

Tests run on three viewports:
- **Desktop**: 1920×1080 (chromium-desktop)
- **Tablet**: 1024×768 (chromium-tablet)
- **Mobile**: 390×844 (chromium-mobile)

Run specific viewport:
```bash
npx playwright test --project=chromium-desktop
npx playwright test --project=chromium-tablet
npx playwright test --project=chromium-mobile
```

## Accessibility Testing

Uses Axe-Core to validate:
- Color contrast (WCAG 2.1 AA)
- ARIA attributes
- Keyboard navigation
- Semantic structure
- Focus indicators
- Form label associations

## Component Tests

Each component test includes:
1. **Rendering**: Verify component displays correctly
2. **Variants**: Test all style variants
3. **Sizes**: Test all size options
4. **Interactions**: Click, hover, focus events
5. **Keyboard**: Tab, Enter, Space, Arrow keys, Escape
6. **ARIA**: Proper roles and attributes
7. **States**: Normal, hover, focus, disabled, error
8. **Styling**: Neumorph shadows and effects

## Writing Tests

### Test Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render correctly', async ({ page }) => {
    const component = page.getByRole('button', { name: 'Click me' });
    await expect(component).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    const component = page.getByRole('button', { name: 'Click me' });
    await component.focus();
    await expect(component).toBeFocused();
    await page.keyboard.press('Enter');
  });
});
```

### Accessibility Template
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Best Practices

### Selectors
1. **Prefer** role-based selectors: `getByRole('button', { name: 'Click' })`
2. **Use** accessible names: `getByLabel('Email')`
3. **Avoid** CSS selectors when possible
4. **Use** test IDs only when necessary

### Assertions
1. **Visibility**: `await expect(element).toBeVisible()`
2. **State**: `await expect(element).toBeDisabled()`
3. **Focus**: `await expect(element).toBeFocused()`
4. **Content**: `await expect(element).toContainText('Hello')`

### Keyboard Testing
```typescript
// Tab to element
await page.keyboard.press('Tab');

// Press Enter or Space
await page.keyboard.press('Enter');
await page.keyboard.press('Space');

// Arrow key navigation
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowRight');

// Close with Escape
await page.keyboard.press('Escape');
```

## Debugging Tests

### Run in Headed Mode
```bash
npm run test:headed
```

### Run with UI Mode
```bash
npm run test:ui
```

### View Trace
When a test fails, a trace.zip is generated:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Take Screenshots
```typescript
await page.screenshot({ path: 'screenshot.png' });
await element.screenshot({ path: 'element.png' });
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Coverage

### Current Coverage (8/31 components)
- ✅ Button
- ✅ Input
- ✅ Checkbox
- ✅ Switch
- ✅ Dialog
- ✅ AlertDialog
- ✅ Tabs
- ✅ Select

### Components Needing Tests
- Radio, Slider, NumberField
- Card, Separator, Accordion
- Tooltip, Popover, Menu
- Progress, Toast, Meter
- Avatar, Collapsible, Toggle
- CheckboxGroup, Fieldset, ToggleGroup
- Toolbar, ContextMenu, ScrollArea

## Standards Reference

All tests follow:
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Base UI Accessibility](https://base-ui.com/react/guides/accessibility)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Troubleshooting

### Tests Timing Out
Increase timeout in test:
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ...
});
```

### Element Not Found
1. Check selector accuracy
2. Wait for element: `await page.waitForSelector('button')`
3. Wait for load state: `await page.waitForLoadState('networkidle')`

### Flaky Tests
1. Add explicit waits: `await page.waitForTimeout(300)`
2. Wait for animations to complete
3. Use `waitForSelector` with state: `state: 'visible'`

## Contributing Tests

When adding a new component:
1. Create test file: `tests/[component-name].spec.ts`
2. Test all variants and sizes
3. Test keyboard navigation
4. Verify ARIA attributes
5. Add accessibility checks
6. Take screenshots for documentation
7. Update TEST_REPORT.md

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Axe-Core Documentation](https://github.com/dequelabs/axe-core)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [ARIA Practices Examples](https://www.w3.org/WAI/ARIA/apg/example-index/)

---

**Last Updated**: January 9, 2026  
**Playwright Version**: 1.57+  
**Axe-Core Version**: 4.11+
