import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const checkboxVariants = cva(
  [
    'inline-flex items-center justify-center',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
    'transition-all duration-200',
    'cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    'data-[state=checked]:shadow-neumorph-sm data-[state=checked]:dark:shadow-neumorph-dark-sm',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4 rounded-neumorph-sm',
        md: 'h-5 w-5 rounded-neumorph-sm',
        lg: 'h-6 w-6 rounded-neumorph',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox>, 'children'>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, size, ...props }, ref) => {
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14

    return (
      <BaseCheckbox
        ref={ref}
        className={cn(checkboxVariants({ size, className }))}
        {...props}
      >
        <BaseCheckbox.Indicator>
          <Check
            className="text-primary-600 dark:text-primary-400"
            size={iconSize}
            strokeWidth={3}
          />
        </BaseCheckbox.Indicator>
      </BaseCheckbox>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
