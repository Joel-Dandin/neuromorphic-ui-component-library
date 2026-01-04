import * as React from 'react'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const separatorVariants = cva(
  [
    'shrink-0 bg-secondary-200 dark:bg-secondary-700',
    'shadow-sm',
  ].join(' '),
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
)

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSeparator>, 'orientation'>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <BaseSeparator
      ref={ref}
      orientation={orientation || 'horizontal'}
      className={cn(separatorVariants({ orientation: orientation || 'horizontal' }), className)}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

export { Separator }
