import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cn } from '@/lib/utils'

const AlertDialog = BaseAlertDialog.Root

const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>
>(({ className, children, ...props }, ref) => {
  // If children is a Button component, extract its props
  if (React.isValidElement(children) && typeof children.type !== 'string') {
    return (
      <BaseAlertDialog.Trigger
        ref={ref}
        className={cn(children.props.className, className)}
        {...props}
      >
        {children.props.children}
      </BaseAlertDialog.Trigger>
    )
  }
  return (
    <BaseAlertDialog.Trigger ref={ref} className={className} {...props}>
      {children}
    </BaseAlertDialog.Trigger>
  )
})
AlertDialogTrigger.displayName = 'AlertDialogTrigger'

const AlertDialogPortal = BaseAlertDialog.Portal

const AlertDialogBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
AlertDialogBackdrop.displayName = 'AlertDialogBackdrop'

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <BaseAlertDialog.Popup
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50',
        'translate-x-[-50%] translate-y-[-50%]',
        'w-full max-w-lg',
        'bg-neumorph-light-bg dark:bg-neumorph-dark-bg',
        'shadow-neumorph-lg dark:shadow-neumorph-dark-lg',
        'rounded-neumorph p-6',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = 'AlertDialogContent'

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Title
    ref={ref}
    className={cn(
      'text-xl font-semibold text-secondary-900 dark:text-secondary-100',
      className
    )}
    {...props}
  />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Description
    ref={ref}
    className={cn('text-sm text-secondary-600 dark:text-secondary-400 mt-2', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

const AlertDialogClose = BaseAlertDialog.Close

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
}
