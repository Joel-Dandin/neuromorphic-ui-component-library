import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = BaseDialog.Root

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>
>(({ className, children, ...props }, ref) => {
  // If children is a Button component, extract its props
  if (React.isValidElement(children) && typeof children.type !== 'string') {
    return (
      <BaseDialog.Trigger
        ref={ref}
        className={cn(children.props.className, className)}
        {...props}
      >
        {children.props.children}
      </BaseDialog.Trigger>
    )
  }
  return (
    <BaseDialog.Trigger ref={ref} className={className} {...props}>
      {children}
    </BaseDialog.Trigger>
  )
})
DialogTrigger.displayName = 'DialogTrigger'

const DialogPortal = BaseDialog.Portal

const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
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
DialogBackdrop.displayName = 'DialogBackdrop'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogBackdrop />
    <BaseDialog.Popup
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
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
    >
      {children}
      <BaseDialog.Close
        className={cn(
          'absolute right-4 top-4 rounded-neumorph-sm p-2',
          'shadow-neumorph dark:shadow-neumorph-dark',
          'hover:shadow-neumorph-sm hover:dark:shadow-neumorph-dark-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'transition-all duration-200',
          'text-secondary-600 dark:text-secondary-400'
        )}
        aria-label="Close dialog"
      >
        <X className="h-4 w-4" />
      </BaseDialog.Close>
    </BaseDialog.Popup>
  </DialogPortal>
))
DialogContent.displayName = 'DialogContent'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn(
      'text-2xl font-semibold text-secondary-900 dark:text-secondary-100',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn(
      'text-sm text-secondary-600 dark:text-secondary-400 mt-2',
      className
    )}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription }
