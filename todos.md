# Template Enhancement TODOs

## Critical Fixes
- [ ] Fix config key mismatch: `.jeraya-config.json` uses `appId` but `src/libs/jeraya.js` reads `app_id` — unify the key name
- [ ] Fix dev script: `package.json` points to `./src/jeraya.js` which doesn't exist — point to `server.js`
- [ ] Fix `"jeraya": "deraya"` typo in package.json scripts
- [ ] Unify project naming: pick one name across package.json, .jeraya-config.json, index.html, Layout.jsx

## Dead Code Cleanup
- [ ] Remove empty `src/index.js`
- [ ] Remove or wire up unused `src/collections/Member.js`
- [ ] Remove stale `src/components/Layout.jsx`
- [ ] Remove duplicate `src/components/ui/Topbar.jsx`
- [ ] Clean up commented-out code in `vite.config.js` and `Shop.js`

## Backend / Endpoints Layer
- [ ] Create `server/` directory structure for backend endpoints
- [ ] Define an endpoint registration pattern (e.g., `server/endpoints/`)
- [ ] Add example endpoint (CRUD for a collection)
- [ ] Document how endpoints connect to Jeraya SDK

## Architecture
- [ ] Resolve collections vs services disconnect — decide if `jeraya.config.js` collections are the source of truth, or remove them in favor of runtime table creation
- [ ] Extract inline components from Home.jsx into `src/components/ui/` (Card, Stat, Field, Input)
- [ ] Add a state management pattern (context/store/hooks) and demonstrate it
- [ ] Expand router with multiple routes, nested routes, and route params
- [ ] Add a Preact ErrorBoundary component

## Template Quality
- [ ] Add README.md with setup, dev, build, and deployment instructions
- [ ] Add `.env.example` and gitignore `.env`
- [ ] Add environment variable validation at startup
- [ ] Add ESLint + Prettier configuration
- [ ] Standardize CSS approach (pick DaisyUI components OR raw Tailwind, not both)
- [ ] Add test framework with example test
- [ ] Add a second example page to demonstrate multi-page patterns
- [ ] Document the directory structure in README
