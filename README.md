# Simba

A senior-level starter template built with **Preact**, **Vite**, **Tailwind CSS v4**, **DaisyUI**, and the **Jeraya SDK**, with a **Fastify** backend API.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Preact, Vite, Tailwind CSS v4, DaisyUI |
| Backend | Fastify (TypeScript) |
| Database | Jeraya SDK / NocoDB |
| Auth | Firebase |
| Testing | Vitest, @testing-library/preact |
| Tooling | ESLint, Prettier, TypeScript |

## Project Structure

```
simba/
├── src/              # Frontend (Preact + TypeScript)
│   ├── components/   # Shared UI components
│   ├── pages/        # Route page components
│   ├── hooks/        # Custom hooks
│   ├── services/     # API/business logic
│   ├── lib/          # SDK clients
│   ├── collections/  # Jeraya collection definitions
│   ├── config/       # App configuration
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── server/           # Backend (Fastify + TypeScript)
│   ├── routes/       # API route definitions
│   ├── controllers/  # Request handlers
│   ├── services/     # Business logic
│   ├── plugins/      # Fastify plugins
│   ├── schemas/      # JSON Schema validation
│   ├── config/       # Server configuration
│   ├── types/        # Server type definitions
│   └── utils/        # Server utilities
├── tests/            # Test suite
└── scripts/          # Utility scripts
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

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development servers (Vite + Fastify) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests (watch mode) |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint code |
| `npm run typecheck` | Type-check frontend |
| `npm run typecheck:server` | Type-check server |
