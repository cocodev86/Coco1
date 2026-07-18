"use client";

import { FormEvent, useMemo, useState } from "react";

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

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      setStatus("success");
      setMessage("Your strategy-call request is in. We’ll review it and send confirmation details to the email you provided.");
    } catch {
      setStatus("error");
      setMessage("We couldn’t submit your request. Please check the form and try again.");
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label><span>Name *</span><input name="name" type="text" minLength={2} maxLength={100} required autoComplete="name" /></label>
        <label><span>Company</span><input name="company" type="text" maxLength={120} autoComplete="organization" /></label>
        <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
        <label><span>Phone</span><input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label>
        <label><span>Service needed *</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}</select></label>
        <label><span>Estimated budget</span><select name="budget" defaultValue=""><option value="">Select a range</option>{budgets.map(budget => <option key={budget}>{budget}</option>)}</select></label>
        <label><span>Preferred date *</span><input name="preferred_date" type="date" min={minDate} required /></label>
        <label><span>Preferred time *</span><select name="preferred_time" required defaultValue=""><option value="" disabled>Select a time window</option><option>9:00 AM–12:00 PM</option><option>12:00 PM–3:00 PM</option><option>3:00 PM–6:00 PM</option><option>6:00 PM–8:00 PM</option></select></label>
      </div>
      <label className="full-field"><span>Tell us about your project *</span><textarea name="project_details" minLength={10} maxLength={2000} rows={6} required placeholder="What are you trying to automate, improve, or launch?" /></label>
      <div className="booking-submit"><button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request my strategy call"}</button><p>Submitting this form does not guarantee a time slot. We’ll confirm availability by email.</p></div>
      {message && <div className={`form-message ${status}`} role="status">{message}</div>}
    </form>
  );
}
