import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const selectTriggerVariants = cva(
  [
    'flex items-center justify-between w-full px-4 py-2.5',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'text-secondary-900 dark:text-secondary-100',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
    'transition-all duration-200',
    'focus-visible:shadow-neumorph-sm dark:focus-visible:shadow-neumorph-dark-sm',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'data-[popup-open]:shadow-neumorph-sm data-[popup-open]:dark:shadow-neumorph-dark-sm',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 text-sm rounded-neumorph-sm',
        md: 'h-11 text-base rounded-neumorph',
        lg: 'h-14 text-lg rounded-neumorph-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const selectContentVariants = cva(
  [
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
    'rounded-neumorph',
    'p-2',
    'max-h-[300px] overflow-auto',
    'z-50',
  ].join(' ')
)

const selectItemVariants = cva(
  [
    'relative flex items-center justify-between',
    'px-3 py-2 rounded-neumorph-sm',
    'text-secondary-900 dark:text-secondary-100',
    'cursor-pointer',
    'transition-all duration-150',
    'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
    'data-[highlighted]:shadow-neumorph-sm data-[highlighted]:dark:shadow-neumorph-dark-sm',
    'data-[selected]:text-primary-600 data-[selected]:dark:text-primary-400',
    'focus:outline-none',
  ].join(' ')
)

export interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}

const Select = BaseSelect.Root

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> & VariantProps<typeof selectTriggerVariants>
>(({ className, size, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ size, className }))}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = BaseSelect.Value

const SelectPortal = BaseSelect.Portal

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>
>(({ className, ...props }, ref) => (
  <SelectPortal>
    <BaseSelect.Positioner>
      <BaseSelect.Popup
        ref={ref}
        className={cn(selectContentVariants(), className)}
        {...props}
      />
    </BaseSelect.Positioner>
  </SelectPortal>
))
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(selectItemVariants(), className)}
    {...props}
  >
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    <BaseSelect.ItemIndicator>
      <Check className="h-4 w-4" />
    </BaseSelect.ItemIndicator>
  </BaseSelect.Item>
))
SelectItem.displayName = 'SelectItem'

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
