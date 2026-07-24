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
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight]}
        urlTransform={(url) => resolveMarkdownHref(url, doc)}
      >
        {doc.markdown}
      </ReactMarkdown>
    </div>
  );
}
