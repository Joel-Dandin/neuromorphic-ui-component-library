import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    'w-full px-4 py-2.5',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'text-secondary-900 dark:text-secondary-100',
    'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
    'transition-all duration-200',
    'focus-visible:shadow-neumorph-sm dark:focus-visible:shadow-neumorph-dark-sm',
    'focus-visible:outline-none',
    'disabled:opacity-50 disabled:pointer-events-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 text-sm rounded-neumorph-sm',
        md: 'h-11 text-base rounded-neumorph',
        lg: 'h-14 text-lg rounded-neumorph-lg',
      },
      variant: {
        default: '',
        error: 'ring-2 ring-red-500/30',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, type = 'text', ...props }, ref) => {
    return (
      <BaseInput
        type={type}
        className={cn(inputVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
