import { describe, it, expect } from 'vitest'
import { capitalize, truncate, pluralize } from '../../../src/utils/format'

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('lowercases the rest', () => {
    expect(capitalize('HELLO')).toBe('Hello')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('truncate', () => {
  it('returns string as-is when within limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates and adds ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })
})

describe('pluralize', () => {
  it('returns singular for count of 1', () => {
    expect(pluralize(1, 'item')).toBe('item')
  })

  it('returns plural for count of 0', () => {
    expect(pluralize(0, 'item')).toBe('items')
  })

  it('returns plural for count > 1', () => {
    expect(pluralize(3, 'item')).toBe('items')
  })
})
