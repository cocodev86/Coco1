"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateOpportunity, calculateReadiness, getRecommendations, type ExplorerAnswers } from "./scoring";
import styles from "./explorer.module.css";

const initialAnswers: ExplorerAnswers = {
  industry: "Consulting",
  teamSize: "solo",
  monthlyLeads: "6-20",
  biggestBottleneck: "leads",
  currentTools: [],
  repetitiveHours: 8,
  hourlyValue: 75,
  urgency: "now",
};

const tools = ["HubSpot", "Gmail", "Google Calendar", "Stripe", "Airtable", "Twilio", "Slack", "OpenAI"];

export default function ExplorerClient() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const readiness = useMemo(() => calculateReadiness(answers), [answers]);
  const opportunity = useMemo(() => calculateOpportunity(answers), [answers]);
  const recommendations = useMemo(() => getRecommendations(answers), [answers]);

  function update<K extends keyof ExplorerAnswers>(key: K, value: ExplorerAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleTool(tool: string) {
    update("currentTools", answers.currentTools.includes(tool)
      ? answers.currentTools.filter((item) => item !== tool)
      : [...answers.currentTools, tool]);
  }

  if (showResults) {
    return (
      <section className={styles.results} aria-live="polite">
        <div className={styles.resultHero}>
          <div>
            <p className="eyebrow">Your automation diagnosis</p>
            <h2>{readiness}% readiness score</h2>
            <p>Your answers indicate a meaningful automation opportunity. This is a directional estimate, not a guaranteed financial return.</p>
          </div>
          <div className={styles.scoreRing}><strong>{readiness}</strong><span>/100</span></div>
        </div>

        <div className={styles.metrics}>
          <article><span>Current repetitive load</span><strong>{opportunity.monthlyHours} hrs/mo</strong></article>
          <article><span>Potentially recoverable</span><strong>{opportunity.recoverableLow}–{opportunity.recoverableHigh} hrs/mo</strong></article>
          <article><span>Estimated time value</span><strong>${opportunity.monthlyValueLow.toLocaleString()}–${opportunity.monthlyValueHigh.toLocaleString()}/mo</strong></article>
        </div>

        <div className={styles.recommendationHeader}>
          <div><p className="eyebrow">Priority roadmap</p><h2>Start with these systems.</h2></div>
          <button className={styles.textButton} onClick={() => { setShowResults(false); setStep(0); }}>Retake assessment</button>
        </div>

        <div className={styles.recommendationGrid}>
          {recommendations.map((item, index) => (
            <article className={styles.recommendation} key={item.slug}>
              <div className={styles.priority}><span>Priority {index + 1}</span><strong>{item.score}% fit</strong></div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul>{item.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
              <div className={styles.recommendationMeta}><span>{item.buildTime}</span><span>{item.monthlyHoursSaved}</span></div>
              <Link href={`/automation-library/${item.slug}`}>View implementation playbook →</Link>
            </article>
          ))}
        </div>

        <div className={styles.resultCta}>
          <div><p className="eyebrow">Validate the opportunity</p><h2>Turn this estimate into an implementation plan.</h2><p>A discovery session verifies workflow volume, exceptions, software access, risk controls, and the actual business case.</p></div>
          <Link className="button" href="/#booking">Book a strategy call</Link>
        </div>
      </section>
    );
  }

  const steps = [
    <div className={styles.question} key="business"><p className="eyebrow">Step 1 of 4</p><h2>Tell us about the business.</h2><label>Industry<select value={answers.industry} onChange={(event) => update("industry", event.target.value)}><option>Consulting</option><option>Professional Services</option><option>Home Services</option><option>Barbers</option><option>Tattoo Studios</option><option>Healthcare</option><option>Real Estate</option><option>Restaurants</option><option>Creative Services</option></select></label><label>Team size<select value={answers.teamSize} onChange={(event) => update("teamSize", event.target.value)}><option value="solo">Solo</option><option value="2-5">2–5 people</option><option value="6-20">6–20 people</option><option value="21+">21+ people</option></select></label><label>Monthly leads or inquiries<select value={answers.monthlyLeads} onChange={(event) => update("monthlyLeads", event.target.value)}><option>0-5</option><option>6-20</option><option>21-50</option><option>51+</option></select></label></div>,
    <div className={styles.question} key="bottleneck"><p className="eyebrow">Step 2 of 4</p><h2>Where does work break down?</h2><div className={styles.choiceGrid}>{[["leads","Lead response and qualification"],["followup","Sales follow-up"],["booking","Booking and reminders"],["onboarding","Client onboarding"],["reputation","Reviews and reputation"]].map(([value,label]) => <button className={answers.biggestBottleneck === value ? styles.activeChoice : ""} onClick={() => update("biggestBottleneck", value)} key={value}>{label}</button>)}</div></div>,
    <div className={styles.question} key="tools"><p className="eyebrow">Step 3 of 4</p><h2>What is already in the stack?</h2><p>Select every tool currently used. Existing systems can reduce implementation time when they are configured well.</p><div className={styles.choiceGrid}>{tools.map((tool) => <button className={answers.currentTools.includes(tool) ? styles.activeChoice : ""} onClick={() => toggleTool(tool)} key={tool}>{tool}</button>)}</div></div>,
    <div className={styles.question} key="economics"><p className="eyebrow">Step 4 of 4</p><h2>Estimate the operational load.</h2><label>Hours spent weekly on repetitive work<input type="number" min="0" max="100" value={answers.repetitiveHours} onChange={(event) => update("repetitiveHours", Number(event.target.value))} /></label><label>Approximate hourly value of your time<input type="number" min="0" max="1000" value={answers.hourlyValue} onChange={(event) => update("hourlyValue", Number(event.target.value))} /></label><label>Implementation urgency<select value={answers.urgency} onChange={(event) => update("urgency", event.target.value)}><option value="now">Within 30 days</option><option value="quarter">This quarter</option><option value="researching">Researching options</option></select></label></div>,
  ];

  return (
    <section className={styles.explorer}>
      <div className={styles.progress}><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
      {steps[step]}
      <div className={styles.controls}>
        <button className={styles.secondaryButton} disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</button>
        {step < steps.length - 1
          ? <button className="button" onClick={() => setStep((current) => current + 1)}>Continue</button>
          : <button className="button" onClick={() => setShowResults(true)}>Generate my roadmap</button>}
      </div>
    </section>
  );
}
