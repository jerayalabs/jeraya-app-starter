import { useState, useRef, useEffect } from 'preact/hooks'
import type { ComponentChildren } from 'preact'

interface DropdownMenuProps {
  trigger: ComponentChildren
  children: ComponentChildren
  align?: 'left' | 'right'
}

interface DropdownMenuItemProps {
  children: ComponentChildren
  onClick?: () => void
  danger?: boolean
}

function DropdownMenuItem({ children, onClick, danger }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100 ${
        danger ? 'text-red-600' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

export function DropdownMenu({ trigger, children, align = 'right' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} class="relative inline-block">
      <div onClick={() => setOpen((v) => !v)} class="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          class={`absolute top-full mt-1 z-50 min-w-[160px] rounded-md border border-gray-200 bg-white shadow-lg py-1 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

DropdownMenu.Item = DropdownMenuItem
