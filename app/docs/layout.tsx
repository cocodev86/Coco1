import { createPageMetadata } from "@/lib/metadata";
import DocsShell from "./DocsShell";

export const metadata = createPageMetadata({
  title: "Documentation",
  description: "The Metaphor operating system, playbooks, client operations, platform architecture, strategy, templates, and controlled legal resources.",
  path: "/docs",
});

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
