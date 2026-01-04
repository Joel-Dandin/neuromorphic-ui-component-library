# Neumorphism UI Component Library

A modern, accessible UI component library built with **Neumorphism** design principles using Base UI, Tailwind CSS, and React.

## Features

- 🎨 **Neumorphism Design** - Soft UI with realistic depth and shadows
- ♿ **Accessible** - Built on Base UI for WCAG compliance
- 🌓 **Dark Mode** - Full theme support with smooth transitions
- 🎯 **Type-Safe** - Written in TypeScript
- 🎨 **Customizable** - Built with Tailwind CSS and CVA for easy styling
- 📦 **Tree-Shakeable** - Optimized bundle size

## Components

- **Button** - Various styles and sizes with Neumorphism effects
- **Input** - Form inputs with inset shadow styling
- **Card** - Versatile container with multiple variants
- **Switch** - Toggle switch with smooth animations
- **Checkbox** - Accessible checkbox with custom styling
- **Field** - Form field wrapper with label and validation

## Installation

```bash
npm install custom-component-lib-neumorphism
# or
yarn add custom-component-lib-neumorphism
# or
pnpm add custom-component-lib-neumorphism
```

## Usage

```tsx
import { Button, Card, Input, ThemeProvider } from 'custom-component-lib-neumorphism'
import 'custom-component-lib-neumorphism/styles.css'

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Input placeholder="Enter text" />
        <Button variant="primary">Submit</Button>
      </Card>
    </ThemeProvider>
  )
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Type check
npm run type-check
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Base UI** - Unstyled, accessible components
- **Class Variance Authority** - Component variants
- **Lucide React** - Icon library
- **Vite** - Build tool

## Design Principles

This library follows Neumorphism (Soft UI) design principles:

- **Soft shadows** for depth perception
- **Subtle contrast** between elements and background
- **Rounded corners** for modern aesthetics
- **Inset shadows** for pressed/input states
- **Consistent elevation** system

## License

MIT
