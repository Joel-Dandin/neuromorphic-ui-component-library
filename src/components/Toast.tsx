import * as React from 'react'
import * as BaseToast from '@base-ui/react/toast'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  [
    'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-neumorph p-4',
    'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
    'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
    'data-[starting]:animate-in data-[ending]:animate-out',
    'data-[ending]:fade-out-80 data-[starting]:fade-in-0',
    'data-[ending]:slide-out-to-right-full data-[starting]:slide-in-from-top-full',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-secondary-200 dark:border-secondary-700',
        success: 'border-l-4 border-l-green-500',
        error: 'border-l-4 border-l-red-500',
        warning: 'border-l-4 border-l-yellow-500',
        info: 'border-l-4 border-l-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const ToastProvider = BaseToast.Toast.Provider

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Toast.Viewport>
>(({ className, ...props }, ref) => (
  <BaseToast.Toast.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = 'ToastViewport'

const Toast = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Toast.Root> & {
    variant?: VariantProps<typeof toastVariants>['variant']
  }
>(({ className, variant, ...props }, ref) => {
  return (
    <BaseToast.Toast.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = 'Toast'

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Toast.Title>
>(({ className, ...props }, ref) => (
  <BaseToast.Toast.Title
    ref={ref}
    className={cn('text-sm font-semibold text-secondary-900 dark:text-secondary-100', className)}
    {...props}
  />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Toast.Description>
>(({ className, ...props }, ref) => (
  <BaseToast.Toast.Description
    ref={ref}
    className={cn('text-sm text-secondary-600 dark:text-secondary-400', className)}
    {...props}
  />
))
ToastDescription.displayName = 'ToastDescription'

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Toast.Close>
>(({ className, ...props }, ref) => (
  <BaseToast.Toast.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-neumorph-sm p-1',
      'shadow-neumorph dark:shadow-neumorph-dark',
      'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
      'text-secondary-600 dark:text-secondary-400',
      'transition-all',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </BaseToast.Toast.Close>
))
ToastClose.displayName = 'ToastClose'

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose }
