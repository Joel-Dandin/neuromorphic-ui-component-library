import * as React from 'react'
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { cn } from '@/lib/utils'

const Toolbar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>
>(({ className, ...props }, ref) => (
  <BaseToolbar.Root
    ref={ref}
    className={cn(
      'flex items-center gap-2 rounded-neumorph p-2',
      'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
      'shadow-neumorph dark:shadow-neumorph-dark',
      className
    )}
    {...props}
  />
))
Toolbar.displayName = 'Toolbar'

const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-neumorph-sm px-3 py-2',
      'text-sm font-medium',
      'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
      'text-secondary-900 dark:text-secondary-100',
      'shadow-neumorph dark:shadow-neumorph-dark',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'disabled:pointer-events-none disabled:opacity-50',
      'transition-all',
      className
    )}
    {...props}
  />
))
ToolbarButton.displayName = 'ToolbarButton'

const ToolbarSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-px h-6 bg-secondary-200 dark:bg-secondary-700', className)}
    {...props}
  />
))
ToolbarSeparator.displayName = 'ToolbarSeparator'

export { Toolbar, ToolbarButton, ToolbarSeparator }
