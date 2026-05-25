import { RefreshCcwDot, RefreshCw } from "lucide-react";
import type { AppLanguage } from "../../types/config";
import { t } from "../../i18n";

type Scope = "common" | "all";

interface Props {
  scope: Scope;
  setScope: (s: Scope) => void;
  onRestore: () => void;
  updatedAt: string | null;
  language: AppLanguage;
}

export function CheatsheetToolbar({ scope, setScope, onRestore, updatedAt, language }: Props) {
  const scopeOptions: { value: Scope; label: string }[] = [
    { value: "common", label: t(language, "cheatsheetScopeCommon") },
    { value: "all", label: t(language, "cheatsheetScopeAll") },
  ];

  return (
    <div className="flex h-8 shrink-0 items-center justify-between border-b border-zinc-200/80 pl-2 pr-3 dark:border-zinc-800">
      <div className="inline-flex rounded-md bg-zinc-200/70 p-0.5 dark:bg-zinc-800/70">
        {scopeOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setScope(opt.value)}
            className={`rounded px-3 py-0.5 text-xs transition-all ${
              scope === opt.value
                ? "bg-white text-zinc-700 shadow-sm dark:bg-zinc-700 dark:text-zinc-200"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {updatedAt && (
          <span className="text-[11px] text-zinc-400 select-none mr-2">{t(language, "cheatsheetUpdated")}{updatedAt.slice(0, 10)}</span>
        )}
        <button
          onClick={onRestore}
          title={t(language, "cheatsheetRestore")}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <RefreshCcwDot size={13} />
          {t(language, "cheatsheetRestore")}
        </button>
        <button
          disabled
          title={t(language, "cheatsheetSync")}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 cursor-not-allowed dark:text-zinc-500"
        >
          <RefreshCw size={13} />
          {t(language, "cheatsheetSync")}
        </button>
      </div>
    </div>
  );
}
