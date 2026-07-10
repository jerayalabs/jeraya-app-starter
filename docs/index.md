# Simba — Jeraya Mini-App Starter

A starter template for building **jeraya-apps** inside the Jeraya platform.

**Stack:** Preact + Vite + Tailwind CSS v4 + Jeraya SDK (db, storage, auth, user)

## When to Use These Docs

You are an AI agent assisting with development. Read this doc first, then consult the specific doc for your task:

| Task | Doc |
|---|---|
| Understand the project layout | `structure.md` |
| Follow standars of design | `design.md` |
| Jeraya DB API reference | `jeraya-db.md` |
| Create a collection schema | `collections.md` |
| Write or run tests | `testing.md` |
| Start dev server / build | `development.md` |

## Key Conventions

- **Do NOT** create top-level layout components (topbar, footer, sidebar). The `PageLayout` component already includes a navigation bar and header.
- **Do NOT** add new UI primitives unless absolutely necessary. Check `@shared/components/ui` first (see `design.md`).
- **Hash-based routing** — all paths are hash fragments (`#/page`). Use `navigate()` from `@shared/lib/navigate` for programmatic navigation.
- **Import paths** use `@/` → `src/`, `@shared/ui` → `src/shared/components/ui`, `@shared/lib` → `src/shared/lib`, `@shared/*` → `src/shared/*`.
