"use client";

import { FocusEvent, FormEvent, useMemo, useRef, useState } from "react";
import styles from "./BookingForm.module.css";

const BOOKING_ENDPOINT = "https://pqyigabrlnxcruzzkxuc.supabase.co/functions/v1/submit-booking";

const services = [
  "AI landing page",
  "Booking automation",
  "Lead response system",
  "Business workflow automation",
  "Custom integration",
  "Strategy consultation",
];

const budgets = ["Under $1,500", "$1,500–$3,000", "$3,000–$5,000", "$5,000+", "Not sure yet"];
const stepOneFields = ["name", "email", "service"] as const;
const stepTwoFields = ["preferred_date", "preferred_time", "project_details"] as const;
type FieldName = typeof stepOneFields[number] | typeof stepTwoFields[number];
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function getFieldError(field: FormControl): string {
  const name = field.name as FieldName;
  const value = field.value.trim();

  if (field.validity.valueMissing) {
    const labels: Record<FieldName, string> = {
      name: "Enter your name so we know who to contact.",
      email: "Enter the email address where you want confirmation sent.",
      service: "Choose the service that best matches your project.",
      preferred_date: "Choose a preferred appointment date.",
      preferred_time: "Choose a preferred time window.",
      project_details: "Tell us what you want to build, improve, or automate.",
    };
    return labels[name];
  }

  if (name === "name" && value.length < 2) return "Name must contain at least two characters.";
  if (name === "email" && field.validity.typeMismatch) return "Enter a valid email address, such as name@company.com.";
  if (name === "project_details" && value.length < 10) return "Add at least 10 characters so we have enough context to prepare.";
  if (!field.validity.valid) return "Review this field and enter a valid response.";
  return "";
}

export default function BookingForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  function validateFields(names: readonly FieldName[]) {
    const form = formRef.current;
    if (!form) return false;

    const nextErrors: Partial<Record<FieldName, string>> = {};
    let firstInvalid: FormControl | null = null;

    names.forEach((name) => {
      const field = form.elements.namedItem(name);
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
      const error = getFieldError(field);
      if (error) {
        nextErrors[name] = error;
        firstInvalid ??= field;
      }
    });

    setErrors((current) => {
      const retained = { ...current };
      names.forEach((name) => delete retained[name]);
      return { ...retained, ...nextErrors };
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function handleBlur(event: FocusEvent<FormControl>) {
    const field = event.currentTarget;
    const name = field.name as FieldName;
    if (![...stepOneFields, ...stepTwoFields].includes(name)) return;
    const error = getFieldError(field);
    setErrors((current) => ({ ...current, [name]: error || undefined }));
  }

  function clearError(name: FieldName) {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function goToStepTwo() {
    if (!validateFields(stepOneFields)) return;
    setMessage("");
    setStatus("idle");
    setStep(2);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateFields(stepTwoFields)) return;

    setStatus("submitting");
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") || "").trim(),
      company: String(form.get("company") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      service: String(form.get("service") || ""),
      budget: String(form.get("budget") || ""),
      preferred_date: String(form.get("preferred_date") || ""),
      preferred_time: String(form.get("preferred_time") || ""),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
      project_details: String(form.get("project_details") || "").trim(),
    };

    try {
      const response = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Booking request could not be submitted.");
      formElement.reset();
      setErrors({});
      setStep(1);
      setStatus("success");
      setMessage("Your strategy-call request is in. We’ll review it and send confirmation details to the email you provided.");
    } catch {
      setStatus("error");
      setMessage("We couldn’t submit your request. Your entries are still here—please try again in a moment.");
    }
  }

  const fieldProps = (name: FieldName) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": `${name}-hint${errors[name] ? ` ${name}-error` : ""}`,
    className: errors[name] ? styles.invalid : undefined,
    onBlur: handleBlur,
    onChange: () => clearError(name),
  });

  return (
    <form ref={formRef} className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className={styles.progressHeader} aria-live="polite" aria-atomic="true">
        <p className={styles.progressCount}>Step {step} of 2</p>
        <p className={styles.progressTitle}>{step === 1 ? "Contact and service" : "Date, budget, and details"}</p>
      </div>

      <div className={styles.progress} aria-label={`Step ${step} of 2`}>
        <div className={`${styles.step} ${step === 1 ? styles.active : styles.complete}`}><span>{step === 2 ? "✓" : "1"}</span>Contact and service</div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}><span>2</span>Date and details</div>
      </div>

      <section className={styles.panel} hidden={step !== 1} aria-labelledby="booking-step-one-title">
        <div className={styles.heading}><strong id="booking-step-one-title">Tell us who you are.</strong><small>Start with your contact details and the service you need.</small></div>
        <div className="form-grid">
          <label className={styles.field}><span>Name *</span><input name="name" type="text" minLength={2} maxLength={100} required autoComplete="name" {...fieldProps("name")} /><small id="name-hint" className={styles.hint}>Use the name you want us to use when we follow up.</small>{errors.name && <small id="name-error" className={styles.error} role="alert">{errors.name}</small>}</label>
          <label className={styles.field}><span>Company</span><input name="company" type="text" maxLength={120} autoComplete="organization" /><small className={styles.hint}>Optional—business or brand name.</small></label>
          <label className={styles.field}><span>Email *</span><input name="email" type="email" required autoComplete="email" {...fieldProps("email")} /><small id="email-hint" className={styles.hint}>We’ll send appointment confirmation and next steps here.</small>{errors.email && <small id="email-error" className={styles.error} role="alert">{errors.email}</small>}</label>
          <label className={styles.field}><span>Phone <em>(optional)</em></span><input name="phone" type="tel" inputMode="tel" maxLength={30} autoComplete="tel" aria-describedby="phone-hint" /><small id="phone-hint" className={styles.hint}>Used only for appointment updates by call or text. We will not send promotional messages.</small></label>
          <label className={styles.field}><span>Service needed *</span><select name="service" required defaultValue="" {...fieldProps("service")}><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}</select><small id="service-hint" className={styles.hint}>Choose the closest match; we can refine the scope together.</small>{errors.service && <small id="service-error" className={styles.error} role="alert">{errors.service}</small>}</label>
        </div>
        <div className={styles.actions}><button className="button" type="button" onClick={goToStepTwo}>Continue to project details</button></div>
      </section>

      <section className={styles.panel} hidden={step !== 2} aria-labelledby="booking-step-two-title">
        <div className={styles.heading}><strong id="booking-step-two-title">Choose timing and scope.</strong><small>Add your preferred date, budget, and project details.</small></div>
        <div className="form-grid">
          <label className={styles.field}><span>Preferred date *</span><input name="preferred_date" type="date" min={minDate} required {...fieldProps("preferred_date")} /><small id="preferred_date-hint" className={styles.hint}>Select your first-choice date. We’ll confirm availability by email.</small>{errors.preferred_date && <small id="preferred_date-error" className={styles.error} role="alert">{errors.preferred_date}</small>}</label>
          <label className={styles.field}><span>Preferred time *</span><select name="preferred_time" required defaultValue="" {...fieldProps("preferred_time")}><option value="" disabled>Select a time window</option><option>9:00 AM–12:00 PM</option><option>12:00 PM–3:00 PM</option><option>3:00 PM–6:00 PM</option><option>6:00 PM–8:00 PM</option></select><small id="preferred_time-hint" className={styles.hint}>Times are interpreted in your device’s local timezone.</small>{errors.preferred_time && <small id="preferred_time-error" className={styles.error} role="alert">{errors.preferred_time}</small>}</label>
          <label className={styles.field}><span>Estimated budget</span><select name="budget" defaultValue=""><option value="">Select a range</option>{budgets.map(budget => <option key={budget}>{budget}</option>)}</select><small className={styles.hint}>Optional—this helps us recommend the right scope.</small></label>
        </div>
        <label className={`full-field ${styles.field}`}><span>Tell us about your project *</span><textarea name="project_details" minLength={10} maxLength={2000} rows={5} required placeholder="What are you trying to automate, improve, or launch?" {...fieldProps("project_details")} /><small id="project_details-hint" className={styles.hint}>Mention the current problem, desired outcome, and any tools you already use.</small>{errors.project_details && <small id="project_details-error" className={styles.error} role="alert">{errors.project_details}</small>}</label>
        <div className={styles.actions}>
          <button className={styles.back} type="button" onClick={() => setStep(1)}>Back</button>
          <button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request my strategy call"}</button>
        </div>
        <p className={styles.note}>Submitting this form does not guarantee a time slot. We’ll confirm availability by email.</p>
      </section>

      {message && <div className={`form-message ${status}`} role="status">{message}</div>}
    </form>
  );
}
