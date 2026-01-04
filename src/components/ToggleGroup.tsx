import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleGroupVariants = cva(
  [
    'inline-flex items-center justify-center rounded-neumorph p-1 gap-1',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
  ].join(' ')
)

const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup>
>(({ className, ...props }, ref) => (
  <BaseToggleGroup
    ref={ref}
    className={cn(toggleGroupVariants(), className)}
    {...props}
  />
))
ToggleGroup.displayName = 'ToggleGroup'

const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-neumorph-sm px-3 py-2',
    'text-sm font-medium transition-all',
    'disabled:pointer-events-none disabled:opacity-50',
    'text-secondary-600 dark:text-secondary-400',
    'hover:text-secondary-900 hover:dark:text-secondary-100',
    'data-[pressed]:shadow-neumorph data-[pressed]:dark:shadow-neumorph-dark',
    'data-[pressed]:text-secondary-900 data-[pressed]:dark:text-secondary-100',
  ].join(' ')
)

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseToggle>
>(({ className, ...props }, ref) => (
  <BaseToggle
    ref={ref}
    className={cn(toggleGroupItemVariants(), className)}
    {...props}
  />
))
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem }
