import * as React from 'react'
import { Field as BaseField } from '@base-ui/react/field'
import { cn } from '@/lib/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof BaseField.Label>
>(({ className, ...props }, ref) => (
  <BaseField.Label
    ref={ref}
    className={cn(
      'text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5 block',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseField.Description>
>(({ className, ...props }, ref) => (
  <BaseField.Description
    ref={ref}
    className={cn('text-sm text-secondary-600 dark:text-secondary-400 mt-1', className)}
    {...props}
  />
))
FieldDescription.displayName = 'FieldDescription'

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseField.Error>
>(({ className, ...props }, ref) => (
  <BaseField.Error
    ref={ref}
    className={cn('text-sm text-red-600 dark:text-red-400 mt-1', className)}
    {...props}
  />
))
FieldError.displayName = 'FieldError'

export interface FieldProps extends React.ComponentPropsWithoutRef<typeof BaseField> {}

const Field = BaseField

export { Field, Label, FieldDescription, FieldError }
