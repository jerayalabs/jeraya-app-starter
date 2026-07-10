import { getAppBasePath } from '../config/basePath'

interface Location {
  pathname: string
  search: string
}

type Listener = (location: Location) => void

function getRawPath(): string {
  const currentPath = (window as unknown as Record<string, unknown>)['appCurrentPath'] as string | undefined
  if (currentPath) return currentPath
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1)
  }
  return window.location.pathname + window.location.search
}

function stripBase(rawPath: string): Location {
  const base = getAppBasePath()
  let route = rawPath.startsWith(base) ? rawPath.slice(base.length) : rawPath
  if (!route.startsWith('/')) route = '/' + route
  const [pathname, qs] = route.split('?')
  return {
    pathname: pathname || '/',
    search: qs ? '?' + qs : '',
  }
}

function getFullPath(path: string): string {
  const base = getAppBasePath()
  return base + path
}

export function createAppHistory() {
  const listeners: Listener[] = []

  function notify() {
    const loc = stripBase(getRawPath())
    listeners.forEach((fn) => fn(loc))
  }

  window.addEventListener('popstate', notify)
  window.addEventListener('hashchange', notify)

  return {
    get location() {
      return stripBase(getRawPath())
    },
    listen(callback: Listener) {
      listeners.push(callback)
      return () => {
        const i = listeners.indexOf(callback)
        if (i >= 0) listeners.splice(i, 1)
      }
    },
    push(path: string) {
      const full = getFullPath(path)
      if (window.location.hash.startsWith('#/')) {
        window.location.hash = full
      } else {
        window.history.pushState(null, '', full)
      }
      notify()
      return true
    },
    replace(path: string) {
      const full = getFullPath(path)
      if (window.location.hash.startsWith('#/')) {
        window.location.replace('#' + full)
      } else {
        window.history.replaceState(null, '', full)
      }
      notify()
      return true
    },
  }
}
