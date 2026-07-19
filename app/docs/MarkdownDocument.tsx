import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { DocEntry } from "@/lib/docs";
import { resolveMarkdownHref } from "@/lib/docs";
import styles from "./docs.module.css";

export default function MarkdownDocument({ doc }: { doc: DocEntry }) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeHighlight]}
        components={{
          a: ({ href, children, ...props }) => {
            const resolved = resolveMarkdownHref(href, doc);
            return resolved.startsWith("/") ? <Link href={resolved} {...props}>{children}</Link> : <a href={resolved} {...props}>{children}</a>;
          },
          table: ({ children }) => <div className={styles.tableWrap}><table>{children}</table></div>,
        }}
      >
        {doc.markdown}
      </ReactMarkdown>
    </div>
  );
}
