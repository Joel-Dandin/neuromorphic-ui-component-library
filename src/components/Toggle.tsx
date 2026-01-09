import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center rounded-neumorph',
    'text-sm font-medium transition-all',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'text-secondary-600 dark:text-secondary-400',
    'shadow-neumorph dark:shadow-neumorph-dark',
    'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
    'data-[pressed]:shadow-neumorph-inset data-[pressed]:dark:shadow-neumorph-dark-inset',
    'data-[pressed]:text-primary-600 data-[pressed]:dark:text-primary-400',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5',
        md: 'h-10 px-3',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, ...props }, ref) => (
    <BaseToggle ref={ref} className={cn(toggleVariants({ size, className }))} {...props} />
  )
)

Toggle.displayName = 'Toggle'

export { Toggle, toggleVariants }
