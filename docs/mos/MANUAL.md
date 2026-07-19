# Metaphor Operating System Manual

**Series:** MOS  
**Version:** 1.0.0  
**Owner:** Founder and Chief Systems Architect  
**Status:** Active

## MOS-0001 — Master Index

The Metaphor Operating System is the authoritative framework for governing strategy, product development, engineering, AI, delivery, knowledge, client operations and platform evolution. Documents are numbered by series, versioned semantically and maintained through pull requests. The order of authority is: Constitution, standards, playbooks, procedures, templates and records.

Required metadata for controlled documents:
- Document ID
- Title
- Version
- Owner
- Status
- Approval date
- Review cadence
- Related standards

## MOS-0002 — Architecture Principles

Metaphor systems follow these principles:

1. **Simplicity first.** Prefer the least complex design that satisfies current requirements and leaves a credible path to change.
2. **Modularity.** Separate product-specific logic from shared capabilities.
3. **API-first interfaces.** Define stable contracts between modules, services and integrations.
4. **Automation by default.** Automate repeatable validation, deployment, documentation and operations.
5. **AI augmentation with accountability.** AI may accelerate work, but accountable humans approve consequential decisions.
6. **Documentation as infrastructure.** Important decisions, interfaces and operational procedures must be discoverable and current.
7. **Security and privacy by design.** Apply least privilege, tenant isolation, encryption and auditability from inception.
8. **Observability.** Production systems emit actionable logs, metrics, traces, health status and audit events.
9. **Maintainability.** Optimize total lifecycle cost rather than initial coding speed alone.
10. **Reversible decisions.** Preserve optionality where uncertainty is high; document irreversible decisions more rigorously.

## MOS-0003 — Engineering Standards

### Approved baseline stack
- Next.js and React
- TypeScript with strict mode
- Tailwind CSS and shadcn/ui
- Supabase and PostgreSQL
- Stripe
- Vercel

Alternative technologies require a documented architectural reason.

### Repository and branching
- Protect the default branch.
- Use short-lived feature branches.
- Require pull-request review for material changes.
- Use descriptive conventional commits.
- Keep secrets out of source control.

### Quality requirements
- Formatting, linting and type checks pass.
- Critical business logic has automated tests.
- User-facing changes meet accessibility requirements.
- Dependencies and code are security-scanned.
- Significant decisions and operational changes are documented.

### Definition of Done
A change is done when implementation, review, testing, security checks, documentation, deployment readiness, observability and acceptance criteria are complete.

## MOS-0004 — Product Development Lifecycle

Metaphor uses ten phases:

0. **Discovery:** identify the business problem, stakeholders, constraints and desired outcome.
1. **Research:** validate users, market, alternatives, risks and evidence.
2. **Product definition:** produce the PRD, scope, success metrics and release boundaries.
3. **Experience design:** define journeys, information architecture, interaction design and accessibility.
4. **Architecture:** create technical design, ADRs, data model, security model and integration plan.
5. **Development:** implement in reviewable increments using shared platform capabilities.
6. **Quality assurance:** verify functional, performance, accessibility, security and AI behavior.
7. **Deployment:** release with migration, rollback, monitoring and communication plans.
8. **Operations:** monitor reliability, incidents, cost, support and product health.
9. **Continuous improvement:** analyze outcomes, capture knowledge and prioritize the next iteration.

Each phase has an explicit gate. A gate may be passed, conditionally approved or rejected.

## MOS-0005 — Company Constitution

### Mission
Help organizations reduce friction, automate meaningful work and increase profit through well-designed AI-enabled systems.

### Vision
Build an AI-native consulting and software company whose services, internal platform and product portfolio compound into durable business leverage.

### Permanent commitments
- Solve real business problems rather than sell unnecessary complexity.
- Protect clients, users and company assets.
- Be honest about capability, uncertainty, risk and progress.
- Treat documentation, quality and security as part of delivery.
- Build reusable systems while respecting client-specific needs.
- Measure outcomes, learn from failures and improve the operating system.

### Leadership accountability
Leaders own decisions, resource allocation, quality, culture and risk. AI agents advise and execute within delegated authority but do not replace executive accountability.

## MOS-0006 — Metaphor Framework Specification

The Metaphor Framework is the reusable technical foundation for client solutions and Metaphor products.

### Layers
1. Presentation
2. Identity
3. Application services
4. Data
5. AI
6. Infrastructure

### Shared services
- Authentication and authorization
- Organizations and tenancy
- Billing
- Search
- Notifications
- File uploads
- Analytics
- Feature flags
- Audit logging

### AI platform capabilities
- Prompt registry
- Provider abstraction and model routing
- Tool registry and tool calling
- Retrieval and knowledge grounding
- Memory
- Evaluation
- Safety controls
- Usage and cost tracking

Shared capabilities are versioned, documented and reused instead of reimplemented without justification.

## MOS-0007 — Product Requirements Document Standard

Every material product initiative requires a PRD containing:
- Executive summary
- Problem statement
- Evidence and user needs
- Goals and non-goals
- Personas and journeys
- Functional requirements
- Nonfunctional requirements
- AI requirements, when applicable
- Data and privacy requirements
- Dependencies and constraints
- Risks and mitigations
- Success metrics
- Release scope
- Acceptance criteria
- Open questions
- Approval record

A PRD defines what and why, not implementation detail.

## MOS-0008 — Architecture Decision Record Standard

Use an ADR for consequential or difficult-to-reverse technical choices.

Required sections:
- Decision ID and title
- Status
- Context
- Decision drivers
- Considered options
- Decision
- Consequences
- Security and privacy impact
- Migration or rollback plan
- Related documents

Statuses: Proposed, Accepted, Superseded, Deprecated or Rejected. Accepted ADRs are immutable except for clarifications; a new ADR supersedes an old decision.

## MOS-0009 — Technical Design Document Standard

A TDD explains how an approved requirement will be implemented.

Required sections:
- Summary and scope
- Existing-system context
- Proposed architecture
- Components and interfaces
- Data model and migrations
- API contracts
- Authentication and authorization
- Failure modes and recovery
- Observability
- Performance and scalability
- Testing strategy
- Deployment and rollback
- Security and privacy review
- Cost considerations
- Alternatives
- Open questions

## MOS-0010 — AI Engineering Standard

### AI lifecycle
1. Define the task and measurable success criteria.
2. Establish a non-AI or simpler baseline.
3. Select models using quality, latency, cost, privacy and reliability.
4. Design prompts and tools as versioned artifacts.
5. Ground outputs with trusted data where needed.
6. Evaluate offline before release.
7. Add safety controls and human approvals proportional to risk.
8. Monitor production quality, latency, cost and failures.
9. Re-evaluate after model, prompt, tool or data changes.

### Prompt engineering
Prompts must define role, objective, context, constraints, output schema and failure behavior. Production prompts are versioned and tested.

### Retrieval-augmented generation
RAG systems must document source authority, ingestion, chunking, metadata, retrieval, reranking, citation behavior, freshness and access controls.

### Agents
Agents receive explicit goals, allowed tools, data scope, budgets, stopping conditions and escalation paths. High-impact actions require approval or narrowly scoped permissions.

### Evaluation
Evaluate correctness, completeness, groundedness, safety, consistency, latency and cost. Maintain regression suites for critical workflows.

### Governance
Do not expose secrets, cross-tenant data or restricted personal information to models without approved controls. Record material AI actions for auditability.

## MOS-0011 — AI Capability Maturity Model

### Levels
0. **Manual:** work is primarily human and undocumented.
1. **Assisted:** individuals use AI tools for isolated tasks.
2. **Automated:** repeatable workflows use governed AI and automation.
3. **Intelligent:** systems use shared knowledge, evaluation and measurable decision support.
4. **Agentic:** multiple governed agents execute coordinated workflows with human checkpoints.
5. **Autonomous enterprise:** bounded operations adapt continuously with strong controls, auditability and executive oversight.

### Assessment domains
- Strategy
- Governance
- Data
- Engineering
- Operations
- People and skills

Organizations should advance only when controls, data quality and operating discipline are sufficient for the next level.
