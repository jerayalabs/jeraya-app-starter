# Jeraya App Starter

A starter template built with **Preact**, **Vite**, **Tailwind CSS v4**, **DaisyUI**, and the **Jeraya SDK**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Preact, Vite, Tailwind CSS v4, DaisyUI |
| Database | Jeraya SDK |
| Auth | Firebase |
| Testing | Vitest, @testing-library/preact |
| Tooling | ESLint, Prettier, TypeScript |

## Project Structure

```
simba/
├── src/
│   ├── app/              # Frontend (Preact + TypeScript)
│   │   ├── components/   # Shared UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API/business logic
│   │   ├── lib/          # SDK clients
│   │   ├── config/       # App configuration
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   ├── functions/        # Backend functions (Fastify endpoints)
│   │   └── hello/        # Sample hello-world function
│   ├── collections/      # Jeraya collection definitions
│   └── automations/      # Automation scripts
├── tests/                # Test suite
└── scripts/              # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Development

Start both the Vite dev server and Fastify API server:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Functions

Backend functions are located in `src/functions/`. Each function is organized by feature:

```
src/functions/
├── hello/
│   └── route.ts      # GET /hello endpoint
└── [feature]/
    └── route.ts      # Feature-specific endpoint
```

To add a new function:
1. Create a new folder under `src/functions/`
2. Add a `route.ts` file with your Fastify route handler
3. The function will be automatically built and bundled

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development servers (Vite + Fastify) |
| `npm run build` | Build for production |
| `npm run build:functions` | Build backend functions only |
| `npm run preview` | Preview production build |
| `npm test` | Run tests (watch mode) |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint code |
| `npm run typecheck` | Type-check frontend |
| `npm run typecheck:server` | Type-check server |
