import type { ComponentChildren } from 'preact'
import { Link } from './Link'

interface Breadcrumb {
  label: string
  url?: string
}

interface PageLayoutProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  headerActions?: ComponentChildren
  children: ComponentChildren
}

export function PageLayout({
  title,
  description,
  breadcrumbs = [],
  headerActions,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <nav className="flex items-center gap-6 border-b border-gray-200 bg-white px-6 py-3 text-sm font-medium">
        <Link to="/" activeClassName="text-emerald-600" className="text-gray-900 hover:text-emerald-600 transition-colors">Home</Link>
        <Link to="/about" activeClassName="text-emerald-600" className="text-gray-500 hover:text-emerald-600 transition-colors">About</Link>
        <Link to="/users" activeClassName="text-emerald-600" className="text-gray-500 hover:text-emerald-600 transition-colors">Users</Link>
      </nav>
      <header className="bg-white border-b border-gray-200 px-6 py-2 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            {breadcrumbs.length > 0 && (
              <nav className="flex mb-2 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="inline-flex items-center">
                      {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                      {crumb.url ? (
                        <Link to={crumb.url} className="hover:text-gray-700 transition-colors">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-gray-700 font-medium">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <h1 className="text-1xl font-bold text-gray-900 tracking-tight p-0 m-0">{title}</h1>
            {description && (
              <p className="mt-1 text-xs text-gray-600 p-0 pt-1 m-0">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex items-center space-x-3 shrink-0">{headerActions}</div>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
    </div>
  )
}
