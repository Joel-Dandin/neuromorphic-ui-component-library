# Accessibility Fixes Implementation Guide

This guide provides step-by-step instructions for fixing the accessibility violations found in the Neuromorphic UI Component Library testing.

## Quick Reference

| Priority | Issue | Instances | Est. Time |
|----------|-------|-----------|-----------|
| 1 (Critical) | Missing ARIA labels on Progress/Meter | 6 | 30 min |
| 1 (Critical) | Missing toggle field names | 18 | 2 hours |
| 1 (Critical) | Missing button names | 12 | 1 hour |
| 1 (Critical) | Color contrast failures | 6 | 1 hour |
| 1 (Critical) | Missing form labels | 8 | 1 hour |
| 2 (High) | Nested interactive controls | 5 | 30 min |
| 2 (High) | Missing landmarks | 1 | 15 min |
| 2 (High) | Heading hierarchy | Multiple | 30 min |

**Total Estimated Time: 7-8 hours**

---

## Fix 1: Progress Component - Add aria-label

**File:** `src/components/Progress.tsx`

**Current Code:**
```tsx
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, size = 'md', className, ...props }, ref) => {
    return (
      <BaseProgress.Root
        value={value}
        className={progressVariants({ size, className })}
        ref={ref}
        {...props}
      >
        {/* indicator */}
      </BaseProgress.Root>
    );
  }
);
```

**Fixed Code:**
```tsx
export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string; // Add this
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, size = 'md', className, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <BaseProgress.Root
        value={value}
        aria-label={ariaLabel} // Add this
        className={progressVariants({ size, className })}
        ref={ref}
        {...props}
      >
        {/* indicator */}
      </BaseProgress.Root>
    );
  }
);
```

**Usage Update in App.tsx:**
```tsx
// Before
<Progress value={33} size="sm" />

// After
<Progress value={33} size="sm" aria-label="Upload progress" />
<Progress value={66} size="md" aria-label="Processing status" />
<Progress value={90} size="lg" aria-label="Completion status" />
```

---

## Fix 2: Meter Component - Add aria-label

**File:** `src/components/Meter.tsx`

**Fixed Code:**
```tsx
export interface MeterProps extends React.ComponentPropsWithoutRef<'div'> {
  value: number;
  min?: number;
  max?: number;
  optimum?: number;
  low?: number;
  high?: number;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string; // Add this
}

export const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  ({ 
    value, 
    min = 0, 
    max = 100, 
    optimum, 
    low, 
    high, 
    size = 'md', 
    className,
    'aria-label': ariaLabel, // Add this
    ...props 
  }, ref) => {
    return (
      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={`${value}%`}
        aria-label={ariaLabel} // Add this
        className={meterVariants({ size, className })}
        ref={ref}
        {...props}
      >
        {/* indicator */}
      </div>
    );
  }
);
```

**Usage Update in App.tsx:**
```tsx
<Meter value={75} optimum={80} low={30} high={70} aria-label="System performance" />
<Meter value={45} optimum={80} low={30} high={70} aria-label="Battery level" />
<Meter value={20} optimum={80} low={30} high={70} aria-label="Storage capacity" />
```

---

## Fix 3: Switch Component - Add aria-label support

**File:** `src/components/Switch.tsx`

**Fixed Code:**
```tsx
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string; // Add this
}

export const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(
  ({ size = 'md', className, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <BaseSwitch.Root
        className={switchVariants({ size, className })}
        aria-label={ariaLabel} // Add this
        ref={ref}
        {...props}
      >
        <BaseSwitch.Thumb className={thumbVariants({ size })} />
      </BaseSwitch.Root>
    );
  }
);
```

**Usage Update in App.tsx:**
```tsx
// Wrap in label or add aria-label
<div className="flex items-center gap-3">
  <Switch 
    size="sm" 
    aria-label="Enable dark mode (small)" 
  />
  <Switch 
    size="md" 
    defaultChecked 
    aria-label="Enable notifications (medium)" 
  />
  <Switch 
    size="lg" 
    aria-label="Enable auto-save (large)" 
  />
</div>
```

---

## Fix 4: Checkbox Component - Ensure proper labeling

**File:** `src/components/Checkbox.tsx`

Add documentation comment:

```tsx
/**
 * Checkbox component
 * 
 * IMPORTANT: Checkboxes MUST have an associated label for accessibility.
 * 
 * Options:
 * 1. Use with <Label> element and htmlFor:
 *    <Checkbox id="terms" />
 *    <Label htmlFor="terms">Accept terms</Label>
 * 
 * 2. Use aria-label for standalone:
 *    <Checkbox aria-label="Accept terms" />
 * 
 * 3. Wrap in Field component:
 *    <Field>
 *      <FieldLabel>Accept terms</FieldLabel>
 *      <Checkbox />
 *    </Field>
 */
export const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>(
  // ... implementation
);
```

**Usage Update in App.tsx:**
```tsx
// Ensure ALL checkboxes have labels
<div className="flex items-center gap-3">
  <Checkbox id="checkbox-sm" size="sm" />
  <Label htmlFor="checkbox-sm">Small checkbox</Label>
</div>
<div className="flex items-center gap-3">
  <Checkbox id="checkbox-md" size="md" defaultChecked />
  <Label htmlFor="checkbox-md">Medium checkbox</Label>
</div>
<div className="flex items-center gap-3">
  <Checkbox id="checkbox-lg" size="lg" />
  <Label htmlFor="checkbox-lg">Large checkbox</Label>
</div>
```

---

## Fix 5: Radio Component - Ensure proper labeling

**File:** `src/components/Radio.tsx`

Add documentation similar to Checkbox.

**Usage Update in App.tsx:**
```tsx
<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-3">
    <Radio value="option-1" id="radio-1" />
    <Label htmlFor="radio-1">Option 1</Label>
  </div>
  <div className="flex items-center gap-3">
    <Radio value="option-2" id="radio-2" />
    <Label htmlFor="radio-2">Option 2</Label>
  </div>
  <div className="flex items-center gap-3">
    <Radio value="option-3" id="radio-3" disabled />
    <Label htmlFor="radio-3">Option 3 (Disabled)</Label>
  </div>
</RadioGroup>
```

---

## Fix 6: Button Component - Add aria-label to icon buttons

**File:** `src/App.tsx`

**Current Code:**
```tsx
<Button size="icon">
  <Heart size={20} />
</Button>
```

**Fixed Code:**
```tsx
<Button size="icon" aria-label="Add to favorites">
  <Heart size={20} />
</Button>
```

**Theme Toggle Button:**
```tsx
<Button
  variant="default"
  size="icon"
  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
  aria-label="Toggle theme" // Already present ✓
>
  {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
</Button>
```

---

## Fix 7: Select Component - Add accessible name

**File:** `src/App.tsx`

**Current Code:**
```tsx
<Select defaultValue="react">
  <SelectTrigger>
    <SelectValue>
      {(value) => value || 'Select framework'}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {/* options */}
  </SelectContent>
</Select>
```

**Fixed Code:**
```tsx
<Select defaultValue="react">
  <SelectTrigger aria-label="Choose a framework">
    <SelectValue>
      {(value) => value || 'Select framework'}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {/* options */}
  </SelectContent>
</Select>
```

---

## Fix 8: Slider Component - Add labels

**File:** `src/components/Slider.tsx`

Update interface to support aria-label:

```tsx
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}
```

**Usage Update:**
```tsx
// Option 1: With aria-label
<Slider 
  defaultValue={[50]} 
  max={100} 
  step={1}
  aria-label="Volume level"
/>

// Option 2: With Field (preferred)
<Field>
  <FieldLabel>Volume</FieldLabel>
  <Slider defaultValue={[50]} max={100} step={1} />
  <FieldDescription>Adjust the volume level</FieldDescription>
</Field>
```

---

## Fix 9: NumberField Component - Add labels

**File:** `src/App.tsx`

**Current Code:**
```tsx
<NumberField 
  defaultValue={10} 
  min={0} 
  max={100} 
  step={10}
  size="sm"
/>
```

**Fixed Code:**
```tsx
<Field>
  <FieldLabel>Quantity</FieldLabel>
  <NumberField 
    defaultValue={10} 
    min={0} 
    max={100} 
    step={10}
    size="sm"
  />
</Field>
```

---

## Fix 10: Button Color Contrast

**File:** `src/components/Button.tsx`

**Current Code:**
```tsx
flat: 'bg-transparent text-primary-600 dark:text-primary-400 hover:bg-secondary-100/50 dark:hover:bg-secondary-800/50',
```

**Fixed Code:**
```tsx
flat: 'bg-transparent text-primary-700 dark:text-primary-300 hover:bg-secondary-100/50 dark:hover:bg-secondary-800/50',
// OR add slight background
flat: 'bg-primary-50/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-900/40',
```

Test with contrast checker: https://webaim.org/resources/contrastchecker/
- Light mode: primary-700 (#1d4ed8) on neumorph-light-bg (#e0e5ec) = 5.8:1 ✓
- Dark mode: primary-300 (#93c5fd) on neumorph-dark-bg (#2c3e50) = 5.2:1 ✓

---

## Fix 11: Remove Nested Interactive Controls

**File:** `src/App.tsx`

**Current Code (INCORRECT):**
```tsx
<Card interactive padding="md"> {/* Interactive parent */}
  <CardHeader>
    <CardTitle>Interactive Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card has hover effects for interactive use.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm"> {/* Nested interactive */}
      Click me
    </Button>
  </CardFooter>
</Card>
```

**Fixed Code (CORRECT):**
```tsx
<Card padding="md"> {/* Remove interactive prop */}
  <CardHeader>
    <CardTitle>Card with Action</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card contains an action button.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm">
      Click me
    </Button>
  </CardFooter>
</Card>
```

**Alternative:** If entire card needs to be clickable:
```tsx
<Card 
  as="button" 
  onClick={handleClick}
  padding="md"
  className="text-left" // Keep text aligned
>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Click anywhere on this card.</p>
  </CardContent>
</Card>
```

---

## Fix 12: Add Main Landmark

**File:** `src/App.tsx`

**Current Code:**
```tsx
function DemoContent() {
  return (
    <div className="min-h-screen py-12 px-4">
      {/* content */}
    </div>
  );
}
```

**Fixed Code:**
```tsx
function DemoContent() {
  return (
    <main className="min-h-screen py-12 px-4"> {/* Change div to main */}
      {/* content */}
    </main>
  );
}
```

---

## Fix 13: Heading Hierarchy

**File:** `src/App.tsx`

Ensure headings follow logical order (h1 → h2 → h3):

```tsx
<h1>Neumorphism UI Library</h1> {/* ✓ Main title */}

<h2>Cards</h2> {/* ✓ Section title */}

<Card>
  <CardTitle>Default Card</CardTitle> {/* This should be h3 */}
</Card>
```

**In Card.tsx:**
```tsx
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => { // Default to h3
    return (
      <Component
        ref={ref}
        className={cn('text-lg font-semibold text-secondary-900 dark:text-secondary-100', className)}
        {...props}
      />
    );
  }
);
```

---

## Fix 14: Toggle Buttons - Add aria-label

**File:** `src/App.tsx`

**Current Code:**
```tsx
<Toggle>
  <Bold className="h-4 w-4" />
</Toggle>
```

**Fixed Code:**
```tsx
<Toggle aria-label="Bold text">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle aria-label="Italic text">
  <Italic className="h-4 w-4" />
</Toggle>
<Toggle aria-label="Underline text">
  <Underline className="h-4 w-4" />
</Toggle>
```

---

## Testing After Fixes

### 1. Run Accessibility Tests
```bash
npm run test:accessibility
```

### 2. Manual Verification
- Use screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- Tab through all interactive elements
- Verify all controls have accessible names
- Check color contrast with browser DevTools

### 3. Automated Validation
```bash
# Run full test suite
npm run test

# Should see improved pass rate (target: 95%+)
```

### 4. Browser Extensions
- **axe DevTools** - https://www.deque.com/axe/devtools/
- **WAVE** - https://wave.webaim.org/extension/
- **Lighthouse** - Built into Chrome DevTools

---

## Validation Checklist

After implementing fixes, verify:

- [ ] All Progress bars have `aria-label`
- [ ] All Meter components have `aria-label`
- [ ] All standalone Switches have labels or `aria-label`
- [ ] All standalone Checkboxes have labels
- [ ] All Radio buttons have labels
- [ ] All icon-only Buttons have `aria-label`
- [ ] Select combobox triggers have accessible names
- [ ] All Sliders have labels
- [ ] All NumberFields have labels
- [ ] Flat button variant meets 4.5:1 contrast ratio
- [ ] No nested interactive controls
- [ ] `<main>` landmark present
- [ ] Heading hierarchy is logical (h1→h2→h3)
- [ ] All Toggle buttons have `aria-label`

---

## Expected Results

After implementing all fixes:

**Before:**
- WCAG 2.1 AA Compliance: 60% ❌
- Accessibility violations: 50+ instances
- Pass rate: ~60%

**After:**
- WCAG 2.1 AA Compliance: 95%+ ✓
- Accessibility violations: <5 instances
- Pass rate: ~95%+

---

## Need Help?

### Resources:
- **WCAG Quick Reference:** https://www.w3.org/WAI/WCAG21/quickref/
- **WAI-ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **Base UI Accessibility:** https://base-ui.com/react/getting-started/accessibility/
- **WebAIM Articles:** https://webaim.org/articles/

### Tools:
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **ARIA Validator:** https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/
- **axe DevTools:** https://www.deque.com/axe/devtools/

---

## Next Steps

1. **Week 1:** Implement Priority 1 fixes (7-8 hours)
2. **Week 2:** Run tests and verify fixes
3. **Week 3:** Implement Priority 2 fixes
4. **Week 4:** Final accessibility audit and documentation

**Target:** 100% WCAG 2.1 AA compliance
