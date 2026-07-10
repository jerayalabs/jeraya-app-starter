import type { ComponentChildren } from 'preact'

interface FieldProps {
  label: string
  children: ComponentChildren
}

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
