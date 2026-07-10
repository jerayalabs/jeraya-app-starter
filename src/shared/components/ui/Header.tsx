import type { ComponentChildren } from 'preact'
import { Link } from './Link'

interface Breadcrumb {
  label: string
  url?: string
}

// 1. Define the Tab interface
interface Tab {
  label: string
  url: string
}

interface HeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  headerActions?: ComponentChildren
  // 2. Add tabs as an optional array to the props
  tabs?: Tab[]
}

export function Header({
  title,
  description,
  breadcrumbs = [],
  headerActions,
  tabs = [], // 3. Default to an empty array
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 pt-1 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1">
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
          <h1 className="text-xl font-bold text-gray-900 tracking-tight p-0 m-0">{title}</h1>
          {description && (
            <p className="text-xs text-gray-600 p-0  m-0">{description}</p>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center space-x-3 shrink-0">{headerActions}</div>
        )}
      </div>

      {/* 4. Render the tabs dynamically if they exist */}
      {tabs.length > 0 && (
        <nav className="flex items-center gap-6 border-t border-gray-100 pt-3 text-sm font-medium">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              to={tab.url}
              activeClassName="text-emerald-600 border-b-2 border-emerald-600 pb-3 -mb-[13px]"
              className="text-gray-500 hover:text-emerald-600 pb-3 transition-colors"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}