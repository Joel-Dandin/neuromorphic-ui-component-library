import * as React from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sliderVariants = cva(
  [
    'relative flex items-center select-none touch-none w-full',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, 'children'>,
    VariantProps<typeof sliderVariants> {}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <BaseSlider.Root
        ref={ref}
        className={cn(sliderVariants({ size, className }))}
        {...props}
      >
        <BaseSlider.Track
          className={cn(
            'relative h-full w-full grow overflow-hidden rounded-full',
            'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
            'shadow-neumorph-inset dark:shadow-neumorph-dark-inset'
          )}
        >
          <BaseSlider.Indicator
            className={cn(
              'absolute h-full',
              'bg-gradient-to-r from-primary-500 to-primary-600',
              'rounded-full'
            )}
          />
        </BaseSlider.Track>
        <BaseSlider.Thumb
          className={cn(
            'block h-5 w-5 rounded-full',
            'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
            'shadow-neumorph dark:shadow-neumorph-dark',
            'ring-offset-background transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            'hover:shadow-neumorph-lg hover:dark:shadow-neumorph-dark-lg',
            'disabled:pointer-events-none disabled:opacity-50',
            'cursor-grab active:cursor-grabbing'
          )}
        />
      </BaseSlider.Root>
    )
  }
)

Slider.displayName = 'Slider'

export { Slider }
