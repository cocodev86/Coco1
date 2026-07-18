"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: "Hero CTA Click" | "Pricing CTA Click";
  eventData?: Record<string, string | number | boolean | null>;
  children: ReactNode;
};

export default function TrackedLink({ eventName, eventData, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        track(eventName, eventData);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
