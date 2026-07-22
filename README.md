# Metaphor Automation Consulting

Metaphor is a Next.js application for an AI-automation consulting practice. It combines a public marketing site, booking intake, educational content, automation tools, and a controlled operating-system documentation library.

## Runtime

- Node.js 22
- Next.js 15
- React 19
- TypeScript
- Vercel deployment
- Supabase and Resend integrations where configured

## Development environment

The `develop` branch is the controlled development line and was created from the exact commit deployed to production on `main`. Production remains unchanged while development work is performed and validated on `develop` or focused branches created from it.

The repository pins Node.js 22 in both `package.json` and `.nvmrc` because that is the runtime used by the current production build. Development must use the same major version.

Set up a local development environment with:

```bash
nvm use
cp .env.development.example .env.development.local
npm ci
npm run dev
```

Next.js sets `NODE_ENV=development` automatically when `npm run dev` is used. Do not override `NODE_ENV` manually. Metaphor uses `APP_ENV` and `NEXT_PUBLIC_APP_ENV` for application-specific environment behavior.

Development safeguards are enabled by default:

- booking submissions use `BOOKING_MODE=mock`
- no production booking data is written
- no transactional booking email is sent
- browser booking requests remain on `/api/bookings`
- non-local upstream services are blocked unless explicitly authorized
- development analytics events are suppressed
- Vercel deployments from the development branch send `X-Robots-Tag: noindex, nofollow, noarchive`

To test against a local Supabase function, change `BOOKING_MODE` to `upstream` in `.env.development.local` and keep `BOOKING_UPSTREAM_URL` pointed at `localhost` or `127.0.0.1`. Never copy production service-role credentials into a development environment.

## Local setup

For the standard environment template:

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

Use `.env.example` as the complete inventory of supported variables and `.env.development.example` as the safe local-development baseline. Store actual values only in ignored local environment files and the deployment platform. Never commit secrets, service-role credentials, signed client information, or production access tokens.

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

1. Start development work from current `develop`, which must first be synchronized with the production source on `main`.
2. Create a focused branch for one coherent category of change.
3. Run `npm run validate`.
4. Open a pull request and confirm GitHub Actions and the Vercel preview pass.
5. Resolve all review findings before merging.
6. Promote tested development changes to `main` only through a reviewed production pull request.

See `CONTRIBUTING.md` for the complete contribution workflow and `SECURITY.md` for vulnerability reporting.
