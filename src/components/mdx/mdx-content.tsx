type MDXContentProps = {
  source: string;
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg prose-slate max-w-none whitespace-pre-wrap dark:prose-invert">
      {source}
    </div>
  );
}
