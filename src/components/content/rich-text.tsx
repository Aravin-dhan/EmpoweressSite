import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import Image from "next/image";
import Link from "next/link";
import type { Components } from "react-markdown";
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import type { Options as RemarkFootnotesOptions } from "remark-footnotes";
import type { Pluggable } from "unified";
import { InfoBox } from "./info-box";
import { PullQuote } from "./pull-quote";
import { LegalCaseBox } from "./legal-case-box";
import { Citation } from "./citation";
import { InstagramEmbed } from "./instagram-embed";

type GenericElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type ExtendedComponents = Components &
  Record<string, (props: GenericElementProps | any) => ReactElement | null>;

const markdownComponents: ExtendedComponents = {
  a: ({ href, children, ...props }) => {
    if (!href) {
      return <span {...props}>{children}</span>;
    }
    return (
      <Link
        href={href}
        className="font-semibold text-brand-primary underline-offset-4 hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-8 mb-4 scroll-mt-24 font-serif text-3xl font-semibold text-[var(--color-foreground)] !no-underline border-none"
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-6 mb-3 scroll-mt-28 font-serif text-2xl font-semibold text-[var(--color-foreground)] !no-underline border-none"
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      {children}
    </h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 py-4 text-3xl text-center leading-relaxed text-[var(--color-foreground)] opacity-90 font-calligraphy">
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="my-4 list-disc space-y-2 pl-6 text-[var(--color-foreground)]"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="my-4 list-decimal space-y-2 pl-6 text-[var(--color-foreground)]"
    >
      {children}
    </ol>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto border border-[var(--color-border)]">
      <table
        {...props}
        className="w-full divide-y divide-[var(--color-border)]"
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      {...props}
      className="bg-brand-primary/10 px-4 py-3 text-left font-semibold uppercase tracking-wide text-brand-primary"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td {...props} className="px-4 py-3 text-sm text-[var(--color-foreground)]">
      {children}
    </td>
  ),
  img: ({ src, alt }) => {
    const resolvedSrc = typeof src === "string" ? src : undefined;
    if (!resolvedSrc) return null;
    return (
      <div className="my-8 overflow-hidden border border-[var(--color-border)]">
        <Image
          src={resolvedSrc}
          alt={alt ?? ""}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
        />
      </div>
    );
  },
  "info-box": ({ children, ...props }: GenericElementProps) => {
    const attrs = props as Record<string, string | undefined>;
    const variant = (attrs["data-variant"] ?? attrs.variant) as
      | "info"
      | "warning"
      | "success"
      | undefined;
    return (
      <InfoBox title={props.title} variant={variant ?? "info"}>
        {children}
      </InfoBox>
    );
  },
  "pull-quote": ({ children, ...props }: GenericElementProps) => (
    <PullQuote quote={children} attribution={props.title ?? undefined} />
  ),
  "legal-case-box": ({ children, ...props }: GenericElementProps) => {
    const attrs = props as Record<string, string | undefined>;
    return (
      <LegalCaseBox
        title={props.title ?? "Case"}
        citation={attrs["data-citation"]}
        holding={attrs["data-holding"]}
      >
        {children}
      </LegalCaseBox>
    );
  },
  citation: ({ ...props }: GenericElementProps) => {
    const attrs = props as Record<string, string | undefined>;
    return (
      <Citation
        id={attrs["data-id"] ?? "ref"}
        href={attrs["data-href"]}
        label={attrs["data-label"]}
      />
    );
  },
  "instagram-embed": ({ ...props }: GenericElementProps) => {
    const attrs = props as Record<string, string | undefined>;
    return <InstagramEmbed url={attrs["data-url"] ?? ""} caption={attrs["data-caption"]} />;
  },
};

type RichTextProps = {
  content: string;
};

const footnotesPlugin: Pluggable = [
  remarkFootnotes as any,
  { inlineNotes: true } satisfies RemarkFootnotesOptions,
];

export function RichText({ content }: RichTextProps) {
  return (
    <div className="prose prose-lg prose-slate max-w-[72ch] mx-auto dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, footnotesPlugin]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["anchor-link"], ariaHidden: true, tabIndex: -1 },
              content: { type: 'element', tagName: 'span', properties: { className: ['anchor-icon'] }, children: [{ type: 'text', value: '#' }] }
            },
          ],
          rehypePrism,
        ]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
