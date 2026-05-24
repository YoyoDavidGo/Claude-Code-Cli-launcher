import { Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { AppLanguage, CheatsheetItem, CheatsheetItemType } from "../../types/config";
import { t } from "../../i18n";

interface Props {
  items: CheatsheetItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  setSearch: (v: string) => void;
  typeFilter: CheatsheetItemType;
  setTypeFilter: (v: CheatsheetItemType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  language: AppLanguage;
}

export function CheatsheetSidebar({
  items,
  activeId,
  onSelect,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  collapsed,
  onToggleCollapse,
  language,
}: Props) {
  if (collapsed) {
    return (
      <div className="flex w-10 shrink-0 flex-col items-center border-r border-zinc-200/80 py-2 dark:border-zinc-800">
        <button
          onClick={onToggleCollapse}
          title={t(language, "cheatsheetExpand")}
          className="rounded p-1.5 text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <PanelLeftOpen size={16} />
        </button>
      </div>
    );
  }

  const typeOptions: { value: CheatsheetItemType; label: string }[] = [
    { value: "command", label: t(language, "cheatsheetFilterCommand") },
    { value: "operation", label: t(language, "cheatsheetFilterOperation") },
  ];

  return (
    <div className="flex w-48 shrink-0 flex-col border-r border-zinc-200/80 dark:border-zinc-800">
      <div className="space-y-2 p-2">
        <div className="relative">
          <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(language, "cheatsheetSearchPlaceholder")}
            className="w-full rounded-md border border-zinc-200/80 bg-white py-1 pl-7 pr-2 text-xs text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </div>
        <div className="inline-flex w-full rounded-md bg-zinc-200/70 p-0.5 dark:bg-zinc-800/70">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTypeFilter(opt.value)}
              className={`flex-1 rounded px-1 py-1 text-xs transition-all ${
                typeFilter === opt.value
                  ? "bg-white text-zinc-700 shadow-sm dark:bg-zinc-700 dark:text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-2">
        {items.length === 0 && (
          <div className="px-2 py-4 text-center text-xs text-zinc-400">{t(language, "cheatsheetEmpty")}</div>
        )}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`mb-0.5 block w-full rounded-md px-2 py-1.5 text-left transition-colors ${
              activeId === item.id
                ? "bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
            }`}
          >
            <div className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">{item.title}</div>
            {item.shortNote && (
              <div className="truncate text-[11px] text-zinc-400">{item.shortNote}</div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-1.5 border-t border-zinc-200/80 px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-200"
      >
        <PanelLeftClose size={14} />
        {t(language, "cheatsheetCollapse")}
      </button>
    </div>
  );
}
