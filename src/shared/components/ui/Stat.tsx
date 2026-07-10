interface StatProps {
  label: string
  value: string | number
  tone?: 'default' | 'warning' | 'success'
}

const colors: Record<string, string> = {
  default: 'bg-white text-gray-900 border-gray-200',
  warning: 'bg-amber-50 text-amber-900 border-amber-200',
  success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
}

export function Stat({ label, value, tone = 'default' }: StatProps) {
  return (
    <div className={`rounded-lg border p-4 ${colors[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
