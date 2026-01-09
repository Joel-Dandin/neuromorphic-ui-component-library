# Accessibility Guide

## Overview

The Neuromorphic UI Component Library is built with accessibility as a core principle. All components are designed to meet **WCAG 2.1 Level AA** standards and follow **WAI-ARIA** best practices.

## Key Accessibility Features

### 1. **Keyboard Navigation**

All interactive components are fully keyboard accessible:

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons, checkboxes, switches
- **Arrow Keys**: Navigate within select dropdowns, tabs, menus, and radio groups
- **Escape**: Close modals, dialogs, dropdowns, and popover menus
- **Home/End**: Jump to first/last items in lists

### 2. **Focus Indicators**

Enhanced focus indicators for better visibility:

- **Ring Offset**: All interactive components use `ring-offset-2` to create clear separation from component backgrounds
- **High Contrast**: Focus rings use primary color with 50% opacity for optimal contrast
- **Visible Focus**: Focus indicators are clearly visible on all components in both light and dark modes

### 3. **ARIA Attributes**

Proper ARIA attributes are implemented through Base UI:

- **Roles**: Correct ARIA roles for all interactive components
- **States**: Dynamic `aria-checked`, `aria-expanded`, `aria-selected` attributes
- **Labels**: Proper `aria-label` and `aria-labelledby` associations
- **Descriptions**: `aria-describedby` for helper text and error messages
- **Live Regions**: `aria-live` for dynamic content updates

### 4. **High Contrast Mode**

Automatic support for users with high contrast preferences:

- System-level high contrast detection via `@media (prefers-contrast: more)`
- Enhanced shadow contrast in high contrast mode
- Utility classes for high contrast text and borders

**Utility Classes:**
```css
.high-contrast-text      /* Enhanced text contrast */
.high-contrast-border    /* Visible borders for better component definition */
.focus-visible-enhanced  /* Stronger focus indicators */
```

### 5. **Screen Reader Support**

Components are optimized for screen readers:

- **Semantic HTML**: Proper use of semantic elements (buttons, headings, labels)
- **Hidden Content**: `.sr-only` class for screen reader only content
- **Descriptive Labels**: All form controls have associated labels
- **Landmark Regions**: Proper use of ARIA landmarks where applicable

### 6. **Color Contrast**

Text and interactive elements meet WCAG AA contrast requirements:

- **Light Mode**: Text uses `secondary-900` (dark) on `neumorph-light-bg` background
- **Dark Mode**: Text uses `secondary-100` (light) on `neumorph-dark-bg` background
- **Interactive Elements**: Primary color palette optimized for contrast
- **Disabled States**: 50% opacity ensures disabled elements are still perceivable

## Component-Specific Accessibility

### Buttons

- ✅ Keyboard accessible (Enter/Space to activate)
- ✅ Clear focus indicators
- ✅ Proper disabled state
- ✅ `aria-label` support for icon-only buttons

**Example:**
```tsx
<Button aria-label="Close dialog" size="icon">
  <X />
</Button>
```

### Form Controls

#### Input Fields
- ✅ Label associations via `FieldLabel` component
- ✅ Helper text via `FieldDescription`
- ✅ Error messages via `FieldError`
- ✅ Proper `type` attributes for different input types

**Example:**
```tsx
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldDescription>We'll never share your email</FieldDescription>
</Field>
```

#### Checkboxes & Switches
- ✅ Proper `role="checkbox"` and `role="switch"`
- ✅ `aria-checked` state management
- ✅ Space key to toggle
- ✅ Label associations

#### Radio Buttons
- ✅ Proper `role="radio"` and `role="radiogroup"`
- ✅ Arrow key navigation within groups
- ✅ Single selection enforcement

#### Select Dropdowns
- ✅ `role="combobox"` and `role="listbox"`
- ✅ Arrow key navigation
- ✅ Type-ahead search
- ✅ Escape to close

#### Sliders
- ✅ `role="slider"`
- ✅ Arrow keys for value adjustment
- ✅ `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

#### Number Fields
- ✅ Increment/decrement buttons with `aria-label`
- ✅ Keyboard input support
- ✅ Arrow key value adjustment

### Dialogs & Modals

- ✅ `role="dialog"` with `aria-modal="true"`
- ✅ Focus trap (focus stays within dialog)
- ✅ Escape key to close
- ✅ Focus restoration on close
- ✅ Backdrop prevents interaction with background
- ✅ Close button with `aria-label="Close dialog"`

### Tabs

- ✅ `role="tablist"`, `role="tab"`, `role="tabpanel"`
- ✅ Arrow key navigation between tabs
- ✅ `aria-selected` for active tab
- ✅ Tab panels associated with tabs

### Menus & Context Menus

- ✅ `role="menu"` and `role="menuitem"`
- ✅ Arrow key navigation
- ✅ Submenu support with proper ARIA
- ✅ Checkbox and radio menu items

### Accordions & Collapsibles

- ✅ `role="button"` for triggers
- ✅ `aria-expanded` state
- ✅ Enter/Space to toggle
- ✅ Proper heading hierarchy

### Progress & Meters

- ✅ `role="progressbar"` and `role="meter"`
- ✅ `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- ✅ Descriptive labels

## Testing for Accessibility

### Keyboard Testing

Test all interactions without a mouse:

1. Navigate using only Tab and Shift+Tab
2. Activate all interactive elements with Enter/Space
3. Ensure no keyboard traps exist
4. Verify focus indicators are visible

### Screen Reader Testing

Recommended screen readers:

- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca

### Automated Testing

The library includes Playwright + Axe-Core tests:

```bash
npm test              # Run all accessibility tests
npm run test:headed   # Watch tests in browser
```

### Manual Checks

- [ ] Zoom to 200% - text should remain readable
- [ ] Enable high contrast mode - components should remain visible
- [ ] Use only keyboard - all functions should be accessible
- [ ] Use screen reader - all content should be announced properly
- [ ] Check color contrast ratios with browser tools

## Best Practices

### When Using Components

1. **Always provide labels** for form controls:
   ```tsx
   <Field>
     <FieldLabel>Username</FieldLabel>
     <Input />
   </Field>
   ```

2. **Use semantic HTML** alongside components:
   ```tsx
   <main>
     <h1>Page Title</h1>
     <section>
       <h2>Section Title</h2>
       {/* Content */}
     </section>
   </main>
   ```

3. **Provide alternative text** for images:
   ```tsx
   <Avatar>
     <AvatarImage src="photo.jpg" alt="John Doe profile picture" />
     <AvatarFallback>JD</AvatarFallback>
   </Avatar>
   ```

4. **Add aria-label to icon-only buttons**:
   ```tsx
   <Button aria-label="Delete item" size="icon">
     <Trash2 />
   </Button>
   ```

5. **Use descriptive link text**:
   ```tsx
   {/* Bad */}
   <a href="/docs">Click here</a>

   {/* Good */}
   <a href="/docs">Read the documentation</a>
   ```

6. **Provide error messages** for form validation:
   ```tsx
   <Field>
     <FieldLabel>Email</FieldLabel>
     <Input type="email" />
     <FieldError>Please enter a valid email address</FieldError>
   </Field>
   ```

## Accessibility Checklist

Use this checklist when building with the library:

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] Interactive elements are at least 44×44 pixels
- [ ] Pages have descriptive titles
- [ ] Headings are used in proper order (h1, h2, h3...)
- [ ] Skip links are provided for keyboard users
- [ ] Error messages are clear and helpful
- [ ] Time limits can be extended or disabled
- [ ] Animations can be disabled (respect `prefers-reduced-motion`)

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Base UI Accessibility](https://base-ui.com/react/guides/accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools Browser Extension](https://www.deque.com/axe/devtools/)

## Reporting Accessibility Issues

If you find an accessibility issue, please report it by:

1. Opening a GitHub issue
2. Describing the issue and which component is affected
3. Including steps to reproduce
4. Noting which assistive technology you're using (if applicable)
5. Suggesting a potential fix (if you have one)

## Future Improvements

Planned accessibility enhancements:

- [ ] Reduced motion support for animations
- [ ] Additional high-contrast themes
- [ ] Expanded screen reader testing
- [ ] Touch target size validation
- [ ] ARIA live region examples
- [ ] Accessibility testing guide for consumers

---

**Note**: While we strive for full accessibility, Base UI handles most of the complex ARIA patterns and keyboard interactions. Our custom styling maintains these accessibility features while adding the neumorphic visual design.
