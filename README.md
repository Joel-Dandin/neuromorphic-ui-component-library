# Neumorphism UI Component Library

A modern, accessible, and customizable UI component library built with **Neumorphism** design principles using Base UI, Tailwind CSS, and React.

## ✨ Features

- 🎨 **Neumorphism Design**: Soft UI with elegant shadows and depth
- ♿ **Accessible**: Built on Base UI's headless components
- 🎭 **Dark Mode**: Full dark mode support with smooth transitions
- 🎯 **Type-Safe**: Written in TypeScript with full type definitions
- 🎨 **Customizable**: Easy to customize with Tailwind CSS
- 📦 **Tree-Shakeable**: Import only what you need
- 🚀 **Modern Stack**: React 18, TypeScript, Vite

## 🎯 Design Principles

This library follows Neumorphism (Soft UI) design principles:
- **Soft Shadows**: Dual shadows (light and dark) create depth
- **Low Contrast**: Subtle color differences for a soft appearance
- **Rounded Corners**: Smooth, rounded borders throughout
- **Layered Appearance**: Elements appear to extrude from or press into the background
- **Minimal Color**: Primarily grayscale with accent colors for actions

## 📦 Components

### Form Components
- **Button** - Neumorphic buttons with variants (default, primary, flat) and sizes
- **Input** - Text input fields with inset shadow effect
- **Checkbox** - Accessible checkbox with check indicator
- **Radio** - Radio buttons for single selection within a group
- **Switch** - Toggle switch with smooth animations
- **Field** - Form field wrapper with label, description, and error handling
- **Select** - Dropdown select with Neumorphic styling
- **Slider** - Range slider with gradient indicator
- **NumberField** - Enhanced number input with increment/decrement buttons and scrub area

### Layout Components
- **Card** - Versatile container with header, content, and footer sections
- **Separator** - Visual divider for separating content
- **Accordion** - Collapsible content panels

### Overlay Components
- **Dialog** - Modal dialog with backdrop
- **AlertDialog** - Alert dialog for important user decisions
- **Tooltip** - Contextual tooltips
- **Popover** - Floating content panel
- **Menu** - Dropdown menu with items, checkboxes, and radio groups

### Navigation Components
- **Tabs** - Tabbed navigation interface

### Feedback Components
- **Progress** - Progress bar with gradient fill

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the component showcase.

### Build

```bash
npm run build
```

## 🎨 Usage Examples

### Button

```tsx
import { Button } from './components/Button'

function App() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="flat">Flat</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </>
  )
}
```

### Input with Field

```tsx
import { Field, FieldLabel, FieldDescription, Input } from './components'

function App() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldDescription>Enter your email address</FieldDescription>
      <Input type="email" placeholder="email@example.com" />
    </Field>
  )
}
```

### Switch

```tsx
import { Switch } from './components/Switch'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Switch 
      checked={checked} 
      onCheckedChange={setChecked}
      size="md"
    />
  )
}
```

### Checkbox

```tsx
import { Checkbox } from './components/Checkbox'

function App() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms</label>
    </div>
  )
}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content...</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/Select'

function App() {
  return (
    <Select defaultValue="react">
      <SelectTrigger>
        <SelectValue>
          {(value) => value || 'Select framework'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './components/Dialog'

function App() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          Dialog description and content goes here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'

function App() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        Content 1
      </TabsContent>
      <TabsContent value="tab2">
        Content 2
      </TabsContent>
    </Tabs>
  )
}
```

### Slider

```tsx
import { Slider } from './components/Slider'

function App() {
  return (
    <Slider 
      defaultValue={[50]} 
      max={100} 
      step={1}
      size="md"
    />
  )
}
```

### Progress

```tsx
import { Progress } from './components/Progress'

function App() {
  return (
    <Progress value={66} size="md" />
  )
}
```

### Tooltip

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip'

function App() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          Helpful tooltip text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent } from './components/Popover'

function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p>Popover content goes here.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

### Radio

```tsx
import { Radio, RadioGroup } from './components/Radio'
import { Label } from './components/Field'

function App() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <Radio value="option-1" size="md" />
        <Label>Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="option-2" size="md" />
        <Label>Option 2</Label>
      </div>
    </RadioGroup>
  )
}
```

### Separator

```tsx
import { Separator } from './components/Separator'

function App() {
  return (
    <div>
      <p>Section 1</p>
      <Separator orientation="horizontal" />
      <p>Section 2</p>
    </div>
  )
}
```

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion'

function App() {
  return (
    <Accordion defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>
          Answer to question 1 goes here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2</AccordionTrigger>
        <AccordionContent>
          Answer to question 2 goes here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### Alert Dialog

```tsx
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogClose } from './components/AlertDialog'

function App() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="primary">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account.
        </AlertDialogDescription>
        <div className="mt-6 flex gap-3 justify-end">
          <AlertDialogClose>
            <Button variant="flat">Cancel</Button>
          </AlertDialogClose>
          <AlertDialogClose>
            <Button variant="primary">Delete</Button>
          </AlertDialogClose>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### Menu

```tsx
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuLabel } from './components/Menu'

function App() {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Open Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuSeparator />
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuSeparator />
        <MenuItem>Logout</MenuItem>
      </MenuContent>
    </Menu>
  )
}
```

### Number Field

```tsx
import { NumberField } from './components/NumberField'

function App() {
  return (
    <NumberField 
      defaultValue={50} 
      min={0} 
      max={100} 
      step={5}
      size="md"
    />
  )
}
```

## 🎨 Theme Customization

The library uses a custom Tailwind CSS theme with Neumorphism design tokens:

### Colors

```js
colors: {
  primary: { /* Blue accent colors */ },
  secondary: { /* Gray scale colors */ },
  'neumorph-light-bg': '#e0e5ec',
  'neumorph-dark-bg': '#2c3e50',
}
```

### Shadows

- `shadow-neumorph` - Standard Neumorphic shadow
- `shadow-neumorph-sm` - Small Neumorphic shadow
- `shadow-neumorph-lg` - Large Neumorphic shadow
- `shadow-neumorph-inset` - Inset Neumorphic shadow (for inputs)

Each shadow has a dark mode variant (e.g., `dark:shadow-neumorph-dark`).

### Border Radius

- `rounded-neumorph-sm` - 8px
- `rounded-neumorph` - 12px
- `rounded-neumorph-lg` - 16px

## 🌓 Dark Mode

Dark mode is supported via the `ThemeProvider`:

```tsx
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

Use the `useTheme` hook to control the theme:

```tsx
import { useTheme } from './components/theme-provider'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  )
}
```

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Build tool and dev server
- **Base UI 1.0.0** - Headless, accessible components
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **CVA 0.7.1** - Component variant management
- **tailwind-merge 2.5.5** - Class conflict resolution
- **Lucide React 0.462.0** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Switch.tsx
│   ├── Checkbox.tsx
│   ├── Field.tsx
│   ├── Select.tsx
│   ├── Dialog.tsx
│   ├── Tooltip.tsx
│   ├── Slider.tsx
│   ├── Progress.tsx
│   ├── Tabs.tsx
│   ├── Popover.tsx
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
├── App.tsx
└── index.ts
```

## 🎯 Component Patterns

This library uses Base UI's two component patterns:

### Simple Components
Used directly without `.Root`:
- `Button`
- `Input`

```tsx
<Button>Click me</Button>
<Input placeholder="Type here" />
```

### Compound Components
Use `.Root` with sub-components:
- `Switch` → `BaseSwitch.Root`, `BaseSwitch.Thumb`
- `Checkbox` → `BaseCheckbox.Root`, `BaseCheckbox.Indicator`
- `Field` → `BaseField.Root`, `BaseField.Label`, etc.
- `Select` → `BaseSelect.Root`, `BaseSelect.Item`, etc.
- `Slider` → `BaseSlider.Root`, `BaseSlider.Track`, `BaseSlider.Thumb`

These are wrapped for convenience:

```tsx
<Switch /> // Internally uses BaseSwitch.Root + BaseSwitch.Thumb
<Checkbox /> // Internally uses BaseCheckbox.Root + BaseCheckbox.Indicator
```

## 🔍 Important Notes

### Field Label Components

The library provides two label components:

- **`Label`** - Standalone `<label>` element for use anywhere (e.g., with checkboxes)
- **`FieldLabel`** - Must be used inside `<Field>` components (uses Base UI Field context)

```tsx
// ✅ Correct
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input />
</Field>

// ✅ Also correct
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree</Label>
</div>

// ❌ Wrong - FieldLabel outside Field
<div>
  <FieldLabel>Email</FieldLabel>
  <Input />
</div>
```

### Input Size Prop

The `Input` component omits the native HTML `size` attribute to avoid conflicts with CVA variants. Use CSS classes to control input width:

```tsx
<Input className="w-full" />
<Input className="w-64" />
```

### SelectValue Placeholder

`SelectValue` doesn't have a `placeholder` prop. Use the `children` function instead:

```tsx
<SelectValue>
  {(value) => value || 'Select an option'}
</SelectValue>
```

## 🎨 Design System Reference

This library follows design principles from:
- Neumorphism / Soft UI design patterns
- Base UI accessibility standards
- Modern web design best practices

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Resources

- [Base UI Documentation](https://base-ui.com/react)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Neumorphism Design](https://neumorphism.io/)
