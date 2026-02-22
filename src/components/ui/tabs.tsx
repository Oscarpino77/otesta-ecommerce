import * as React from 'react'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

export function Tabs({ children, ...props }: TabsProps) {
  const [value, setValue] = React.useState('')

  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TabsList({ children, className = '', ...props }: TabsListProps) {
  return (
    <div className={`inline-flex ${className}`} {...props}>
      {children}
    </div>
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export function TabsTrigger({ value, children, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  return (
    <button
      onClick={() => context.onValueChange(value)}
      {...props}
      className={context.value === value ? 'active' : ''}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null
  return <>{children}</>
}
