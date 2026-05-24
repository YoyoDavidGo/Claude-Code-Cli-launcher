import { forwardRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { openUrl } from "@tauri-apps/plugin-opener";
import type { AppLanguage, CheatsheetItem } from "../../types/config";
import { t } from "../../i18n";
import { CodeBlockWithCopy } from "./CodeBlockWithCopy";

const mdComponents: Components = {
  pre(props) {
    const child = props.children as { props?: { children?: unknown } } | undefined;
    const raw = child?.props?.children;
    const text = (Array.isArray(raw) ? raw.join("") : String(raw ?? "")).replace(/\n$/, "");
    return <CodeBlockWithCopy text={text} />;
  },
  code(props) {
    const { children } = props;
    return <code className="cheat-inline-code">{children}</code>;
  },
  a(props) {
    const { href, children } = props;
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          if (href) openUrl(href).catch(() => {});
        }}
      >
        {children}
      </a>
    );
  },
};

interface Props {
  items: CheatsheetItem[];
  language: AppLanguage;
}

export const CheatsheetMarkdownView = forwardRef<HTMLDivElement, Props>(
  function CheatsheetMarkdownView({ items, language }, ref) {
    let dividerInserted = false;

    return (
      <div ref={ref} className="markdown-content flex-1 overflow-y-auto px-5 py-3">
        {items.length === 0 && (
          <div className="mt-10 text-center text-sm text-zinc-400">{t(language, "cheatsheetEmpty")}</div>
        )}
        {items.map((item) => {
          const needDivider = !item.isCommon && !dividerInserted;
          if (needDivider) dividerInserted = true;
          return (
            <div key={item.id}>
              {needDivider && (
                <div className="my-5 flex items-center gap-3 text-[11px] text-zinc-400 select-none">
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                  {t(language, "cheatsheetDivider")}
                  <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
                </div>
              )}
              <section id={item.id} className="cheat-item scroll-mt-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {item.markdown}
                </ReactMarkdown>
              </section>
            </div>
          );
        })}
      </div>
    );
  }
);
