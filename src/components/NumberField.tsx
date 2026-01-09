import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const numberFieldVariants = cva(
  [
    'flex items-center gap-1',
    'rounded-neumorph',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 px-2',
        md: 'h-11 px-3',
        lg: 'h-14 px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface NumberFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'children'>,
    VariantProps<typeof numberFieldVariants> {}

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <BaseNumberField.Root
        ref={ref}
        className={cn(numberFieldVariants({ size, className }))}
        {...props}
      >
        <BaseNumberField.ScrubArea className="flex-1">
          <BaseNumberField.ScrubAreaCursor />
          <BaseNumberField.Input
            className={cn(
              'w-full bg-transparent text-secondary-900 dark:text-secondary-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
              'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg'
            )}
          />
        </BaseNumberField.ScrubArea>
        <div className="flex flex-col -my-1">
          <BaseNumberField.Increment
            className={cn(
              'flex items-center justify-center',
              'rounded-neumorph-sm p-0.5',
              'shadow-neumorph dark:shadow-neumorph-dark',
              'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-1',
              'transition-all duration-150',
              'text-secondary-600 dark:text-secondary-400'
            )}
            aria-label="Increment"
          >
            <ChevronUp className="h-3 w-3" />
          </BaseNumberField.Increment>
          <BaseNumberField.Decrement
            className={cn(
              'flex items-center justify-center',
              'rounded-neumorph-sm p-0.5',
              'shadow-neumorph dark:shadow-neumorph-dark',
              'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-1',
              'transition-all duration-150',
              'text-secondary-600 dark:text-secondary-400'
            )}
            aria-label="Decrement"
          >
            <ChevronDown className="h-3 w-3" />
          </BaseNumberField.Decrement>
        </div>
      </BaseNumberField.Root>
    )
  }
)

NumberField.displayName = 'NumberField'

export { NumberField }
