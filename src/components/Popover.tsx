import * as React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from '@/lib/utils'

const Popover = BasePopover.Root

const PopoverTrigger = BasePopover.Trigger

const PopoverPortal = BasePopover.Portal

const PopoverBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop>
>(({ className, ...props }, ref) => (
  <BasePopover.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
PopoverBackdrop.displayName = 'PopoverBackdrop'

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup>
>(({ className, ...props }, ref) => (
  <PopoverPortal>
    <BasePopover.Popup
      ref={ref}
      className={cn(
        'z-50 w-72 rounded-neumorph p-4',
        'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
        'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
        'text-secondary-900 dark:text-secondary-100',
        'outline-none',
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
  </PopoverPortal>
))
PopoverContent.displayName = 'PopoverContent'

const PopoverClose = BasePopover.Close

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverBackdrop }
