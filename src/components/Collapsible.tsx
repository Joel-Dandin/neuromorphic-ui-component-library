import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Collapsible = BaseCollapsible.Root

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseCollapsible.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between rounded-neumorph p-3',
      'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
      'shadow-neumorph dark:shadow-neumorph-dark',
      'text-sm font-medium text-secondary-900 dark:text-secondary-100',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'transition-all',
      '[&[data-panel-open]>svg]:rotate-180',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </BaseCollapsible.Trigger>
))
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>
>(({ className, children, ...props }, ref) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cn(
      'overflow-hidden text-sm',
      'data-[ending-style]:animate-accordion-up data-[starting-style]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pt-2">{children}</div>
  </BaseCollapsible.Panel>
))
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
