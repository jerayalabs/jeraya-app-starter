export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

export function isPositiveNumber(value: unknown): value is number {
  return isValidNumber(value) && value > 0
}
