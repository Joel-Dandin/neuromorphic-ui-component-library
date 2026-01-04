import * as React from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const radioVariants = cva(
  [
    'peer relative inline-flex items-center justify-center rounded-full',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:pointer-events-none',
    'data-[checked]:shadow-neumorph data-[checked]:dark:shadow-neumorph-dark',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, 'children'>,
    VariantProps<typeof radioVariants> {}

const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <BaseRadio.Root
        ref={ref}
        className={cn(radioVariants({ size, className }))}
        {...props}
      >
        <BaseRadio.Indicator
          className={cn(
            'flex items-center justify-center',
            'after:content-[""] after:block after:rounded-full',
            'after:bg-gradient-to-br after:from-primary-500 after:to-primary-600',
            size === 'sm' && 'after:h-1.5 after:w-1.5',
            size === 'md' && 'after:h-2 after:w-2',
            size === 'lg' && 'after:h-2.5 after:w-2.5'
          )}
        />
      </BaseRadio.Root>
    )
  }
)

Radio.displayName = 'Radio'

// Radio Group for managing multiple radios
const RadioGroup = BaseRadioGroup

export { Radio, RadioGroup }
