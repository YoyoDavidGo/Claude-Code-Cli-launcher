import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { ProjectItem } from "../types/config";

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectAliasDialog({ project, onClose }: Props) {
  const { language, theme, updateAlias } = useAppStore();
  const dark = theme === "dark";
  const [alias, setAlias] = useState("");

  useEffect(() => {
    if (project) setAlias(project.alias);
  }, [project]);

  if (!project) return null;

  function handleSave() {
    if (project) updateAlias(project.id, alias.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-[480px] mx-4 rounded-2xl border p-6 shadow-2xl ${
        dark ? "border-zinc-700 bg-[#1b1d1f]" : "border-zinc-200 bg-white"
      }`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className={`text-base font-bold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
            {t(language, "editAliasTitle")}
          </h3>
          <button onClick={onClose} className={`${dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-xs font-medium mb-1 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(language, "colPath")}
            </label>
            <div className={`rounded-lg border px-3 py-2 text-xs font-mono ${
              dark ? "border-zinc-700 bg-zinc-950 text-zinc-400" : "border-zinc-200 bg-zinc-50 text-zinc-500"
            }`}>
              {project.path}
            </div>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
              {t(language, "aliasLabel")}
            </label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder={t(language, "aliasPlaceholder")}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                dark
                  ? "border-orange-900/70 bg-zinc-950 text-zinc-100 placeholder:text-zinc-600 focus:border-orange-600"
                  : "border-orange-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-1.5 text-sm rounded-lg border font-medium transition-colors ${
              dark ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {t(language, "cancel")}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-500 transition-colors"
          >
            {t(language, "save")}
          </button>
        </div>
      </div>
    </div>
  );
}
