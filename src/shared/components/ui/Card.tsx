import type { ComponentChildren } from 'preact'

interface CardProps {
  children: ComponentChildren
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </section>
  )
}
