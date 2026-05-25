import { useEffect, useMemo, useState } from "react";
import type { CheatsheetDoc, CheatsheetItemType } from "../../types/config";
import { useAppStore } from "../../stores/appStore";
import { t } from "../../i18n";
import { loadCheatsheet, restoreCheatsheetDefault } from "../../utils/cheatsheetService";
import { CheatsheetToolbar } from "./CheatsheetToolbar";
import { CheatsheetSidebar } from "./CheatsheetSidebar";
import { CheatsheetMarkdownView } from "./CheatsheetMarkdownView";
import "./markdown-content.css";

type Scope = "common" | "all";

export function CheatsheetTab() {
  const language = useAppStore((s) => s.language);

  const [doc, setDoc] = useState<CheatsheetDoc | null>(null);
  const [error, setError] = useState(false);
  const [scope, setScope] = useState<Scope>("common");
  const [typeFilter, setTypeFilter] = useState<CheatsheetItemType>("command");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCheatsheet(language)
      .then((d) => alive && (setDoc(d), setError(false)))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [language]);

  const filtered = useMemo(() => {
    if (!doc) return [];
    const q = search.trim().toLowerCase();
    return doc.items.filter((it) => {
      if (it.type !== typeFilter) return false;
      if (scope === "common" && !it.isCommon) return false;
      if (q) {
        const hay = `${it.title}\n${it.shortNote}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [doc, scope, typeFilter, search]);

  const onSelect = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const restore = () => {
    restoreCheatsheetDefault(language)
      .then((d) => (setDoc(d), setError(false)))
      .catch(() => setError(true));
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <CheatsheetToolbar
        scope={scope}
        setScope={setScope}
        onRestore={restore}
        updatedAt={doc?.meta?.updatedAt ?? null}
        language={language}
      />
      <div className="flex min-h-0 flex-1">
        <CheatsheetSidebar
          items={filtered}
          activeId={activeId}
          onSelect={onSelect}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          language={language}
        />
        {error ? (
          <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
            {t(language, "cheatsheetLoadError")}
          </div>
        ) : (
          <CheatsheetMarkdownView items={filtered} language={language} />
        )}
      </div>
    </div>
  );
}
