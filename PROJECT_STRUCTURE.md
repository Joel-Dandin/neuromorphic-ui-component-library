# Project Structure

## Repository Branch Structure

This repository uses a **dual-branch workflow** to separate main development from testing:

- **`main` branch**: Contains the core component library code without test files
  - Used for production releases
  - Cleaner structure focused on library code
  - Faster CI/CD without test dependencies

- **`test-suite` branch**: Contains all testing infrastructure
  - Playwright test configuration
  - Test specifications
  - Test-specific dependencies
  - Can be developed and updated independently

This separation enables parallel development of the library and its test suite.

## Main Branch Structure

```
custom-component-lib-2/
├── src/
│   ├── components/
│   │   ├── Button.tsx           # Neumorphic button component
│   │   ├── Card.tsx              # Versatile card container
│   │   ├── Checkbox.tsx          # Accessible checkbox
│   │   ├── Field.tsx             # Form field wrapper
│   │   ├── Input.tsx             # Text input with inset shadow
│   │   ├── Switch.tsx            # Toggle switch
│   │   └── theme-provider.tsx   # Theme management
│   ├── lib/
│   │   └── utils.ts              # Utility functions (cn)
│   ├── styles/
│   │   └── globals.css           # Global styles & Neumorphism classes
│   ├── App.tsx                   # Demo application
│   ├── main.tsx                  # Entry point
│   └── index.ts                  # Library exports
├── node_modules/
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── COMPONENT_GUIDE.md
└── .gitignore
```

## Test Suite Branch Structure

```
custom-component-lib-2/
├── (all files from main branch)
├── tests/
│   ├── accessibility.spec.ts    # Accessibility compliance tests
│   ├── components.spec.ts       # Component functionality tests
│   └── responsive.spec.ts       # Responsive design tests
├── playwright.config.ts         # Playwright configuration
├── TEST_REPORT.md               # Test documentation
└── package.json                 # Includes test dependencies
```

## Key Files

### Configuration Files

- **package.json**: Project dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Vite build configuration
- **tailwind.config.js**: Tailwind CSS with Neumorphism theme
- **postcss.config.js**: PostCSS configuration

### Source Files

- **src/index.ts**: Main library entry point, exports all components
- **src/App.tsx**: Demo application showcasing all components
- **src/main.tsx**: React app entry point
- **src/components/**: All UI components
- **src/lib/utils.ts**: Utility functions (cn for class merging)
- **src/styles/globals.css**: Global styles and custom Neumorphism utilities

## Component Architecture

Each component follows this pattern:

1. **Base UI Import**: Imports unstyled, accessible component from @base-ui/react
2. **Styling with CVA**: Uses class-variance-authority for variant management
3. **Neumorphism Styling**: Applies custom shadow and border-radius classes
4. **TypeScript Types**: Fully typed with proper prop interfaces
5. **ForwardRef**: Supports ref forwarding for DOM access

## Styling System

### Layers
1. **Base Layer**: Resets and base styles
2. **Components Layer**: Component-specific styles (not used much, favor utility)
3. **Utilities Layer**: Custom utility classes for Neumorphism

### Custom Properties
- CSS custom properties for theming
- `--neumorph-bg`: Background color
- `--neumorph-shadow-dark`: Dark shadow color
- `--neumorph-shadow-light`: Light shadow color

### Tailwind Extensions
- Custom colors for Neumorphism (neumorph-light-*, neumorph-dark-*)
- Custom shadows (shadow-neumorph, shadow-neumorph-inset, etc.)
- Custom border-radius (rounded-neumorph, rounded-neumorph-sm, etc.)
- Custom animations (animate-press)

## Build Output

When built, the library generates:
- `dist/index.js`: Main library bundle
- `dist/index.d.ts`: TypeScript declarations
- `dist/styles.css`: Compiled styles

## Dependencies

### Production
- **@base-ui/react**: Unstyled, accessible base components
- **react & react-dom**: React framework
- **class-variance-authority**: Variant management
- **clsx**: Conditional class names
- **tailwind-merge**: Tailwind class conflict resolution
- **lucide-react**: Icon library

### Development
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **PostCSS & Autoprefixer**: CSS processing
