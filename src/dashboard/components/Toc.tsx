import React from "react";
import { useDocsStore } from "../../store/useDocsStore";

type TocItem = {
  level: number;
  text: string;
  id: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function buildToc(markdown: string | null): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.*)/gm;
  const items: TocItem[] = [];

  if (markdown) {
    let match: RegExpExecArray | null;
    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      items.push({ level, text, id });
    }
  }

  return items;
}

const Toc: React.FC = () => {
  const markdown = useDocsStore((state) => state.current.markdown);

  const toc = React.useMemo(
    () => buildToc(markdown || null),
    [markdown]
  );

  if (!toc.length) return null;

  return (
    <aside className="pt-20 hidden md:flex min-w-64 max-h-screen sticky top-0 overflow-auto">
      <div className="h-max border-l border-border-subtle pl-6 pt-2 pb-8">
        <p className="mb-4 text-xs font-semibold tracking-widest text-text-paragraph">
          ON THIS PAGE
        </p>

        <ul className="space-y-2">
          {toc.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 8}px` }}
            >
              <a
                href={`#${item.id}`}
                className="
                  block
                  py-1
                  text-sm
                  text-slate-400
                  hover:text-accent/60
                  transition-all
                  duration-200
                "
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Toc;
