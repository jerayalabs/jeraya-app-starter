# Design Guide

## Tech Stack

- **Preact** — UI rendering framework
- **Tailwind CSS v4** — utility-first CSS (configured via CSS-first `@import "tailwindcss"` in `src/app/index.css`, no JS config file)
- **DaisyUI v5** — component library on top of Tailwind (loaded via `@plugin "daisyui"`)
- **wouter-preact** — hash-based routing
- **Zod** — schema validation

## Project Structure

```
src/
├── app/                # Application layer (pages, routing, app-specific components)
│   ├── App.tsx         # Root router
│   ├── pages/          # Page components (one folder per page)
│   └── components/      # App-specific components
└── shared/             # Shared layer (reusable across apps)
    ├── components/ui/   # UI component library → @shared/ui
    ├── config/          # Base path, env
    ├── lib/             # Navigate, history, jeraya SDK
    └── types/           # Shared types
```

**Vite aliases:**

| Alias | Path |
|---|---|
| `@` | `src` |
| `@shared/ui` | `src/shared/components/ui` |
| `@shared/lib` | `src/shared/lib` |
| `@shared` | `src/shared` |

## Page Layout Convention

Every page **must** start with `<PageLayout>` from `@shared/ui`. This ensures a consistent header (breadcrumbs, title, description, actions) across all pages.

### Two-Column Structure

Pages use a **two-column layout**: a sidebar on the left already used by the main platform, and a main content area on the right where the actual app content will be.

```
┌──────────────────────────────────────────────┐
│          │Header ( title + actions)          │ 
│          │─-──────────────────────────────-──┤
│          │                                   │
│ Sidebar  │  Main Content                     │
│ (menu)   │                                   │
│          │                                   │
└──────────┴───────────────────────────────────┘
```

Example page structure:

```tsx
import { PageLayout, Card, Button } from '@shared/ui'

export function MyPage() {
  return (
    {/* Main content */}
    <PageLayout title="My Page" description="Page description">
      <div class="flex-1">
        <Card>
          <p>Content goes here</p>
        </Card>
      </div>
    </PageLayout>
  )
}
```

> **Note:** When wrapping the sidebar and main content, use a `flex` container as the direct child of `<PageLayout>`.

## Using `@shared/ui` Components

All UI components live in `src/shared/components/ui/` and are imported from the `@shared/ui` alias. They are built with Tailwind utility classes using an **emerald/gray color scheme**. Use these components instead of writing raw HTML elements wherever possible — this keeps the UI consistent.

### Quick Overview

| Component | Purpose |
|---|---|
| `PageLayout` | Page wrapper — header + content. **Always use first.** |
| `Button` | Actions (variants: `primary`, `secondary`, `ghost`) |
| `Card` | Content container (rounded, bordered, white bg) |
| `Badge` | Status pills (`success`, `warning`, `info`) |
| `Field` | Form field with label |
| `Link` | Navigation link (wraps wouter-preact, supports `activeClassName`) |
| `Modal` | Overlay dialog |
| `Spinner` | Loading indicator |
| `Stat` | Metric display card |

### Import pattern

```tsx
import { PageLayout, Button, Card, Badge, Field, Link, Modal, Spinner, Stat } from '@shared/ui'
```

Import only what you need. All components are Preact functional components typed with TypeScript.

### Styling

Components accept `className` props (where applicable) for additional Tailwind classes. You can also use DaisyUI classes alongside Tailwind utilities in your page-level markup since both are available globally.

---

## Component Reference

### `<PageLayout>`

```tsx
import { PageLayout } from '@shared/ui'

<PageLayout
  title="Users"
  description="Manage users"
  breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Users' }]}
  headerActions={<Button>Add User</Button>}
>
  <p>Main content...</p>
</PageLayout>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Page title |
| `description` | `string` | — | Subtitle below title |
| `breadcrumbs` | `Breadcrumb[]` | `[]` | `{ label, url? }` array |
| `headerActions` | `ComponentChildren` | — | Action buttons in header |
| `children` | `ComponentChildren` | required | Main content area |

Renders a full layout: top header bar (breadcrumbs + title/description + actions) then a content area.

### `<Button>`

```tsx
import { Button } from '@shared/ui'

<Button onClick={handleClick} variant="primary" disabled={false} type="button">
  Click me
</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ComponentChildren` | required | Button content |
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | `false` | Disables button |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `type` | `'button' \| 'submit'` | `'button'` | HTML type |
| `className` | `string` | `''` | Additional classes |

### `<Card>`

```tsx
import { Card } from '@shared/ui'

<Card className="custom-class">
  <p>Content</p>
</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ComponentChildren` | required | Card content |
| `className` | `string` | `''` | Additional classes |

Renders `<section>` with `rounded-lg border border-gray-200 bg-white shadow-sm`.

### `<Badge>`

```tsx
import { Badge } from '@shared/ui'

<Badge variant="success">Active</Badge>
<Badge variant="warning">Blocked</Badge>
<Badge variant="info">Draft</Badge>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `string` | required | Badge text |
| `variant` | `'success' \| 'warning' \| 'info'` | `'info'` | Color variant |

### `<Field>`

```tsx
import { Field } from '@shared/ui'

<Field label="Email">
  <input type="email" />
</Field>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Label text (uppercase, small) |
| `children` | `ComponentChildren` | required | Form input(s) below label |

### `<Link>`

```tsx
import { Link } from '@shared/ui'

<Link to="/about" activeClassName="text-emerald-600">About</Link>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `to` | `string` | required | Target path (relative, e.g. `/about`) |
| `activeClassName` | `string` | — | Class applied when route matches |
| `className` | `string` | `''` | Default classes |
| `children` | `ComponentChildren` | — | Link content |
| `onClick` | `(e: MouseEvent) => void` | — | Click handler |

Uses `useLocation` from wouter-preact. Prepends `getAppBasePath()` to href. Intercepts click and calls `navigate()`.

### `<Modal>`

```tsx
import { Modal } from '@shared/ui'

<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | required | Show/hide |
| `onClose` | `() => void` | required | Close callback |
| `title` | `string` | required | Modal header title |
| `children` | `ComponentChildren` | required | Body content |

Returns `null` when `!isOpen`.

### `<Spinner>`

```tsx
import { Spinner } from '@shared/ui'

<Spinner text="Loading..." />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `'Loading...'` | Loading text |

### `<Stat>`

```tsx
import { Stat } from '@shared/ui'

<Stat label="Total Orders" value={42} tone="success" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Metric label (uppercase) |
| `value` | `string \| number` | required | Metric value (large text) |
| `tone` | `'default' \| 'warning' \| 'success'` | `'default'` | Background/border color |
