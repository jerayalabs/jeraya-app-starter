import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { Card } from '../../src/components/ui/Card'

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(<Card><p>Hello</p></Card>)
    expect(getByText('Hello')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class"><p>Hello</p></Card>)
    expect(container.firstChild).toHaveProperty('className', expect.stringContaining('custom-class'))
  })
})
