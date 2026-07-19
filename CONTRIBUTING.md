# Contributing to Metaphor

## Branches

Create focused branches from current `main`. Use descriptive prefixes such as `fix/`, `feat/`, `chore/`, `docs/`, or `release/`. Do not commit directly to `main`.

## Before opening a pull request

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and supply only the values required for the work.
3. Run `npm run validate`.
4. Inspect the affected routes in both mobile and desktop layouts.
5. Confirm no secret, client-specific agreement, personal information, or privileged material is included.

## Pull requests

A pull request should describe its purpose, changed behavior, validation performed, known limitations, and rollback considerations. Keep unrelated changes out of the same pull request. Resolve every review conversation and confirm GitHub Actions and Vercel preview checks pass before merge.

## Documentation

Markdown under `docs/` is the source of truth for the Metaphor Operating System. Preserve document identifiers, versions, classifications, and review statuses. Add new revisions rather than silently overwriting signed, approved, or superseded material.

## Contracts

Only reusable unsigned templates intended for public distribution may be stored in this public repository. Never commit signed agreements, negotiated client terms, credentials, client data, or legal communications. Do not represent a document as attorney-approved without documented approval.
