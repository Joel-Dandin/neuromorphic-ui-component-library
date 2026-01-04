import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '@/lib/utils'

const CheckboxGroup = BaseCheckboxGroup

const CheckboxGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2',
      className
    )}
    {...props}
  />
))
CheckboxGroupLabel.displayName = 'CheckboxGroupLabel'

export { CheckboxGroup, CheckboxGroupLabel }
