import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  preferred_date: string;
  preferred_time: string;
  timezone?: string;
  project_details: string;
};

type ValidationResult =
  | { valid: true; payload: BookingPayload }
  | { valid: false; message: string };

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validatePayload(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { valid: false, message: "Submit a valid booking request." };
  }

  const input = value as Record<string, unknown>;
  const payload: BookingPayload = {
    name: text(input.name, 100),
    company: text(input.company, 120),
    email: text(input.email, 254),
    phone: text(input.phone, 30),
    service: text(input.service, 100),
    budget: text(input.budget, 100),
    preferred_date: text(input.preferred_date, 10),
    preferred_time: text(input.preferred_time, 100),
    timezone: text(input.timezone, 100),
    project_details: text(input.project_details, 2000),
  };

  if (payload.name.length < 2) return { valid: false, message: "Enter a valid name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return { valid: false, message: "Enter a valid email address." };
  if (!payload.service) return { valid: false, message: "Choose a service." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.preferred_date)) return { valid: false, message: "Choose a valid preferred date." };
  if (!payload.preferred_time) return { valid: false, message: "Choose a preferred time window." };
  if (payload.project_details.length < 10) return { valid: false, message: "Add more project detail." };

  return { valid: true, payload };
}

function currentEnvironment() {
  return process.env.APP_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
}

function isLocalService(url: URL) {
  return url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Booking requests must use JSON." }, { status: 415 });
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Submit a valid booking request." }, { status: 400 });
  }

  const validation = validatePayload(requestBody);
  if (!validation.valid) {
    return NextResponse.json({ ok: false, message: validation.message }, { status: 400 });
  }

  const environment = currentEnvironment();
  const production = environment === "production";
  const mode = process.env.BOOKING_MODE || (production ? "upstream" : "mock");

  if (mode === "mock") {
    const reference = `DEV-${crypto.randomUUID()}`;
    console.info("[booking:mock]", {
      reference,
      environment,
      service: validation.payload.service,
      preferredDate: validation.payload.preferred_date,
    });

    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        reference,
        message: "Development mode: your booking request was simulated. No production data was written and no email was sent.",
      },
      { status: 202 },
    );
  }

  if (mode !== "upstream") {
    return NextResponse.json({ ok: false, message: "The booking service mode is not configured correctly." }, { status: 503 });
  }

  const upstreamValue = process.env.BOOKING_UPSTREAM_URL?.trim();
  if (!upstreamValue) {
    return NextResponse.json({ ok: false, message: "The booking service is not configured for this environment." }, { status: 503 });
  }

  let upstreamUrl: URL;
  try {
    upstreamUrl = new URL(upstreamValue);
  } catch {
    return NextResponse.json({ ok: false, message: "The booking service URL is invalid." }, { status: 503 });
  }

  const allowProductionServices = process.env.ALLOW_PRODUCTION_SERVICES === "true";
  if (!production && !allowProductionServices && !isLocalService(upstreamUrl)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Development is blocked from contacting a non-local booking service. Use mock mode or a local service.",
      },
      { status: 503 },
    );
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const authorization = process.env.BOOKING_UPSTREAM_AUTHORIZATION?.trim();
  if (authorization) headers.Authorization = authorization;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(validation.payload),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      console.error("[booking:upstream-error]", {
        environment,
        status: upstreamResponse.status,
        host: upstreamUrl.hostname,
      });
      return NextResponse.json({ ok: false, message: "The booking service could not accept the request." }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      mode: "upstream",
      message: "Your strategy-call request is in. We’ll review it and send confirmation details to the email you provided.",
    });
  } catch (error) {
    console.error("[booking:upstream-unavailable]", {
      environment,
      host: upstreamUrl.hostname,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ ok: false, message: "The booking service is temporarily unavailable." }, { status: 502 });
  }
}
