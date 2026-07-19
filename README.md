# Metaphor Automation Consulting

Metaphor is a Next.js application for an AI-automation consulting practice. It combines a public marketing site, booking intake, educational content, automation tools, and a controlled operating-system documentation library.

## Runtime

- Node.js 20
- Next.js 15
- React 19
- TypeScript
- Vercel deployment
- Supabase and Resend integrations where configured

## Local setup

```bash
nvm use
cp .env.example .env.local
npm ci
npm run dev
```

The local application is available at `http://localhost:3000` by default.

## Validation

Run the complete repository gate before opening or updating a pull request:

```bash
npm run validate
```

The validation command runs linting, strict TypeScript checks, tests, asset-reference checks, and a production build.

## Environment variables

Use `.env.example` as the inventory of supported variables. Store actual values only in local environment files and the deployment platform. Never commit secrets, service-role credentials, signed client information, or production access tokens.

## Repository structure

- `app/` — Next.js routes, UI, booking workflow, blog, and automation tools
- `components/` — shared presentation and application components
- `lib/` — shared application utilities
- `public/` — browser-delivered static assets
- `docs/` — Metaphor Operating System and controlled business documentation
- `tests/` — repository-level automated tests
- `scripts/` — validation and maintenance utilities

Markdown under `docs/` is the documentation source of truth. Contract templates under `docs/client-operations/legal/contracts/` are reusable unsigned drafts unless their individual status says otherwise.

## Contract handling

The public repository must contain only reusable, unsigned templates approved for public distribution. Never commit signed agreements, negotiated client terms, personal information, credentials, privileged legal communications, or client-specific confidential information. Contract status labels must not imply attorney approval unless that approval has actually occurred.

## Delivery workflow

1. Create a focused branch from current `main`.
2. Make one coherent category of change.
3. Run `npm run validate`.
4. Open a pull request and confirm GitHub Actions and the Vercel preview pass.
5. Resolve all review findings before merging.

See `CONTRIBUTING.md` for the complete contribution workflow and `SECURITY.md` for vulnerability reporting.
