import * as React from 'react'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { cn } from '@/lib/utils'

const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>
>(({ className, ...props }, ref) => (
  <BaseFieldset.Root
    ref={ref}
    className={cn(
      'rounded-neumorph p-4 space-y-4',
      'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
      'shadow-neumorph dark:shadow-neumorph-dark',
      className
    )}
    {...props}
  />
))
Fieldset.displayName = 'Fieldset'

const FieldsetLegend = React.forwardRef<
  HTMLLegendElement,
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>
>(({ className, ...props }, ref) => (
  <BaseFieldset.Legend
    ref={ref}
    className={cn(
      'text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4',
      className
    )}
    {...props}
  />
))
FieldsetLegend.displayName = 'FieldsetLegend'

export { Fieldset, FieldsetLegend }
