import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Tabs = BaseTabs.Root

const tabsListVariants = cva(
  [
    'inline-flex items-center justify-center rounded-neumorph p-1',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-inset dark:shadow-neumorph-dark-inset',
  ].join(' ')
)

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(tabsListVariants(), className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'px-4 py-2 text-sm font-medium rounded-neumorph-sm',
    'ring-offset-background transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
    'disabled:pointer-events-none disabled:opacity-50',
    'text-secondary-600 dark:text-secondary-400',
    'data-[selected]:text-secondary-900 data-[selected]:dark:text-secondary-100',
    'data-[selected]:shadow-neumorph data-[selected]:dark:shadow-neumorph-dark',
    'hover:text-secondary-900 hover:dark:text-secondary-100',
  ].join(' ')
)

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(tabsTriggerVariants(), className)}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
