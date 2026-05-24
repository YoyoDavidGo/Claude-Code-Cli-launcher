import { useState } from "react";
import { FolderOpen, FolderInput, Star, Pencil, Trash2 } from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { ProjectAliasDialog } from "./ProjectAliasDialog";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { ProjectItem } from "../types/config";

export function ProjectCard() {
  const {
    language, theme, startType,
    currentProjectPath, config,
    setCurrentProjectPath,
    toggleFavorite, deleteProject,
  } = useAppStore();
  const dark = theme === "dark";
  const [tab, setTab] = useState<"recent" | "favorite">("recent");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  async function handleSelectDir() {
    const selected = await open({ directory: true, multiple: false });
    if (selected && typeof selected === "string") {
      setCurrentProjectPath(selected);
    }
  }

  function handleRowClick(project: ProjectItem) {
    setCurrentProjectPath(project.path);
  }

  const activeProjects = startType === "normal" ? (config.projectsNormal ?? []) : (config.projectsAgentView ?? []);
  const recentProjects = [...activeProjects]
    .sort((a, b) => b.lastUsedAt.localeCompare(a.lastUsedAt))
    .slice(0, 20);
  const favoriteProjects = activeProjects.filter((p) => p.isFavorite);
  const shownProjects = tab === "favorite" ? favoriteProjects : recentProjects;

  const dividerCls = dark ? "border-zinc-800" : "border-zinc-200";
  const rowBorderCls = dark ? "border-zinc-800" : "border-zinc-100";

  return (
    <div className={`rounded-xl border p-2.5 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <h2 className={`text-[13px] font-semibold ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
          {t(language, "projectCard")}
        </h2>
        <button
          onClick={() => currentProjectPath && invoke("open_in_explorer", { path: currentProjectPath })}
          disabled={!currentProjectPath}
          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            dark ? "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
          }`}
        >
          <FolderInput size={12} />
          {t(language, "openInExplorer")}
        </button>
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
                  ? "border-brand-700 text-brand-400 bg-[#151718]"
                  : "border-brand-400 text-brand-600 bg-white"
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
        {/* Header — pr-[10px] 补偿滚动条宽度保持列对齐 */}
        <div className={`grid grid-cols-[1.2fr_0.7fr_2fr_68px] text-xs font-semibold pr-[10px] ${
          dark ? "bg-zinc-900 text-zinc-400" : "bg-zinc-50 text-zinc-600"
        }`}>
          <span className={`px-3 py-1.5 border-r ${dividerCls}`}>{t(language, "colFolder")}</span>
          <span className={`px-3 py-1.5 border-r ${dividerCls}`}>{t(language, "colAlias")}</span>
          <span className="px-3 py-1.5">{t(language, "colPath")}</span>
          <span />
        </div>

        {/* Rows — 4 visible rows, overflow-y-scroll 滚动条始终占位保持对齐 */}
        <div className="h-[116px] overflow-y-scroll">
          {shownProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleRowClick(project)}
              className={`w-full grid grid-cols-[1.2fr_0.7fr_2fr_68px] h-[29px] text-left text-xs border-t transition-colors ${rowBorderCls} ${
                currentProjectPath === project.path
                  ? dark ? "bg-brand-950/35" : "bg-brand-50"
                  : dark ? "hover:bg-zinc-900/60" : "hover:bg-zinc-50"
              }`}
            >
              <span className={`px-3 h-full flex items-center font-medium truncate border-r ${dividerCls} ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
                {project.folderName}
              </span>
              <span className={`px-3 h-full flex items-center truncate border-r ${dividerCls} ${
                project.alias
                  ? dark ? "text-zinc-300" : "text-zinc-700"
                  : dark ? "text-zinc-600" : "text-zinc-400"
              }`}>
                {project.alias}
              </span>
              <span className={`px-3 h-full flex items-center font-mono truncate ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
                {project.path}
              </span>
              <span className="h-full flex justify-end items-center gap-2 pr-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => deleteProject(project.id)} title={t(language, "deleteProject")}>
                  <Trash2 size={13} className="text-zinc-400 hover:text-red-500" />
                </button>
                <button onClick={() => setEditingProject(project)} title={t(language, "editAlias")}>
                  <Pencil size={13} className={dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"} />
                </button>
                <button onClick={() => toggleFavorite(project.id)} title={t(language, project.isFavorite ? "unfavorite" : "favoriteProject")}>
                  <Star size={13} className={project.isFavorite ? "fill-brand-500 text-brand-500" : dark ? "text-zinc-500" : "text-zinc-400"} />
                </button>
              </span>
            </button>
          ))}
          {Array.from({ length: Math.max(0, 4 - shownProjects.length) }).map((_, i) => (
            <div
              key={`filler-${i}`}
              className={`grid grid-cols-[1.2fr_0.7fr_2fr_68px] border-t ${rowBorderCls}`}
            >
              <div className={`h-[29px] border-r ${dividerCls}`} />
              <div className={`h-[29px] border-r ${dividerCls}`} />
              <div className="h-[29px]" />
              <div />
            </div>
          ))}
        </div>
      </div>

      <ProjectAliasDialog project={editingProject} onClose={() => setEditingProject(null)} />
    </div>
  );
}
