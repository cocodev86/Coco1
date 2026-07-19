export type AutomationPlaybook = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  industries: string[];
  integrations: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  buildTime: string;
  monthlyHoursSaved: string;
  roi: string;
  trigger: string;
  workflow: string[];
  outcomes: string[];
};

export const automations: AutomationPlaybook[] = [
  {
    slug: "ai-lead-qualification",
    title: "AI Lead Qualification",
    summary: "Capture new inquiries, score intent, collect missing details, and route qualified prospects to the right next step.",
    category: "Lead Capture",
    industries: ["Professional Services", "Home Services", "Consulting"],
    integrations: ["OpenAI", "HubSpot", "Gmail"],
    difficulty: "Advanced",
    buildTime: "5–10 business days",
    monthlyHoursSaved: "20–45 hours",
    roi: "Best for businesses losing time to low-fit inquiries",
    trigger: "A prospect submits a form, sends an email, or starts a chat.",
    workflow: ["Capture inquiry", "Extract needs and urgency", "Score fit", "Request missing information", "Route or book"],
    outcomes: ["Faster first response", "More consistent qualification", "Cleaner CRM records", "Less time spent on poor-fit leads"],
  },
  {
    slug: "missed-call-text-back",
    title: "Missed Call Text-Back",
    summary: "Automatically text callers when the business cannot answer, collect their request, and create a follow-up task.",
    category: "Customer Response",
    industries: ["Home Services", "Barbers", "Tattoo Studios"],
    integrations: ["Twilio", "HubSpot", "Google Calendar"],
    difficulty: "Intermediate",
    buildTime: "2–5 business days",
    monthlyHoursSaved: "8–20 hours",
    roi: "Strong when phone calls are a primary lead source",
    trigger: "An inbound business call is missed or goes unanswered.",
    workflow: ["Detect missed call", "Send branded text", "Collect service need", "Create CRM record", "Notify owner or offer booking"],
    outcomes: ["Fewer lost callers", "Faster response coverage", "Documented follow-up", "More appointment opportunities"],
  },
  {
    slug: "appointment-booking-automation",
    title: "Appointment Booking Automation",
    summary: "Turn qualified inquiries into confirmed appointments with reminders, intake questions, and calendar updates.",
    category: "Booking",
    industries: ["Consulting", "Barbers", "Tattoo Studios", "Healthcare"],
    integrations: ["Calendly", "Google Calendar", "Gmail", "Stripe"],
    difficulty: "Beginner",
    buildTime: "1–3 business days",
    monthlyHoursSaved: "6–15 hours",
    roi: "Useful for any service business scheduling manually",
    trigger: "A prospect reaches the booking step or receives a scheduling link.",
    workflow: ["Select service", "Check availability", "Collect intake details", "Confirm appointment", "Send reminders"],
    outcomes: ["Less scheduling back-and-forth", "Fewer no-shows", "Cleaner intake", "Faster booking completion"],
  },
  {
    slug: "review-request-system",
    title: "Review Request System",
    summary: "Ask satisfied customers for reviews at the right moment and privately route unhappy feedback for recovery.",
    category: "Reputation",
    industries: ["Restaurants", "Home Services", "Barbers", "Tattoo Studios"],
    integrations: ["Gmail", "Twilio", "HubSpot"],
    difficulty: "Beginner",
    buildTime: "1–3 business days",
    monthlyHoursSaved: "4–10 hours",
    roi: "Compounds over time through stronger local proof",
    trigger: "A job, appointment, or order is marked complete.",
    workflow: ["Wait for service completion", "Send satisfaction check", "Route positive customers to review", "Route concerns internally", "Track response"],
    outcomes: ["More consistent review volume", "Earlier issue detection", "Reduced manual follow-up", "Stronger local credibility"],
  },
  {
    slug: "crm-follow-up-pipeline",
    title: "CRM Follow-Up Pipeline",
    summary: "Create timed follow-up sequences, ownership rules, and alerts so active opportunities do not disappear.",
    category: "Sales Operations",
    industries: ["Professional Services", "Real Estate", "Consulting"],
    integrations: ["HubSpot", "Gmail", "Slack"],
    difficulty: "Intermediate",
    buildTime: "3–7 business days",
    monthlyHoursSaved: "12–30 hours",
    roi: "Best where leads are generated but follow-up is inconsistent",
    trigger: "A new lead, proposal, or sales-stage change enters the CRM.",
    workflow: ["Assign owner", "Start follow-up sequence", "Track replies", "Escalate inactivity", "Update pipeline stage"],
    outcomes: ["Fewer forgotten leads", "Consistent sales cadence", "Clear ownership", "More accurate pipeline reporting"],
  },
  {
    slug: "client-intake-system",
    title: "Client Intake System",
    summary: "Collect documents, requirements, approvals, and payments before work begins, then create the internal project record.",
    category: "Client Operations",
    industries: ["Consulting", "Creative Services", "Professional Services"],
    integrations: ["Stripe", "Gmail", "Google Drive", "Airtable"],
    difficulty: "Intermediate",
    buildTime: "3–7 business days",
    monthlyHoursSaved: "10–25 hours",
    roi: "Reduces onboarding delays and incomplete project handoffs",
    trigger: "A proposal is accepted or a client pays a deposit.",
    workflow: ["Confirm payment", "Send intake portal", "Collect assets", "Validate completion", "Create project and notify team"],
    outcomes: ["Faster project starts", "Fewer missing assets", "Standardized onboarding", "Better client experience"],
  },
];

export const automationCategories = Array.from(new Set(automations.map((item) => item.category))).sort();
export const automationIndustries = Array.from(new Set(automations.flatMap((item) => item.industries))).sort();
export const automationIntegrations = Array.from(new Set(automations.flatMap((item) => item.integrations))).sort();