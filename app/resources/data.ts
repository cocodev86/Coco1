export type ResourceItem = {
  slug: string;
  title: string;
  description: string;
  type: "Checklist" | "Worksheet" | "Calculator" | "Template" | "Guide";
  audience: string[];
  topics: string[];
  timeToUse: string;
  featured?: boolean;
  outcome: string;
  includes: string[];
  instructions: string[];
};

export const resources: ResourceItem[] = [
  {
    slug: "ai-automation-readiness-checklist",
    title: "AI Automation Readiness Checklist",
    description: "Evaluate whether a workflow is stable, measurable, repeatable, and safe enough to automate before investing in software.",
    type: "Checklist",
    audience: ["Founders", "Operations leaders", "Small businesses"],
    topics: ["AI automation", "Process design", "Risk"],
    timeToUse: "15 minutes",
    featured: true,
    outcome: "A ranked shortlist of workflows that are ready for automation now, later, or not at all.",
    includes: ["Workflow stability score", "Data-readiness questions", "Exception and risk review", "Automation priority matrix"],
    instructions: ["Choose one repeated workflow.", "Score each readiness category honestly.", "Document exceptions and human approvals.", "Prioritize only workflows with clear ownership and measurable outcomes."],
  },
  {
    slug: "automation-roi-calculator",
    title: "Automation ROI Calculator",
    description: "Estimate labor savings, software cost, implementation payback, and first-year return before approving an automation project.",
    type: "Calculator",
    audience: ["Founders", "Finance", "Operations leaders"],
    topics: ["ROI", "Budgeting", "Automation"],
    timeToUse: "10 minutes",
    featured: true,
    outcome: "A defensible business case showing expected savings, payback period, and first-year value.",
    includes: ["Current labor-cost inputs", "Implementation-cost estimate", "Monthly savings calculation", "Payback-period formula"],
    instructions: ["Record the task frequency and average handling time.", "Calculate the fully loaded hourly cost.", "Estimate the percentage of work automation can safely remove.", "Compare twelve-month savings against build and software costs."],
  },
  {
    slug: "lead-funnel-audit-worksheet",
    title: "Lead Funnel Audit Worksheet",
    description: "Map where inquiries enter, how quickly they receive a response, what qualifies them, and where follow-up breaks down.",
    type: "Worksheet",
    audience: ["Sales teams", "Service businesses", "Marketing teams"],
    topics: ["Lead capture", "CRM", "Conversion"],
    timeToUse: "25 minutes",
    outcome: "A clear funnel map with the highest-cost response and follow-up gaps identified.",
    includes: ["Lead-source inventory", "Response-time audit", "Qualification map", "Follow-up gap analysis"],
    instructions: ["List every active lead source.", "Trace each source through response, qualification, booking, and follow-up.", "Record ownership and average response time.", "Mark every manual handoff and dead end."],
  },
  {
    slug: "website-conversion-audit",
    title: "Website Conversion Audit Checklist",
    description: "Review whether a landing page clearly communicates value, builds trust, captures intent, and guides visitors toward one primary action.",
    type: "Checklist",
    audience: ["Founders", "Marketing teams", "Service businesses"],
    topics: ["Landing pages", "Conversion", "Messaging"],
    timeToUse: "20 minutes",
    outcome: "A prioritized list of page changes likely to improve clarity, trust, and conversion.",
    includes: ["Above-the-fold review", "Offer clarity test", "Trust-signal inventory", "CTA and form assessment"],
    instructions: ["Review the page as a first-time visitor.", "Identify the single action the page should drive.", "Remove competing messages and unnecessary fields.", "Rank improvements by impact and implementation effort."],
  },
  {
    slug: "client-intake-sop-template",
    title: "Client Intake SOP Template",
    description: "Standardize the steps between a signed agreement and a project-ready client record, workspace, kickoff, and delivery plan.",
    type: "Template",
    audience: ["Agencies", "Consultants", "Freelancers"],
    topics: ["Client operations", "SOP", "Onboarding"],
    timeToUse: "30 minutes",
    outcome: "A repeatable intake process that reduces missing information and inconsistent onboarding.",
    includes: ["Intake ownership", "Required client inputs", "Workspace setup", "Kickoff readiness checklist"],
    instructions: ["Replace the placeholders with your tools and owners.", "Define what must be complete before kickoff.", "Add escalation rules for missing information.", "Review and revise after the first three client runs."],
  },
  {
    slug: "crm-setup-guide",
    title: "Practical CRM Setup Guide",
    description: "Design a lean CRM around real lifecycle stages, ownership, next actions, and reporting instead of collecting unused fields.",
    type: "Guide",
    audience: ["Founders", "Sales teams", "Small businesses"],
    topics: ["CRM", "Sales operations", "Data"],
    timeToUse: "45 minutes",
    outcome: "A CRM structure that makes lead status, ownership, and next actions visible without unnecessary complexity.",
    includes: ["Lifecycle-stage framework", "Minimum field set", "Pipeline design", "Automation guardrails"],
    instructions: ["Define lifecycle stages using observable events.", "Assign one owner and one next action to every open record.", "Keep required fields limited to operational decisions.", "Automate reminders only after the pipeline rules are stable."],
  },
];

export const resourceTypes = Array.from(new Set(resources.map((resource) => resource.type))).sort();
export const resourceTopics = Array.from(new Set(resources.flatMap((resource) => resource.topics))).sort();