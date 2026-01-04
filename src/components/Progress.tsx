import * as React from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva(
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

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Root>, 'children'>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, size, value, ...props }, ref) => {
    return (
      <BaseProgress.Root
        ref={ref}
        className={cn(progressVariants({ size, className }))}
        value={value}
        {...props}
      >
        <BaseProgress.Indicator
          className={cn(
            'h-full w-full flex-1',
            'bg-gradient-to-r from-primary-500 to-primary-600',
            'transition-all duration-300 ease-in-out',
            'shadow-sm'
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </BaseProgress.Root>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
