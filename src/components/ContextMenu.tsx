import * as React from 'react'
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ContextMenu = BaseContextMenu.Root

const ContextMenuTrigger = BaseContextMenu.Trigger

const ContextMenuPortal = BaseContextMenu.Portal

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>
>(({ className, ...props }, ref) => (
  <ContextMenuPortal>
    <BaseContextMenu.Popup
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-neumorph p-2',
        'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
        'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    />
  </ContextMenuPortal>
))
ContextMenuContent.displayName = 'ContextMenuContent'

const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseContextMenu.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-neumorph-sm px-3 py-2',
      'text-sm text-secondary-900 dark:text-secondary-100',
      'outline-none transition-all',
      'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'data-[highlighted]:shadow-neumorph-sm data-[highlighted]:dark:shadow-neumorph-dark-sm',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = 'ContextMenuItem'

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <BaseContextMenu.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-neumorph-sm py-2 pl-8 pr-3',
      'text-sm text-secondary-900 dark:text-secondary-100',
      'outline-none transition-all',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'data-[highlighted]:shadow-neumorph-sm data-[highlighted]:dark:shadow-neumorph-dark-sm',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <BaseContextMenu.CheckboxItemIndicator>
        <Check className="h-4 w-4" />
      </BaseContextMenu.CheckboxItemIndicator>
    </span>
    {children}
  </BaseContextMenu.CheckboxItem>
))
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem'

const ContextMenuRadioGroup = BaseContextMenu.RadioGroup

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>
>(({ className, children, ...props }, ref) => (
  <BaseContextMenu.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-neumorph-sm py-2 pl-8 pr-3',
      'text-sm text-secondary-900 dark:text-secondary-100',
      'outline-none transition-all',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'data-[highlighted]:shadow-neumorph-sm data-[highlighted]:dark:shadow-neumorph-dark-sm',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <BaseContextMenu.RadioItemIndicator>
        <div className="h-2 w-2 rounded-full bg-primary-500" />
      </BaseContextMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseContextMenu.RadioItem>
))
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem'

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-3 py-1.5 text-xs font-semibold text-secondary-600 dark:text-secondary-400',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = 'ContextMenuLabel'

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseContextMenu.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-secondary-200 dark:bg-secondary-700', className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = 'ContextMenuSeparator'

const ContextMenuSubmenuTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger>
>(({ className, children, ...props }, ref) => (
  <BaseContextMenu.SubmenuTrigger
    ref={ref}
    className={cn(
      'flex cursor-pointer select-none items-center rounded-neumorph-sm px-3 py-2',
      'text-sm text-secondary-900 dark:text-secondary-100',
      'outline-none transition-all',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'data-[highlighted]:shadow-neumorph-sm data-[highlighted]:dark:shadow-neumorph-dark-sm',
      'data-[state=open]:shadow-neumorph-sm data-[state=open]:dark:shadow-neumorph-dark-sm',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </BaseContextMenu.SubmenuTrigger>
))
ContextMenuSubmenuTrigger.displayName = 'ContextMenuSubmenuTrigger'

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSubmenuTrigger,
}
