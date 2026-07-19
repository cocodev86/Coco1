# Metaphor Platform Manual

**Series:** MCP  
**Version:** 1.0.0  
**Owner:** Chief Systems Architect  
**Status:** Strategic

## MCP-0001 — Metaphor Command Center

The Metaphor Command Center (MCC) is the internal control plane for people, clients, projects, products, engineering, knowledge, AI agents and business operations.

### Objectives
- Establish a single operational source of truth.
- Coordinate human and AI work.
- Enforce MOS and Playbook standards in workflows.
- Reduce tool fragmentation and manual administration.
- Expose actionable business, delivery and platform health.

### Modules
- Executive Dashboard
- Sales Workspace
- Client Workspace
- Delivery Workspace
- Engineering Workspace
- AI Workspace
- Knowledge Workspace
- Operations Workspace
- Product Workspace
- Notification Center
- Unified Search
- Analytics

### Core controls
SSO, MFA, RBAC, tenant isolation, audit logging, encryption, session management and secrets management.

### Integrations
GitHub, Vercel, Supabase, Stripe, Gmail, Google Calendar, Google Drive, Slack or Microsoft Teams, HubSpot and approved future systems.

## MCP-0002 — Enterprise Platform Architecture

Metaphor products consume shared platform capabilities rather than independently rebuilding them.

### Logical layers
1. Experience — web, mobile, client portal, admin, AI chat and APIs.
2. Application services — products, consulting, delivery, CRM and project logic.
3. AI orchestration — agents, workflows, memory, retrieval and evaluations.
4. Shared services — identity, billing, search, notifications, files, analytics, flags and organizations.
5. Data platform — PostgreSQL, vector storage, object storage and cache.
6. Infrastructure — cloud, CI/CD, monitoring, secrets and networking.

### Core domains
- Identity
- AI Platform
- Knowledge Platform
- Automation Platform
- Analytics Platform
- Integration Platform

### Multi-tenancy
Organizations receive isolated users, roles, projects, billing, knowledge, AI usage, configuration and audit history. Tenant identity is enforced at every data boundary.

### Events and APIs
Use versioned APIs and domain events such as `client.created`, `project.approved`, `invoice.paid`, `deployment.completed`, `agent.evaluation.completed` and `knowledge.updated`. Operations should be idempotent where practical and return consistent errors.

### Data classes
Operational data, analytical data, AI memory, knowledge assets, audit records and cached data have distinct retention, access and performance policies.

### Observability
All production services emit structured logs, metrics, traces, health signals and audit events.

## MCP-0003 — Metaphor Developer Platform

The MDP provides standardized tools, templates, libraries and automation for building and operating software.

### Capabilities
- Project scaffolding for websites, SaaS, portals, internal tools, AI agents, APIs, workflows and documentation sites
- Shared packages for auth, authorization, UI, AI, billing, notifications, logging, analytics, validation, flags and files
- Developer CLI
- AI engineering assistant
- Internal package registry
- Reusable infrastructure modules
- Documentation generator
- Automated quality gates
- AI evaluation platform
- Developer portal

### Example CLI
```text
mdp new saas
mdp new landing-page
mdp generate prd
mdp generate tdd
mdp generate adr
mdp deploy
mdp evaluate-ai
mdp audit-security
```

### Repository blueprint
```text
/apps
/packages
/services
/docs
/tests
/scripts
/.github
```

Required repository files include README, CHANGELOG, SECURITY, CONTRIBUTING, CODEOWNERS, LICENSE and architecture overview.

### Metrics
Project setup time, library adoption, deployment frequency, recovery time, defect rate, documentation coverage, onboarding duration and AI-assisted productivity.

## MCP-0004 — Metaphor OS Product Specification

Metaphor OS is the long-term commercial form of the internal operating platform: an AI-native control plane for digital businesses.

### Product philosophy
Metaphor OS coordinates existing systems rather than requiring every system to be replaced. It becomes the orchestration engine, organizational memory, AI layer and governance surface.

### Product modules
- Executive
- CRM
- Delivery
- Product
- Engineering
- AI
- Knowledge
- Clients
- Finance
- Operations

### Universal AI layer
Every module may expose governed summarization, recommendation, generation, search, analytics and workflow execution through consistent permissions and audit controls.

### Workflow engine
Coordinates human tasks, agents, approvals, integrations, schedules, notifications and event-driven automation. Workflows are observable, reusable and versioned.

### Knowledge graph
Relates people, companies, clients, projects, products, documents, repositories, decisions, workflows and agents to enable contextual search and recommendations.

### Plugin architecture
Supports accounting, marketing, HR, commerce, support and industry-specific extensions through documented APIs and an SDK.

### Automation Studio
A visual builder uses triggers, conditions, AI decisions, human approvals, integration actions, timers and notifications. Workflows can be exported and installed as templates.

### Agent marketplace
Organizations browse approved agents, configure permissions, assign responsibilities, inspect evaluations and disable or retire agents.

### Platform kernel
The stable kernel owns identity, permissions, tenancy, configuration, event routing, workflow execution and plugin management. CRM, delivery, documentation, billing, analytics and AI features are modules above the kernel.

### Release roadmap

**Version 1:** authentication, organizations, Command Center, documentation, projects, AI assistant and knowledge search.

**Version 2:** workflow engine, client portal, analytics, agent marketplace and Automation Studio.

**Version 3:** multi-agent orchestration, knowledge graph, developer platform, marketplace and SDK.

**Version 4:** industry packs, white-labeling, enterprise governance, advanced analytics and ecosystem APIs.

## Reference implementation structure

```text
/apps
  command-center
  client-portal
  developer-portal
  docs

/packages
  auth
  ai
  ui
  knowledge
  analytics
  billing
  notifications
  automation

/services
  orchestration
  search
  evaluation
  integrations

/docs
  mos
  playbook
  client-operations
  platform
  strategy

/templates
  prd
  tdd
  adr
  sow
```
