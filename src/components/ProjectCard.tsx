import { useState } from "react";
import { FolderOpen, Star, Pencil, Trash2 } from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { ProjectAliasDialog } from "./ProjectAliasDialog";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { ProjectItem } from "../types/config";

export function ProjectCard() {
  const {
    language, theme,
    currentProjectPath, config,
    setCurrentProjectPath, addOrUpdateProject,
    toggleFavorite, deleteProject,
  } = useAppStore();
  const dark = theme === "dark";
  const [tab, setTab] = useState<"recent" | "favorite">("recent");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  async function handleSelectDir() {
    const selected = await open({ directory: true, multiple: false });
    if (selected && typeof selected === "string") {
      setCurrentProjectPath(selected);
      addOrUpdateProject(selected);
    }
  }

  function handleRowClick(project: ProjectItem) {
    setCurrentProjectPath(project.path);
    addOrUpdateProject(project.path);
  }

  const recentProjects = [...config.projects]
    .sort((a, b) => b.lastUsedAt.localeCompare(a.lastUsedAt))
    .slice(0, 20);
  const favoriteProjects = config.projects.filter((p) => p.isFavorite);
  const shownProjects = tab === "favorite" ? favoriteProjects : recentProjects;

  const dividerCls = dark ? "border-zinc-800" : "border-zinc-200";
  const rowBorderCls = dark ? "border-zinc-800" : "border-zinc-100";

  return (
    <div className={`rounded-xl border p-2.5 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <h2 className={`text-xs font-bold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
          {t(language, "projectCard")}
        </h2>
      </div>

      {/* Path input */}
      <div className="flex gap-2 mb-1.5">
        <div className={`flex-1 rounded-lg border px-3 py-1.5 text-xs truncate ${
          dark ? "border-zinc-700 bg-zinc-950 text-zinc-300" : "border-zinc-200 bg-zinc-50 text-zinc-700"
        }`}>
          {currentProjectPath || <span className={dark ? "text-zinc-500" : "text-zinc-400"}>{t(language, "noProjectSelected")}</span>}
        </div>
        <button
          onClick={handleSelectDir}
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors shrink-0 ${
            dark ? "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
          }`}
        >
          <FolderOpen size={13} />
          {t(language, "selectDir")}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-0">
        {(["recent", "favorite"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-1 text-xs font-semibold rounded-t-lg border-x border-t transition-colors ${
              tab === key
                ? dark
                  ? "border-orange-700 text-orange-400 bg-[#151718]"
                  : "border-orange-400 text-orange-600 bg-white"
                : dark
                  ? "border-zinc-800 text-zinc-500 bg-zinc-900/50"
                  : "border-zinc-200 text-zinc-500 bg-zinc-50"
            }`}
          >
            {t(language, key === "recent" ? "tabRecent" : "tabFavorite")}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`rounded-b-lg rounded-tr-lg border overflow-hidden ${dark ? "border-zinc-800" : "border-zinc-200"}`}>
        {/* Header */}
        <div className={`grid grid-cols-[1.2fr_0.7fr_2fr_68px] text-xs font-semibold ${
          dark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-50 text-zinc-600"
        }`}>
          <span className={`px-3 py-1.5 border-r ${dividerCls}`}>{t(language, "colFolder")}</span>
          <span className={`px-3 py-1.5 border-r ${dividerCls}`}>{t(language, "colAlias")}</span>
          <span className="px-3 py-1.5">{t(language, "colPath")}</span>
          <span />
        </div>

        {/* Rows — fixed 3 visible rows, fillers when fewer */}
        <div className="h-[87px] overflow-y-auto">
          {shownProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleRowClick(project)}
              className={`w-full grid grid-cols-[1.2fr_0.7fr_2fr_68px] items-center text-left text-xs border-t transition-colors ${rowBorderCls} ${
                currentProjectPath === project.path
                  ? dark ? "bg-orange-950/35" : "bg-orange-50"
                  : dark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"
              }`}
            >
              <span className={`px-3 py-1.5 font-medium truncate border-r ${dividerCls} ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
                {project.folderName}
              </span>
              <span className={`px-3 py-1.5 truncate border-r ${dividerCls} ${
                project.alias
                  ? dark ? "text-zinc-300" : "text-zinc-700"
                  : dark ? "text-zinc-600" : "text-zinc-400"
              }`}>
                {project.alias}
              </span>
              <span className={`px-3 py-1.5 font-mono truncate ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
                {project.path}
              </span>
              <span className="flex justify-end gap-2 pr-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => toggleFavorite(project.id)} title={t(language, project.isFavorite ? "unfavorite" : "favoriteProject")}>
                  <Star size={13} className={project.isFavorite ? "fill-orange-500 text-orange-500" : dark ? "text-zinc-500" : "text-zinc-400"} />
                </button>
                <button onClick={() => setEditingProject(project)} title={t(language, "editAlias")}>
                  <Pencil size={13} className={dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"} />
                </button>
                <button onClick={() => deleteProject(project.id)} title={t(language, "deleteProject")}>
                  <Trash2 size={13} className="text-zinc-400 hover:text-red-500" />
                </button>
              </span>
            </button>
          ))}
          {Array.from({ length: Math.max(0, 3 - shownProjects.length) }).map((_, i) => (
            <div
              key={`filler-${i}`}
              className={`grid grid-cols-[1.2fr_0.7fr_2fr_68px] border-t ${rowBorderCls}`}
            >
              <div className={`h-[28px] border-r ${dividerCls}`} />
              <div className={`h-[28px] border-r ${dividerCls}`} />
              <div className="h-[28px]" />
              <div />
            </div>
          ))}
        </div>
      </div>

      <ProjectAliasDialog project={editingProject} onClose={() => setEditingProject(null)} />
    </div>
  );
}
