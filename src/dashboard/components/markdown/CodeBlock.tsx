import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const availableThemes = {
  dracula
};

interface CodeBlockProps {
  node?: any;
  className?: string;
  children?: React.ReactNode;
  inline?: boolean;
  theme?: keyof typeof availableThemes;
  [key: string]: any;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  node,
  className,
  children,
  inline,
  theme = 'dracula',
  ...props
}) => {
  const raw = String(children ?? "");
  const isMultiline = raw.includes("\n");
  const match = /language-(\w+)/.exec(className ?? "");
  const language = match?.[1];

  // Inline code styling (preserves your existing styles)
  if (!isMultiline) {
    return (
      <code
        className="font-mono text-sm px-1.5 py-0.5 rounded bg-white/10 text-zinc-300/80"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Code block with syntax highlighting + copy button
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(raw.replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [raw]);

  const codeStyle = availableThemes[theme as keyof typeof availableThemes];

  // Custom style to override theme background and maintain your border/bg
  const customStyle = {
    ...codeStyle,
    'pre[class*="language-"]': {
      ...codeStyle['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: 0,
      border: 'none',
    },
    'code[class*="language-"]': {
      ...codeStyle['code[class*="language-"]'],
      background: 'transparent',
    }
  };

  return (
    <div className="my-4 rounded-lg bg-zinc-900/50 p-4 overflow-hidden border border-zinc-800 relative group">

      <div className='absolute top-2 right-2 flex gap-2'>
        {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="px-2 py-1 bg-zinc-800/90 hover:bg-zinc-700 text-text-paragraph text-xs font-medium rounded border border-zinc-700/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
        title="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {/* Language badge - positioned outside the scrollable area */}
      {language && (
        <div className="px-2 py-1 bg-zinc-800/90 text-xs text-zinc-400 font-mono rounded border border-zinc-700/50 backdrop-blur-sm z-20">
          {language}
        </div>
      )}
      </div>

      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          style={customStyle}
          language={language || 'text'}
          PreTag="div"
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              background: 'transparent',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }
          }}
          showLineNumbers={false}
          wrapLines={false}
          {...props}
        >
          {raw.replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};