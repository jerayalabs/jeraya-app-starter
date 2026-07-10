export function getAppBasePath(): string {
  const path = ((window as unknown as Record<string, unknown>)['_jeraya_appBasePath'] as string) || ''

  return path.replace('#', '')
}
