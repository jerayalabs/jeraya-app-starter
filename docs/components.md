# Shared UI Components

All at `src/shared/components/ui/`. Import via `@shared/ui`.

## `<Button>`

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

## `<Card>`

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

## `<Badge>`

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

## `<Field>`

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

## `<Link>`

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

## `<Modal>`

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

## `<PageLayout>`

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

Renders a full layout with: top nav bar (Home, About, Users links) → breadcrumbs + title/description + actions → content area (`max-w-7xl centered`).

## `<Spinner>`

```tsx
import { Spinner } from '@shared/ui'

<Spinner text="Loading..." />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `'Loading...'` | Loading text |

## `<Stat>`

```tsx
import { Stat } from '@shared/ui'

<Stat label="Total Orders" value={42} tone="success" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Metric label (uppercase) |
| `value` | `string \| number` | required | Metric value (large text) |
| `tone` | `'default' \| 'warning' \| 'success'` | `'default'` | Background/border color |
