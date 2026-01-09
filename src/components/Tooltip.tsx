import * as React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from '@/lib/utils'

const Tooltip = BaseTooltip.Root

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>
>(({ className, children, ...props }, ref) => {
  // If children is a Button component, extract its props
  if (React.isValidElement(children) && typeof children.type !== 'string') {
    return (
      <BaseTooltip.Trigger
        ref={ref}
        className={cn(children.props.className, className)}
        {...props}
      >
        {children.props.children}
      </BaseTooltip.Trigger>
    )
  }
  return (
    <BaseTooltip.Trigger ref={ref} className={className} {...props}>
      {children}
    </BaseTooltip.Trigger>
  )
})
TooltipTrigger.displayName = 'TooltipTrigger'

const TooltipPortal = BaseTooltip.Portal

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>
>(({ className, ...props }, ref) => (
  <TooltipPortal>
    <BaseTooltip.Positioner>
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          'z-50 overflow-hidden',
          'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
          'px-3 py-1.5 text-sm',
          'text-secondary-900 dark:text-secondary-100',
          'shadow-neumorph dark:shadow-neumorph-dark',
          'rounded-neumorph-sm',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </BaseTooltip.Positioner>
  </TooltipPortal>
))
TooltipContent.displayName = 'TooltipContent'

const TooltipProvider = BaseTooltip.Provider

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
