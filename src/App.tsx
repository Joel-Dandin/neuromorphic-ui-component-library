import React, { useState } from 'react'
import { ThemeProvider, useTheme } from './components/theme-provider'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
import { Switch } from './components/Switch'
import { Checkbox } from './components/Checkbox'
import { Field, Label, FieldDescription } from './components/Field'
import { Moon, Sun, User, Mail, Lock, Heart } from 'lucide-react'
import './styles/globals.css'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

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

function DemoContent() {
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)

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
                <Label>Username</Label>
                <div className="relative">
                  <Input placeholder="Enter username" />
                </div>
                <FieldDescription>Choose a unique username</FieldDescription>
              </Field>

              <Field>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
                <FieldDescription>We'll never share your email</FieldDescription>
              </Field>

              <Field>
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </Field>

              <Field>
                <Label>Small Input</Label>
                <Input size="sm" placeholder="Small size" />
              </Field>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Large Input
              </h4>
              <Input size="lg" placeholder="Large input field" />
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
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </Field>

            <Field>
              <Label>Password</Label>
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
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <DemoContent />
    </ThemeProvider>
  )
}
