# Development

## Prerequisites

- Node.js >= 20
- npm >= 10

## Setup

```bash
npm install
cp .env.example .env   # Fill in Firebase + Jeraya credentials
```

## Dev Workflow

```bash
npm run dev
```

This runs `scripts/dev.ts` which:
1. Loads `.env` vars
2. Starts Vite dev server on **port 5173**
3. Opens the Jeraya platform URL: `http://localhost:3000/#/d/{baseId}/app/{appId}/home?dev=true`

The Jeraya platform embeds the mini-app in an iframe, injecting `window._jeraya_config` and `window._jeraya_appBasePath` at runtime.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (opens browser to Jeraya platform) |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint all source files |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run typecheck` | Type-check frontend only |
| `npm run typecheck:server` | Type-check server (requires `server/`) |

## Ports

| Service | Port |
|---|---|
| Vite dev server | 5173 |
| Jeraya platform | 3000 |
| Fastify API (planned) | 3001 |

## Proxy

Vite proxies `/api/*` requests to `http://localhost:3001` (the planned Fastify API server). Currently no server is running, so API calls will fail until the backend is implemented.

## Notes

- The app runs as a **mini-app embedded in Jeraya platform** via iframe. During dev, it opens the platform URL with `?dev=true`.
- The `__DYNAMIC_URL__` define is set in `scripts/dev.ts` and available as a global constant at build time.
- Firebase auth is configured but not yet integrated into the app's UI flow.
