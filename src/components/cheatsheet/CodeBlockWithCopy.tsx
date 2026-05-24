import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useAppStore } from "../../stores/appStore";
import { t } from "../../i18n";

export function CodeBlockWithCopy({ text }: { text: string }) {
  const language = useAppStore((s) => s.language);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="group relative my-2">
      <pre className="overflow-x-auto rounded-md border border-zinc-200/80 bg-zinc-50 px-3 py-2 text-xs leading-relaxed text-zinc-800 dark:border-zinc-700/70 dark:bg-zinc-900 dark:text-zinc-200">
        <code>{text}</code>
      </pre>
      <button
        onClick={copy}
        title={t(language, copied ? "cheatsheetCopied" : "cheatsheetCopy")}
        className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded border border-zinc-200/80 bg-white/90 px-1.5 py-0.5 text-[10px] text-zinc-500 opacity-0 transition-opacity hover:text-zinc-700 group-hover:opacity-100 dark:border-zinc-700/70 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {t(language, copied ? "cheatsheetCopied" : "cheatsheetCopy")}
      </button>
    </div>
  );
}
