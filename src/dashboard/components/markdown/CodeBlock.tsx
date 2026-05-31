import React, { useCallback, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type SyntaxTheme = Record<string, React.CSSProperties>;

const uiDarkSyntax = {
  text: "#dce1e7",
  comment: "#858c96",
  keyword: "#dda07a",
  string: "#7ecf9a",
  number: "#b99bdd",
  boolean: "#8bbad8",
  nullish: "#d78390",
  property: "#91b9e8",
  punctuation: "#c9d0d8",
  operator: "#c9d0d8",
  variable: "#dce1e7",
  type: "#8ccaca",
  attribute: "#d8bc76",
  function: "#b0a6d8",
} as const;

const uiLightSyntax = {
  text: "#27211d",
  comment: "#8b8680",
  keyword: "#b95b22",
  string: "#229452",
  number: "#7a54cf",
  boolean: "#1766c2",
  nullish: "#c9324b",
  property: "#1764c8",
  punctuation: "#433a34",
  operator: "#433a34",
  variable: "#27211d",
  type: "#0f766e",
  attribute: "#b95b22",
  function: "#7048c5",
} as const;

const darkSyntaxTheme: SyntaxTheme = {
  'pre[class*="language-"]': {
    background: "transparent",
    margin: 0,
    padding: 0,
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "#DCE1E7",
    textShadow: "none",
  },
  'code[class*="language-"]': {
    background: "transparent",
    color: "#DCE1E7",
    fontSize: "0.875rem",
    fontWeight: 400,
    textShadow: "none",
  },
  comment: { color: uiDarkSyntax.comment },
  prolog: { color: uiDarkSyntax.comment },
  doctype: { color: uiDarkSyntax.comment },
  cdata: { color: uiDarkSyntax.comment },
  keyword: { color: uiDarkSyntax.keyword },
  string: { color: uiDarkSyntax.string },
  char: { color: uiDarkSyntax.string },
  number: { color: uiDarkSyntax.number },
  boolean: { color: uiDarkSyntax.boolean },
  null: { color: uiDarkSyntax.nullish },
  selector: { color: uiDarkSyntax.nullish },
  property: { color: uiDarkSyntax.property },
  tag: { color: uiDarkSyntax.property },
  "attr-name": { color: uiDarkSyntax.attribute },
  "attr-value": { color: uiDarkSyntax.string },
  "attr-value punctuation": { color: uiDarkSyntax.punctuation },
  punctuation: { color: uiDarkSyntax.punctuation },
  operator: { color: uiDarkSyntax.operator },
  variable: { color: uiDarkSyntax.variable },
  "class-name": { color: uiDarkSyntax.type },
  function: { color: uiDarkSyntax.function },
  builtin: { color: uiDarkSyntax.keyword },
  atrule: { color: uiDarkSyntax.keyword },
  inserted: { color: uiDarkSyntax.string },
  deleted: { color: uiDarkSyntax.nullish },
  important: { color: uiDarkSyntax.keyword },
  namespace: { color: uiDarkSyntax.property },
};

const lightSyntaxTheme: SyntaxTheme = {
  'pre[class*="language-"]': {
    background: "transparent",
    margin: 0,
    padding: 0,
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "#27211D",
    textShadow: "none",
  },
  'code[class*="language-"]': {
    background: "transparent",
    color: "#27211D",
    fontSize: "0.875rem",
    fontWeight: 400,
    textShadow: "none",
  },
  comment: { color: uiLightSyntax.comment },
  prolog: { color: uiLightSyntax.comment },
  doctype: { color: uiLightSyntax.comment },
  cdata: { color: uiLightSyntax.comment },
  keyword: { color: uiLightSyntax.keyword },
  string: { color: uiLightSyntax.string },
  char: { color: uiLightSyntax.string },
  number: { color: uiLightSyntax.number },
  boolean: { color: uiLightSyntax.boolean },
  null: { color: uiLightSyntax.nullish },
  selector: { color: uiLightSyntax.nullish },
  property: { color: uiLightSyntax.property },
  tag: { color: uiLightSyntax.property },
  "attr-name": { color: uiLightSyntax.attribute },
  "attr-value": { color: uiLightSyntax.string },
  "attr-value punctuation": { color: uiLightSyntax.punctuation },
  punctuation: { color: uiLightSyntax.punctuation },
  operator: { color: uiLightSyntax.operator },
  variable: { color: uiLightSyntax.variable },
  "class-name": { color: uiLightSyntax.type },
  function: { color: uiLightSyntax.function },
  builtin: { color: uiLightSyntax.keyword },
  atrule: { color: uiLightSyntax.keyword },
  inserted: { color: uiLightSyntax.string },
  deleted: { color: uiLightSyntax.nullish },
  important: { color: uiLightSyntax.keyword },
  namespace: { color: uiLightSyntax.property },
};

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  children,
  ...props
}) => {
  const raw = String(children ?? "");
  const isMultiline = raw.includes("\n");
  const match = /language-([a-z0-9+-]+)/i.exec(className ?? "");
  const language = normalizeLanguage(match?.[1], raw);
  const isLightTheme = useThemeMode() === "light";

  if (!isMultiline) {
    return (
      <code
        className="leading-[1.8] font-mono text-sm rounded border border-surface-500/20 bg-surface-500/20 px-1.5 py-[0.05rem] text-surface-300"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
      <MultilineCodeBlock
        raw={raw}
        language={language}
        isLightTheme={isLightTheme}
      {...props}
    />
  );
};

function MultilineCodeBlock({
  raw,
  language,
  isLightTheme,
  ...props
}: {
  raw: string;
  language?: string;
  isLightTheme: boolean;
  [key: string]: unknown;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(raw.replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [raw]);

  const customStyle = isLightTheme ? lightSyntaxTheme : darkSyntaxTheme;
  const resolvedLanguage = language || "text";

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-surface-500/60 bg-surface-900/20 p-4">
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="z-20 rounded border border-surface-500/60 bg-surface-900/20 px-2 py-1 text-xs font-medium text-text-paragraph backdrop-blur-sm transition-all duration-200 hover:bg-surface-900/30"
          title="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        {language && (
          <div className="z-20 rounded border border-surface-500/60 bg-surface-900/20 px-2 py-1 font-mono text-xs text-text-muted backdrop-blur-sm">
            {language}
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          style={customStyle}
          language={resolvedLanguage}
          PreTag="div"
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: 0,
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          codeTagProps={{
            style: {
              background: "transparent",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            },
          }}
          showLineNumbers={false}
          wrapLines={false}
          {...props}
        >
          {raw.replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function normalizeLanguage(language: string | undefined, raw: string): string | undefined {
  if (language) {
    const normalized = language.toLowerCase();

    if (normalized === "html" || normalized === "xhtml") return "markup";
    if (normalized === "svg") return "markup";
    return normalized;
  }

  const trimmed = raw.trimStart();
  if (trimmed.startsWith("<?xml") || /^<\/?[A-Za-z_][\w:.-]*(\s|>|\/>)/.test(trimmed)) {
    return "markup";
  }

  return undefined;
}

function useThemeMode(): "light" | "dark" {
  const readTheme = () =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";

  const [theme, setTheme] = useState<"light" | "dark">(readTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
