"use client";

import { FormEvent, useState } from "react";
import { newsletterTopics } from "./data";
import styles from "./newsletter.module.css";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || "").trim(),
      firstName: String(form.get("firstName") || "").trim(),
      topics: form.getAll("topics").map(String),
      source: "newsletter-page",
    };

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to subscribe right now.");
      setStatus("success");
      setMessage(result.message || "You are subscribed.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.formRow}>
        <label>
          <span>First name</span>
          <input name="firstName" autoComplete="given-name" placeholder="Coco" />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@business.com" required />
        </label>
      </div>
      <fieldset>
        <legend>Choose your topics</legend>
        <div className={styles.topicGrid}>
          {newsletterTopics.map((topic) => (
            <label className={styles.topicOption} key={topic}>
              <input type="checkbox" name="topics" value={topic} defaultChecked />
              <span>{topic}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <button className="button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing…" : "Join the Metaphor memo"}
      </button>
      <p className={styles.consent}>One useful systems memo at a time. Unsubscribe whenever you need to.</p>
      {message ? <p className={status === "success" ? styles.success : styles.error} role="status">{message}</p> : null}
    </form>
  );
}
