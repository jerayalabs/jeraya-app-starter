---
name: project-overview
description: Use for general questions about project structure, conventions, tech stack, routing, imports, UI components, dev workflow, or coding style in this project.
---

# Simba — Jeraya Mini-App Starter

## Tech Stack

- **Preact** — UI rendering (JSX, functional components, hooks)
- **Tailwind CSS v4** — utility-first CSS (`@import "tailwindcss"` in CSS)
- **DaisyUI v5** — component library (`@plugin "daisyui"` in CSS)
- **wouter-preact** — hash-based routing
- **Jeraya SDK** — DB, storage, auth, user API
- **Zod** — schema validation
- **Vite** — build tool + dev server
- **Vitest** — testing

## Key Conventions

### Routing

Hash-based routing. All paths are hash fragments (`#/page`).

```ts
import { navigate } from '@shared/lib/navigate'
navigate('/some-page')     // navigates to #/some-page
```

### Page Layout

Every page **must** wrap content in `<PageLayout>` from `@shared/ui`:

```tsx
import { PageLayout, Card, Button } from '@shared/ui'

export function MyPage() {
  return (
    <PageLayout title="My Page" description="Description">
      <div class="flex-1">
        <Card>Content</Card>
      </div>
    </PageLayout>
  )
}
```

Do NOT create top-level layout components (topbar, footer, sidebar). PageLayout handles navigation and header.

### Import Aliases

| Alias | Path |
|-------|------|
| `@` | `src/` |
| `@shared/ui` | `src/shared/components/ui` |
| `@shared/lib` | `src/shared/lib` |
| `@shared` | `src/shared` |

### UI Components

Available from `@shared/ui`: `PageLayout`, `Button` (primary/secondary/ghost), `Card`, `Badge` (success/warning/info), `Field`, `Link`, `Modal`, `Spinner`, `Stat`.

Use these instead of raw HTML where possible. See `docs/design.md` for full props reference.

## Dev Workflow

```bash
npm install          # setup
npm run dev          # start dev server (port 5173, opens Jeraya platform :3000)
npm run build        # production build
npm test             # tests (watch mode)
npm run test:run     # tests (single run)
npm run lint         # lint source
npm run typecheck    # TypeScript check (frontend)
```

## Project Structure

```
src/
├── App.tsx                 # Root router
├── main.tsx                # Entry point
├── collections/            # Schema definitions (backend only)
├── app/pages/              # Route page components
├── shared/components/ui/   # Reusable UI components
├── shared/lib/             # Jeraya DB, navigation, history
└── shared/types/           # TypeScript interfaces
```
