# CSP-451 Web Starter — CheckPoint 2

This repository is a **starter template** for practicing:
- Git branching strategies (GitHub Flow / Git Flow-lite)
- Pull Requests + review workflow
- Intentional merge conflicts + manual resolution
- Clean history using **Squash and merge**

> **Important — before first run.** `src/app.js` ships with intentional Git
> conflict markers (the Step-8 conflict-resolution exercise). Running
> `npm run dev` immediately will fail with a `SyntaxError: Unexpected token "<<"`.
> Open `src/app.js`, remove the `<<<<<<< / ======= / >>>>>>>` markers and pick
> the resolution you want to keep, then `git add src/app.js && git commit -m
> "chore: remove sample conflict markers"`. See Walkthrough Step 2 for full
> guidance.

## Quick Start (Auth Branch Notes)

```bash
# 1. Remove the sample conflict markers in src/app.js first (see note above)
npm install
npm run dev
```

Open: http://localhost:3000

## Structure

- `src/app.js` — Express server entry
- `src/routes/` — route modules
- `src/controllers/` — controller functions
- `src/services/` — reusable services (auth helpers, etc.)
- `src/db/` — database module (starts as a stub)
- `public/` — static UI (includes `/login`)
- `docs/` — reports + screenshots checklist

## Required Branches
Create these branches exactly:
- `feature/user-authentication`
- `feature/database-connection`
- `feature/api-endpoints`

## Suggested Conflict Targets
To intentionally create a merge conflict, edit the same lines in one of:
- `README.md`
- `src/app.js`
- `src/routes/api.js`

## How to Run Tests (lightweight)
```bash
npm test
npm run lint
```
