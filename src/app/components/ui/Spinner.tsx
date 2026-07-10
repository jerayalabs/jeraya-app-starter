interface SpinnerProps {
  text?: string
}

export function Spinner({ text = 'Loading...' }: SpinnerProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 shadow-sm">
      {text}
    </div>
  )
}
