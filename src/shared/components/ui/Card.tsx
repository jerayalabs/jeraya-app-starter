import type { ComponentChildren } from 'preact'

interface CardProps {
  children: ComponentChildren
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`rounded-lg border border-gray-200 border-solid border-[#eee] bg-white shadow-sm p-3 ${className}`}>
      {children}
    </section>
  )
}
