import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const Menu = BaseMenu.Root

const MenuTrigger = BaseMenu.Trigger

const MenuPortal = BaseMenu.Portal

const MenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>
>(({ className, ...props }, ref) => (
  <MenuPortal>
    <BaseMenu.Popup
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-neumorph p-2',
        'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
        'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </MenuPortal>
))
MenuContent.displayName = 'MenuContent'

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
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
MenuItem.displayName = 'MenuItem'

const MenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.CheckboxItem
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
      <BaseMenu.CheckboxItemIndicator>
        <Check className="h-4 w-4" />
      </BaseMenu.CheckboxItemIndicator>
    </span>
    {children}
  </BaseMenu.CheckboxItem>
))
MenuCheckboxItem.displayName = 'MenuCheckboxItem'

const MenuRadioGroup = BaseMenu.RadioGroup

const MenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.RadioItem
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
      <BaseMenu.RadioItemIndicator>
        <div className="h-2 w-2 rounded-full bg-primary-500" />
      </BaseMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseMenu.RadioItem>
))
MenuRadioItem.displayName = 'MenuRadioItem'

const MenuLabel = React.forwardRef<
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
MenuLabel.displayName = 'MenuLabel'

const MenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseMenu.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-secondary-200 dark:bg-secondary-700', className)}
    {...props}
  />
))
MenuSeparator.displayName = 'MenuSeparator'

const MenuSubmenuTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.SubmenuTrigger
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
  </BaseMenu.SubmenuTrigger>
))
MenuSubmenuTrigger.displayName = 'MenuSubmenuTrigger'

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuLabel,
  MenuSeparator,
  MenuSubmenuTrigger,
}
