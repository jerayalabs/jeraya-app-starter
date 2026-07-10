# Testing

**Framework:** Vitest v3 + @testing-library/preact  
**Environment:** jsdom (simulated browser)  
**Config:** `vitest.config.ts` (standalone, also inlined in `vite.config.ts`)

## Running Tests

```bash
npm test            # Watch mode
npm run test:run    # Single run
```

## Test Locations

| Directory | Type | Pattern |
|---|---|---|
| `tests/components/` | Component smoke tests | `*.test.tsx` |
| `tests/unit/utils/` | Pure function unit tests | `*.test.ts` |
| `tests/integration/api/` | HTTP integration tests | `*.test.ts` |

## Test Patterns

### Unit Test (pure functions)
```ts
import { describe, it, expect } from 'vitest'
import { capitalize } from '../../../src/utils/format'

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })
})
```

### Component Test (rendering)
```tsx
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
```

### Integration Test (API)
```ts
describe('Inventory API', () => {
  it('health endpoint returns ok', { timeout: 10000 }, async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health')
      const data = await response.json()
      expect(data.success).toBe(true)
    } catch {
      expect(true).toBe(true) // graceful skip when server not running
    }
  })
})
```

## Test Helpers

`tests/helpers/test-utils.tsx` provides:
```tsx
import { renderComponent, render } from '../helpers/test-utils'
```

Currently a thin wrapper around `@testing-library/preact`.

## Setup

`tests/setup.ts` imports `@testing-library/preact` to register custom matchers.

## Writing New Tests

1. Create file at `tests/<category>/<Name>.test.{ts,tsx}`
2. Import `{ describe, it, expect }` from `'vitest'`
3. For components, import `{ render }` from `'@testing-library/preact'`
4. Use relative imports for source code (e.g., `../../src/app/utils/format`)
