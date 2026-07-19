import { automations, type AutomationPlaybook } from "../automation-library/data";

export type ExplorerAnswers = {
  industry: string;
  teamSize: string;
  monthlyLeads: string;
  biggestBottleneck: string;
  currentTools: string[];
  repetitiveHours: number;
  hourlyValue: number;
  urgency: string;
};

export type ExplorerRecommendation = AutomationPlaybook & {
  score: number;
  reasons: string[];
};

const bottleneckCategoryMap: Record<string, string[]> = {
  leads: ["Lead Capture", "Customer Response"],
  followup: ["Sales Operations", "Lead Capture"],
  booking: ["Booking", "Customer Response"],
  onboarding: ["Client Operations"],
  reputation: ["Reputation"],
};

export function calculateReadiness(answers: ExplorerAnswers) {
  let score = 35;
  if (answers.repetitiveHours >= 10) score += 20;
  else if (answers.repetitiveHours >= 5) score += 12;
  if (answers.monthlyLeads === "51+" || answers.monthlyLeads === "21-50") score += 15;
  else if (answers.monthlyLeads === "6-20") score += 8;
  if (answers.currentTools.length >= 2) score += 12;
  if (answers.urgency === "now") score += 10;
  if (answers.teamSize !== "solo") score += 8;
  return Math.min(score, 100);
}

export function getRecommendations(answers: ExplorerAnswers): ExplorerRecommendation[] {
  const preferredCategories = bottleneckCategoryMap[answers.biggestBottleneck] ?? [];

  return automations
    .map((automation) => {
      let score = 0;
      const reasons: string[] = [];

      if (preferredCategories.includes(automation.category)) {
        score += 45;
        reasons.push("Directly matches your primary bottleneck");
      }
      if (automation.industries.includes(answers.industry)) {
        score += 25;
        reasons.push(`Designed for ${answers.industry.toLowerCase()} workflows`);
      }
      const sharedTools = automation.integrations.filter((tool) => answers.currentTools.includes(tool));
      if (sharedTools.length) {
        score += Math.min(sharedTools.length * 8, 20);
        reasons.push(`Can use your existing ${sharedTools.join(" and ")} setup`);
      }
      if (answers.teamSize === "solo" && automation.difficulty === "Beginner") score += 8;
      if (answers.monthlyLeads === "51+" && ["Lead Capture", "Sales Operations", "Customer Response"].includes(automation.category)) score += 10;

      return { ...automation, score, reasons: reasons.length ? reasons : ["Supports a common operational constraint in your profile"] };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function calculateOpportunity(answers: ExplorerAnswers) {
  const monthlyHours = Math.max(answers.repetitiveHours * 4.33, 0);
  const recoverableLow = Math.round(monthlyHours * 0.35);
  const recoverableHigh = Math.round(monthlyHours * 0.65);
  return {
    monthlyHours: Math.round(monthlyHours),
    recoverableLow,
    recoverableHigh,
    monthlyValueLow: Math.round(recoverableLow * answers.hourlyValue),
    monthlyValueHigh: Math.round(recoverableHigh * answers.hourlyValue),
  };
}
