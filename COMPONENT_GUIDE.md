# Component Usage Guide

## Components

### Button
```tsx
import { Button } from './components/Button'

// Variants
<Button variant="default">Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="flat">Flat</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Input
```tsx
import { Input } from './components/Input'

// Sizes
<Input placeholder="Enter text" />
<Input size="sm" placeholder="Small" />
<Input size="lg" placeholder="Large" />

// Types
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'

// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>

// Variants
<Card variant="default">Raised card</Card>
<Card variant="flat">Flat card</Card>
<Card variant="pressed">Pressed card</Card>

// Interactive
<Card interactive>Clickable card</Card>
```

### Switch
```tsx
import { Switch } from './components/Switch'

const [checked, setChecked] = useState(false)

<Switch checked={checked} onCheckedChange={setChecked} />

// Sizes
<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />
```

### Checkbox
```tsx
import { Checkbox } from './components/Checkbox'

const [checked, setChecked] = useState(false)

<Checkbox checked={checked} onCheckedChange={setChecked} />

// Sizes
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />
```

### Field (Form Fields)
```tsx
import { Field, Label, FieldDescription, FieldError } from './components/Field'

<Field>
  <Label>Username</Label>
  <Input placeholder="Enter username" />
  <FieldDescription>Choose a unique username</FieldDescription>
  <FieldError>This field is required</FieldError>
</Field>
```

## Theme

### ThemeProvider
Wrap your app with the ThemeProvider to enable dark mode support:

```tsx
import { ThemeProvider, useTheme } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Your app */}
    </ThemeProvider>
  )
}

// In a component
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  return (
    <Button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  )
}
```

## Utilities

### cn (Class Name Utility)
```tsx
import { cn } from './lib/utils'

<div className={cn('base-class', condition && 'conditional-class')}>
  Content
</div>
```

## Neumorphism Design Principles

### Shadow System
- **Default State**: Raised appearance with dual shadows (light & dark)
- **Hover State**: Enhanced elevation with larger shadows
- **Active/Pressed State**: Inset shadows for pressed effect
- **Input Fields**: Inset shadows by default

### Color System
- **Light Mode**: `#e0e5ec` background with `#a3b1c6` dark shadow and `#ffffff` light shadow
- **Dark Mode**: `#2c3e50` background with `#1a2634` dark shadow and `#3e5266` light shadow

### Border Radius
- Small: `12px`
- Medium: `20px`
- Large: `30px`

### Custom Tailwind Classes
- `neumorph-base`: Base neumorphic styling
- `neumorph-pressed`: Pressed/inset appearance
- `neumorph-hover`: Enhanced hover state
- `neumorph-flat`: Flat background without shadows

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Type check
npm run type-check
```

## Browser Support
- Modern browsers with ES2020+ support
- CSS custom properties support required
- Flexbox and Grid support required
