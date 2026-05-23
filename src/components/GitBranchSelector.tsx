import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { GitBranch, RefreshCw } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

interface SubdirGitInfo {
  subdir: string;
  current: string;
  branches: string[];
}

export function GitBranchSelector() {
  const {
    language, theme, startType,
    currentProjectPath, config,
    gitBranches, currentGitBranch,
    setGitBranches, setCurrentGitBranch, saveLastBranch,
  } = useAppStore();
  const dark = theme === "dark";
  const [switchMsg, setSwitchMsg] = useState("");
  const [subdirBranches, setSubdirBranches] = useState<SubdirGitInfo[]>([]);
  const [subdirSelected, setSubdirSelected] = useState("");

  const isParentRepo = !!(currentProjectPath && (gitBranches.length > 0 || currentGitBranch !== null));
  const hasSubdirRepos = subdirBranches.length > 0;
  const isRepo = isParentRepo || hasSubdirRepos;

  async function tryRestoreBranch(path: string, branches: string[], currentBranch: string | null) {
    const memMap = startType === "normal" ? config.memoryNormal : config.memoryAgentView;
    const saved = memMap?.[path]?.branch;
    if (!saved || saved === currentBranch || !branches.includes(saved)) return;
    try {
      await invoke("checkout_git_branch", { path, branch: saved });
      setCurrentGitBranch(saved);
    } catch {
      // checkout failed (e.g. uncommitted changes) — keep current branch
    }
  }

  async function loadBranches(path: string) {
    if (!path) return;
    setSwitchMsg("");
    setSubdirBranches([]);
    setSubdirSelected("");

    let parentIsRepo = false;
    let loadedBranches: string[] = [];
    let loadedCurrent: string | null = null;
    try {
      const [branches, current] = await Promise.all([
        invoke<string[]>("get_git_branches", { path }),
        invoke<string | null>("get_current_git_branch", { path }),
      ]);
      setGitBranches(branches);
      setCurrentGitBranch(current);
      loadedBranches = branches;
      loadedCurrent = current;
      parentIsRepo = branches.length > 0 || current !== null;
    } catch {
      setGitBranches([]);
      setCurrentGitBranch(null);
    }

    if (!parentIsRepo) {
      const subdirs = await invoke<SubdirGitInfo[]>("get_subdirs_git_branches", { path })
        .catch(() => [] as SubdirGitInfo[]);
      setSubdirBranches(subdirs);
      const first = subdirs[0];
      if (first) {
        setSubdirSelected(`${first.subdir}/${first.current || first.branches[0]}`);
      }
    } else {
      await tryRestoreBranch(path, loadedBranches, loadedCurrent);
    }
  }

  useEffect(() => {
    setGitBranches([]);
    setCurrentGitBranch(null);
    setSwitchMsg("");
    setSubdirBranches([]);
    setSubdirSelected("");
    if (currentProjectPath) loadBranches(currentProjectPath);
  }, [currentProjectPath]);

  // When mode switches but project stays the same, restore saved branch
  useEffect(() => {
    if (currentProjectPath && isParentRepo) {
      tryRestoreBranch(currentProjectPath, gitBranches, currentGitBranch);
    }
  }, [startType]);

  async function handleSwitch(value: string) {
    if (!currentProjectPath || !value) return;

    if (isParentRepo) {
      if (value === currentGitBranch) return;
      setSwitchMsg("...");
      try {
        await invoke("checkout_git_branch", { path: currentProjectPath, branch: value });
        setCurrentGitBranch(value);
        saveLastBranch(currentProjectPath, value);
        setSwitchMsg(`${t(language, "gitSwitchSuccess")} ${value}`);
        setTimeout(() => setSwitchMsg(""), 2000);
      } catch {
        setSwitchMsg(t(language, "gitSwitchFailed"));
        setTimeout(() => setSwitchMsg(""), 3000);
      }
    } else {
      const slashIdx = value.indexOf("/");
      if (slashIdx === -1) return;
      const subdir = value.substring(0, slashIdx);
      const branch = value.substring(slashIdx + 1);
      const info = subdirBranches.find((s) => s.subdir === subdir);
      if (!info) return;
      if (branch === info.current) {
        setSubdirSelected(value);
        return;
      }
      const subdirPath = `${currentProjectPath}/${subdir}`;
      setSwitchMsg("...");
      try {
        await invoke("checkout_git_branch", { path: subdirPath, branch });
        setSubdirBranches((prev) =>
          prev.map((s) => (s.subdir === subdir ? { ...s, current: branch } : s))
        );
        setSubdirSelected(value);
        setSwitchMsg(`${t(language, "gitSwitchSuccess")} ${subdir}/${branch}`);
        setTimeout(() => setSwitchMsg(""), 2000);
      } catch {
        setSwitchMsg(t(language, "gitSwitchFailed"));
        setTimeout(() => setSwitchMsg(""), 3000);
      }
    }
  }

  const allBranches =
    currentGitBranch && !gitBranches.includes(currentGitBranch)
      ? [currentGitBranch, ...gitBranches]
      : gitBranches;

  const selectCls = `w-full rounded-lg border px-2 py-1 text-xs outline-none appearance-none ${
    isRepo
      ? dark
        ? "border-zinc-700 bg-zinc-950 text-zinc-200"
        : "border-zinc-200 bg-white text-zinc-800"
      : dark
        ? "border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed"
        : "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
  }`;

  return (
    <div className={`rounded-xl border p-2.5 flex flex-col gap-2 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-[13px] font-semibold flex items-center gap-1.5 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
          <GitBranch size={13} className="text-brand-500" />
          {t(language, "gitBranch")}
        </h2>
        {currentProjectPath && isRepo && (
          <button
            onClick={() => loadBranches(currentProjectPath)}
            className={dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}
          >
            <RefreshCw size={12} />
          </button>
        )}
      </div>

      <select
        disabled={!isRepo}
        value={isParentRepo ? (currentGitBranch ?? "") : subdirSelected}
        onChange={(e) => handleSwitch(e.target.value)}
        className={selectCls}
      >
        {!isRepo ? (
          <option value="">{currentProjectPath ? t(language, "gitNotRepo") : "—"}</option>
        ) : isParentRepo ? (
          allBranches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))
        ) : (
          <>
            {subdirBranches.map(({ subdir, branches, current }) =>
              branches.map((b) => (
                <option key={`${subdir}/${b}`} value={`${subdir}/${b}`}>
                  {subdir}/{b}{b === current ? " ★" : ""}
                </option>
              ))
            )}
          </>
        )}
      </select>

      {switchMsg && (
        <p className={`text-xs leading-snug ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{switchMsg}</p>
      )}
      {!isRepo && currentProjectPath && (
        <p className={`text-xs leading-snug ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
          {t(language, "gitNotRepoHint")}
        </p>
      )}
      {!isParentRepo && hasSubdirRepos && !switchMsg && (
        <p className={`text-xs leading-snug ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
          {t(language, "gitSubdirHint")}
        </p>
      )}
    </div>
  );
}
