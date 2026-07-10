interface BadgeProps {
  children: string
  variant?: 'success' | 'warning' | 'info'
}

const variantStyles: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-800',
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}
