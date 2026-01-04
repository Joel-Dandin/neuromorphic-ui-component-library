import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const switchVariants = cva(
  [
    'relative inline-flex items-center',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'rounded-neumorph-lg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
    'transition-all duration-200',
    'cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const switchThumbVariants = cva(
  [
    'absolute left-0.5',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'rounded-full',
    'shadow-neumorph dark:shadow-neumorph-dark',
    'transition-all duration-200',
    'data-[state=checked]:shadow-neumorph-sm data-[state=checked]:dark:shadow-neumorph-dark-sm',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, 'children'>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <BaseSwitch.Root
        ref={ref}
        className={cn(switchVariants({ size, className }))}
        {...props}
      >
        <BaseSwitch.Thumb className={cn(switchThumbVariants({ size }))} />
      </BaseSwitch.Root>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch }
