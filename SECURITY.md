# Security Policy

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in public issues, discussions, pull requests, or social media. Report them privately to the repository owner through a trusted private channel and include the affected route or component, reproduction steps, observed impact, and any supporting evidence.

Do not include production credentials, access tokens, private client data, signed contracts, or other sensitive records in a report.

## Response expectations

Metaphor will acknowledge a complete report, assess severity and scope, preserve relevant evidence, and coordinate remediation and disclosure when appropriate. Response timing depends on severity, reproducibility, and third-party dependencies.

## Supported version

The production deployment from the current `main` branch is the supported version. Older branches, previews, and archived releases are not guaranteed to receive security fixes.

## Secret handling

Secrets belong in approved local or deployment-platform environment stores. They must not be committed to Git, exposed through browser bundles, logged unnecessarily, or copied into public documentation.
