import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'relative overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'shadow-neumorph dark:shadow-neumorph-dark',
          'hover:shadow-neumorph-lg dark:hover:shadow-neumorph-dark-lg',
          'active:shadow-neumorph-inset dark:active:shadow-neumorph-dark-inset',
          'text-secondary-900 dark:text-secondary-100',
        ].join(' '),
        primary: [
          'shadow-neumorph dark:shadow-neumorph-dark',
          'hover:shadow-neumorph-lg dark:hover:shadow-neumorph-dark-lg',
          'active:shadow-neumorph-inset dark:active:shadow-neumorph-dark-inset',
          'text-primary-600 dark:text-primary-400',
          'font-semibold',
        ].join(' '),
        flat: [
          'shadow-none',
          'hover:shadow-neumorph-sm dark:hover:shadow-neumorph-dark-sm',
          'active:shadow-neumorph-inset dark:active:shadow-neumorph-dark-inset',
          'text-secondary-700 dark:text-secondary-300',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-neumorph-sm',
        md: 'h-11 px-6 text-base rounded-neumorph',
        lg: 'h-14 px-8 text-lg rounded-neumorph-lg',
        icon: 'h-11 w-11 rounded-neumorph',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
