import * as React from 'react'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const meterVariants = cva(
  [
    'relative overflow-hidden',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-2 rounded-neumorph-sm',
        md: 'h-3 rounded-neumorph',
        lg: 'h-4 rounded-neumorph',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface MeterProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Root>, 'children'>,
    VariantProps<typeof meterVariants> {}

const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  ({ className, size, value, min = 0, max = 100, ...props }, ref) => {
    // Calculate state based on value
    const percentage = ((value || 0) / max) * 100
    const state = percentage >= 70 ? 'optimal' : percentage >= 40 ? 'sub-optimal' : 'critical'
    
    return (
      <BaseMeter.Root
        ref={ref}
        className={cn(meterVariants({ size, className }))}
        value={value}
        min={min}
        max={max}
        {...props}
      >
        <BaseMeter.Indicator
          className={cn(
            'h-full transition-all duration-300 ease-in-out',
            state === 'sub-optimal' && 'bg-yellow-500 dark:bg-yellow-600',
            state === 'optimal' && 'bg-gradient-to-r from-green-500 to-green-600',
            state === 'critical' && 'bg-gradient-to-r from-red-500 to-red-600'
          )}
          style={{ width: `${percentage}%` }}
        />
      </BaseMeter.Root>
    )
  }
)

Meter.displayName = 'Meter'

export { Meter }
