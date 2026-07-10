# Directory Structure

```
root/
├── .jeraya-config.json          # Jeraya app metadata (appId, name, prefix, type, distFolder, version)
├── .env                         # Local environment variables (gitignored)
├── .env.example                 # Environment variable template
├── index.html                   # HTML entry point (mounts #pr-app)
├── package.json                 # Dependencies & scripts
│
├── src/                         # Frontend (Preact + TypeScript)
│   ├── main.tsx                 # Entry: renders <RouterApp /> into #pr-app
│   ├── index.css                # Tailwind + DaisyUI import
│   ├── App.tsx                  # Root component: wouter-preact Router with hash-based 
│   ├── jeraya.config.ts         # Jeraya build config (registers collections)
│   ├── collections/             # Jeraya defineCollection schemas
│   ├── shared/                  # Code shared across all mini-apps/pages
│   │   ├── components/ui/       #   Reusable UI components (Button, Card, Badge, etc.)
│   │   ├── lib/                 #   Shared libraries
│   │   └── types/
│   └── app/                     # This app's specific code
│       ├── pages/               #   Route page components
│       ├── services/
├── scripts/
│   └── dev.ts                  # Dev server launcher (Vite + opens Jeraya platform URL)
│
├── tests/
├── vite.config.ts              # Vite: aliases, plugins (tailwind, preact), proxy /api → :3001
├── vitest.config.ts            # Vitest: jsdom, globals, setup
├── tsconfig.json               # Frontend TS config (includes src/)
├── tsconfig.server.json        # Server TS config (includes server/ + scripts/)
├── eslint.config.js            # ESLint flat config (TS, react-hooks)
├── .prettierrc                 # No semicolons, single quotes, trailing commas
├── .gitignore
└── todos.md                    # Known issues and planned improvements
```
