import { useState } from 'react'
import { ThemeProvider, useTheme } from './components/theme-provider'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
import { Switch } from './components/Switch'
import { Checkbox } from './components/Checkbox'
import { Field, Label, FieldLabel, FieldDescription } from './components/Field'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/Select'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './components/Dialog'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/Tooltip'
import { Slider } from './components/Slider'
import { Progress } from './components/Progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
import { Popover, PopoverTrigger, PopoverContent } from './components/Popover'
import { Radio, RadioGroup } from './components/Radio'
import { Separator } from './components/Separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogClose } from './components/AlertDialog'
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuLabel } from './components/Menu'
import { NumberField } from './components/NumberField'
import { Toast as BaseUIToast } from '@base-ui/react/toast'
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from './components/Toast'

const { useToastManager } = BaseUIToast
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/Collapsible'
import { Toggle } from './components/Toggle'
import { Avatar, AvatarImage, AvatarFallback } from './components/Avatar'
import { CheckboxGroup } from './components/CheckboxGroup'
import { Fieldset, FieldsetLegend } from './components/Fieldset'
import { Meter } from './components/Meter'
import { ToggleGroup, ToggleGroupItem } from './components/ToggleGroup'
import { Toolbar, ToolbarButton, ToolbarSeparator } from './components/Toolbar'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from './components/ContextMenu'
import { ScrollArea } from './components/ScrollArea'
import { Moon, Sun, Heart, Info, Settings, Bold, Italic, Underline } from 'lucide-react'
import './styles/globals.css'

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  )
}

function ToastDemo() {
  const { add, toasts } = useToastManager()

  return (
    <>
      <Button 
        onClick={() => add({
          title: 'Notification',
          description: 'This is a toast notification with Neumorphism styling!',
          type: 'default',
        })} 
        variant="primary"
      >
        Show Toast
      </Button>
      {toasts.map((toast: any) => (
        <Toast key={toast.id} toast={toast}>
          <div className="grid gap-1">
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </>
  )
}

function DemoContent() {
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
              Neumorphism UI Library
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Built with Base UI, Tailwind CSS, and React
          </p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Neumorphism-styled buttons with different variants and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Variants
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="flat">Flat</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Heart size={20} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                States
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>
              Neumorphism-styled input fields with inset shadows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel>Username</FieldLabel>
                <div className="relative">
                  <Input placeholder="Enter username" />
                </div>
                <FieldDescription>Choose a unique username</FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="you@example.com" />
                <FieldDescription>We'll never share your email</FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="••••••••" />
              </Field>

              <Field>
                <FieldLabel>Small Input</FieldLabel>
                <Input placeholder="Small size" />
              </Field>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Large Input
              </h4>
              <Input placeholder="Large input field" />
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
              Cards
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Versatile container components with Neumorphism styling
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card padding="md">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard neumorphic card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  This card has the default raised appearance with soft shadows.
                </p>
              </CardContent>
            </Card>

            <Card variant="flat" padding="md">
              <CardHeader>
                <CardTitle>Flat Card</CardTitle>
                <CardDescription>Minimal styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  This card has a flat appearance with no shadows.
                </p>
              </CardContent>
            </Card>

            <Card variant="pressed" padding="md">
              <CardHeader>
                <CardTitle>Pressed Card</CardTitle>
                <CardDescription>Inset shadow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  This card appears pressed into the surface.
                </p>
              </CardContent>
            </Card>

            <Card interactive padding="md">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  This card has hover effects for interactive use.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">
                  Click me
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Form Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>
              Switches and checkboxes with Neumorphism styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Switches
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable notifications</Label>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Receive notifications about updates
                    </p>
                  </div>
                  <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                </div>

                <div className="flex items-center gap-4">
                  <Switch size="sm" />
                  <Switch size="md" defaultChecked />
                  <Switch size="lg" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Checkboxes
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox checked={checked} onCheckedChange={setChecked} />
                  <Label>Accept terms and conditions</Label>
                </div>

                <div className="flex items-center gap-4">
                  <Checkbox size="sm" defaultChecked />
                  <Checkbox size="md" defaultChecked />
                  <Checkbox size="lg" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Form Example */}
        <Card padding="lg" className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="you@example.com" />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="••••••••" />
            </Field>

            <div className="flex items-center gap-3">
              <Checkbox size="sm" />
              <Label className="text-sm">Remember me</Label>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button variant="primary" className="w-full">
              Sign in
            </Button>
            <Button variant="flat" className="w-full">
              Create account
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Built with ❤️ using Base UI, Tailwind CSS, and Class Variance Authority
          </p>
        </div>
        {/* Select Section */}
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>
              Dropdown select component with Neumorphism styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="react">
              <SelectTrigger size="md">
                <SelectValue>
                  {(value) => value || 'Select a framework'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="sm" disabled>
              <SelectTrigger size="sm">
                <SelectValue>
                  {(value) => value || 'Disabled select'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Slider & Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Slider & Progress</CardTitle>
            <CardDescription>
              Interactive slider and progress indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Sliders
              </h4>
              <Slider defaultValue={[50]} max={100} step={1} />
              <Slider defaultValue={[25, 75]} max={100} step={1} size="sm" />
              <Slider defaultValue={[60]} max={100} step={1} size="lg" disabled />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Progress Bars
              </h4>
              <Progress value={33} size="sm" />
              <Progress value={66} size="md" />
              <Progress value={90} size="lg" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>
              Tabbed navigation with Neumorphism styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <h3 className="font-medium text-secondary-900 dark:text-secondary-100">Account Settings</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Manage your account settings and preferences here.
                </p>
                <Input placeholder="Username" />
                <Input placeholder="Email" />
              </TabsContent>
              <TabsContent value="password" className="space-y-4">
                <h3 className="font-medium text-secondary-900 dark:text-secondary-100">Password Settings</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Change your password and security settings.
                </p>
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <h3 className="font-medium text-secondary-900 dark:text-secondary-100">General Settings</h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Configure general application settings.
                </p>
                <div className="flex items-center justify-between">
                  <Label>Enable notifications</Label>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialog, Tooltip & Popover Section */}
        <Card>
          <CardHeader>
            <CardTitle>Overlays</CardTitle>
            <CardDescription>
              Dialog, Tooltip, and Popover components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger>
                  <Button variant="primary">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Welcome to Neumorphism UI</DialogTitle>
                  <DialogDescription>
                    This is a dialog component styled with Neumorphism design principles.
                    It features soft shadows and a modern aesthetic.
                  </DialogDescription>
                  <div className="mt-6 flex gap-3 justify-end">
                    <Button variant="flat">Cancel</Button>
                    <Button variant="primary">Confirm</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="default">
                      <Info size={16} className="mr-2" />
                      Hover for Tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a helpful tooltip!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Popover>
                <PopoverTrigger>
                  <Button variant="default">
                    <Settings size={16} className="mr-2" />
                    Open Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Quick Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications</span>
                        <Switch size="sm" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-save</span>
                        <Switch size="sm" />
                      </div>
                    </div>
                    <Button variant="primary" className="w-full">Save Changes</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Radio & Separator Section */}
        <Card>
          <CardHeader>
            <CardTitle>Radio & Separator</CardTitle>
            <CardDescription>
              Radio buttons for single selection and separators for dividing content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Radio Buttons
              </h4>
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center gap-3">
                  <Radio value="option-1" size="md" />
                  <Label>Option 1</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Radio value="option-2" size="md" />
                  <Label>Option 2</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Radio value="option-3" size="md" disabled />
                  <Label>Option 3 (Disabled)</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Radio Sizes
              </h4>
              <RadioGroup defaultValue="size-md">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Radio value="size-sm" size="sm" />
                    <Label>Small</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio value="size-md" size="md" />
                    <Label>Medium</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio value="size-lg" size="lg" />
                    <Label>Large</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Accordion Section */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>
              Collapsible content panels with smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion defaultValue={['item-1']} className="space-y-3">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Neumorphism?</AccordionTrigger>
                <AccordionContent>
                  Neumorphism (or Soft UI) is a design trend that combines elements of skeuomorphism and flat design. 
                  It features soft shadows and subtle depth to create elements that appear to be extruded from or pressed into the background.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  Neumorphism uses dual shadows - one light and one dark - to create the illusion of depth. 
                  Elements have low contrast with the background, rounded corners, and subtle color differences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  While Neumorphism can present accessibility challenges due to low contrast, this library uses Base UI's 
                  accessible components and adds sufficient contrast in text and interactive elements to maintain good accessibility.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Alert Dialog & Menu Section */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialog & Menu</CardTitle>
            <CardDescription>
              Alert dialogs for important actions and dropdown menus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="primary">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                  <div className="mt-6 flex gap-3 justify-end">
                    <AlertDialogClose>
                      <Button variant="flat">Cancel</Button>
                    </AlertDialogClose>
                    <AlertDialogClose>
                      <Button variant="primary">Delete</Button>
                    </AlertDialogClose>
                  </div>
                </AlertDialogContent>
              </AlertDialog>

              <Menu>
                <MenuTrigger>
                  <Button variant="default">Open Menu</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuLabel>My Account</MenuLabel>
                  <MenuSeparator />
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuSeparator />
                  <MenuItem>Logout</MenuItem>
                </MenuContent>
              </Menu>
            </div>
          </CardContent>
        </Card>

        {/* Number Field Section */}
        <Card>
          <CardHeader>
            <CardTitle>Number Field</CardTitle>
            <CardDescription>
              Enhanced number input with increment/decrement buttons and scrub area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Sizes
              </h4>
              <NumberField defaultValue={10} min={0} max={100} size="sm" />
              <NumberField defaultValue={50} min={0} max={100} size="md" />
              <NumberField defaultValue={75} min={0} max={100} size="lg" />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                With Steps
              </h4>
              <NumberField defaultValue={0} min={0} max={100} step={5} size="md" />
              <NumberField defaultValue={100} min={0} max={1000} step={50} size="md" />
            </div>
          </CardContent>
        </Card>

        {/* Toast, Collapsible & Toggle Section */}
        <Card>
          <CardHeader>
            <CardTitle>Toast, Collapsible & Toggle</CardTitle>
            <CardDescription>
              Notifications, collapsible content, and toggle buttons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Toast Notifications
              </h4>
              <ToastDemo />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Collapsible
              </h4>
              <Collapsible>
                <CollapsibleTrigger>
                  Click to expand
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-2">
                    This is collapsible content that can be shown or hidden with smooth animations.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Toggle Buttons
              </h4>
              <div className="flex gap-2">
                <Toggle pressed={bold} onPressedChange={setBold}>
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle pressed={italic} onPressedChange={setItalic}>
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle size="lg">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatar & Meter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar & Meter</CardTitle>
            <CardDescription>
              User avatars and progress meters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Avatars
              </h4>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>XY</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Meters
              </h4>
              <div className="space-y-2">
                <Label>Optimal (75%)</Label>
                <Meter value={75} size="md" />
              </div>
              <div className="space-y-2">
                <Label>Sub-optimal (45%)</Label>
                <Meter value={45} size="md" />
              </div>
              <div className="space-y-2">
                <Label>Critical (20%)</Label>
                <Meter value={20} size="md" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fieldset & CheckboxGroup Section */}
        <Card>
          <CardHeader>
            <CardTitle>Fieldset & Checkbox Group</CardTitle>
            <CardDescription>
              Form grouping and checkbox collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Fieldset>
              <FieldsetLegend>Personal Information</FieldsetLegend>
              <div className="space-y-3">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" type="email" />
              </div>
            </Fieldset>

            <CheckboxGroup defaultValue={['notifications']}>
              <Label className="mb-2 block">Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox value="notifications" />
                  <Label>Email notifications</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox value="marketing" />
                  <Label>Marketing emails</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox value="updates" />
                  <Label>Product updates</Label>
                </div>
              </div>
            </CheckboxGroup>
          </CardContent>
        </Card>

        {/* ToggleGroup & Toolbar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle Group & Toolbar</CardTitle>
            <CardDescription>
              Toggle button groups and toolbars for formatting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Toggle Group
              </h4>
              <ToggleGroup defaultValue={['bold']}>
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Toolbar
              </h4>
              <Toolbar>
                <ToolbarButton>
                  <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton>
                  <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton>
                  <Underline className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarSeparator />
                <ToolbarButton>Save</ToolbarButton>
                <ToolbarButton>Export</ToolbarButton>
              </Toolbar>
            </div>
          </CardContent>
        </Card>

        {/* Context Menu & Scroll Area Section */}
        <Card>
          <CardHeader>
            <CardTitle>Context Menu & Scroll Area</CardTitle>
            <CardDescription>
              Right-click menus and custom scrollable areas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Context Menu (Right-click)
              </h4>
              <ContextMenu>
                <ContextMenuTrigger>
                  <div className="flex h-32 w-full items-center justify-center rounded-neumorph border-2 border-dashed border-secondary-300 dark:border-secondary-700">
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Right-click here
                    </p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Copy</ContextMenuItem>
                  <ContextMenuItem>Paste</ContextMenuItem>
                  <ContextMenuItem>Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Scroll Area
              </h4>
              <ScrollArea className="h-48 w-full rounded-neumorph p-4 bg-neumorph-light-bg dark:bg-neumorph-dark-bg shadow-neumorph-inset dark:shadow-neumorph-dark-inset">
                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <p key={i} className="text-sm text-secondary-600 dark:text-secondary-400">
                      Scrollable content item {i + 1}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Built with ❤️ using Base UI, Tailwind CSS, and Class Variance Authority
          </p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>
        <DemoContent />
      </ToastProvider>
    </ThemeProvider>
  )
}
