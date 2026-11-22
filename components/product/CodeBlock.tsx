import type { ReactNode } from "react";

/*
 * A real, readable code panel for the developers page (not a decorative
 * mock-up). Server component. Light token colouring for strings, comments,
 * numbers, JSON keys and a few keywords; everything else is plain text, so
 * screen readers and copy-paste get the exact code.
 */

const TOKEN =
  /((?<![:\w])\/\/[^\n]*|(?<![\w&])#(?![!{])[^\n]*)|("(?:\\.|[^"\\\n])*"(?=\s*:))|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|await|async|function|return|import|from|export|if|else|new|true|false|null|curl|POST|GET|PATCH|DELETE)\b/g;

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of code.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const [text, comment, key, str, num] = m;
    const cls = comment
      ? "text-muted-foreground italic"
      : key
        ? "text-primary-strong"
        : str
          ? "text-success"
          : num
            ? "text-warning"
            : "text-chart-5 font-medium";
    out.push(
      <span key={i++} className={cls}>
        {text}
      </span>,
    );
    last = start + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({ title, language, code }: { title?: string; language?: string; code: string }) {
  const trimmed = code.replace(/^\n+|\s+$/g, "");
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card-2 text-left">
      {title || language ? (
        <figcaption className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
          </span>
          {title ? <span className="ml-1 truncate text-[12.5px] font-medium text-foreground">{title}</span> : null}
          {language ? (
            <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground uppercase">{language}</span>
          ) : null}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] text-foreground" tabIndex={0}>
        <code className={language ? `language-${language}` : undefined}>{highlight(trimmed)}</code>
      </pre>
    </figure>
  );
}
