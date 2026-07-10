export function getAppBasePath(): string {
  return ((window as unknown as Record<string, unknown>)['_jeraya_appBasePath'] as string) || ''
}
