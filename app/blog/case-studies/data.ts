export type CaseStudy = {
  slug: string;
  clientType: string;
  title: string;
  summary: string;
  challenge: string;
  system: string[];
  outcomes: { label: string; value: string }[];
  services: string[];
  status: "concept" | "published";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "service-business-lead-response-system",
    clientType: "Local service business",
    title: "From missed inquiries to a structured lead-response system",
    summary: "A model engagement showing how a service business can connect landing-page inquiries, qualification, booking, and follow-up into one operating system.",
    challenge: "Leads arrived through multiple channels, responses were inconsistent, and prospects often had to wait for manual follow-up before they could book.",
    system: [
      "Conversion-focused landing page with structured intake",
      "Instant confirmation and lead-routing workflow",
      "Qualification logic for service fit and urgency",
      "Booking handoff with reminders and follow-up",
    ],
    outcomes: [
      { label: "Target response time", value: "Under 1 min" },
      { label: "Manual handoffs removed", value: "4" },
      { label: "Core systems connected", value: "5" },
    ],
    services: ["Landing Pages", "Lead Capture", "Booking Automation"],
    status: "concept",
  },
  {
    slug: "consultant-booking-and-intake-automation",
    clientType: "Independent consultant",
    title: "A cleaner path from website visitor to qualified consultation",
    summary: "A practical system design for consultants who need to filter inquiries, collect context, and reduce unproductive discovery calls.",
    challenge: "The consultant spent too much time answering repetitive questions and entering incomplete lead information before calls.",
    system: [
      "Offer-specific landing page and decision-focused copy",
      "Pre-call intake with project-fit questions",
      "Automated confirmation and preparation sequence",
      "Central lead record for follow-up and reporting",
    ],
    outcomes: [
      { label: "Target admin reduction", value: "60%" },
      { label: "Qualification stages", value: "3" },
      { label: "Primary workflow", value: "1 clear path" },
    ],
    services: ["Business Systems", "CRM", "Workflow Automation"],
    status: "concept",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
