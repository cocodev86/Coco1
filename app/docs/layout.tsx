import type { ReactNode } from "react";
import DocsShell from "./DocsShell";
import "highlight.js/styles/github-dark.css";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
