import type { ComponentChildren } from 'preact'
import { Header } from './Header'

interface Breadcrumb {
  label: string
  url?: string
}

// 1. Define the Tab structure
interface Tab {
  label: string
  url: string
}

interface PageLayoutProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  headerActions?: ComponentChildren
  children: ComponentChildren
  // 2. Add the optional tabs array to the props
  tabs?: Tab[]
}

export function PageLayout({
  title,
  description,
  breadcrumbs = [],
  headerActions,
  children,
  tabs = [], // 3. Default to an empty array
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br">
      {/* 4. Render the Header component and pass the props down to it */}
      <Header
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        headerActions={headerActions}
        tabs={tabs}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 bg-gradient-to-br">{children}</main>
    </div>
  )
}