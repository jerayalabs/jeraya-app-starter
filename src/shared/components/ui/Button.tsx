import type { ComponentChildren } from 'preact'

interface ButtonProps {
  children: ComponentChildren
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  className?: string
}

const variantStyles: Record<string, string> = {
  primary: 'rounded-md bg-emerald-600 px-4 py-1 text-sm font-semibold text-white bg-primary hover:bg-emerald-700 disabled:opacity-60',
  secondary: 'rounded-md bg-gray-900 px-4 py-1 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60',
  ghost: 'rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60',
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
