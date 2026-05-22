import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { GitBranch, RefreshCw } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function GitBranchSelector() {
  const {
    language, theme,
    currentProjectPath,
    gitBranches, currentGitBranch,
    setGitBranches, setCurrentGitBranch,
  } = useAppStore();
  const dark = theme === "dark";
  const [switchMsg, setSwitchMsg] = useState("");

  async function loadBranches(path: string) {
    if (!path) return;
    setSwitchMsg("");
    try {
      const [branches, current] = await Promise.all([
        invoke<string[]>("get_git_branches", { path }),
        invoke<string | null>("get_current_git_branch", { path }),
      ]);
      setGitBranches(branches);
      setCurrentGitBranch(current);
    } catch {
      setGitBranches([]);
      setCurrentGitBranch(null);
    }
  }

  useEffect(() => {
    setGitBranches([]);
    setCurrentGitBranch(null);
    setSwitchMsg("");
    if (currentProjectPath) loadBranches(currentProjectPath);
  }, [currentProjectPath]);

  async function handleSwitch(branch: string) {
    if (!currentProjectPath || branch === currentGitBranch) return;
    setSwitchMsg("...");
    try {
      await invoke("checkout_git_branch", { path: currentProjectPath, branch });
      setCurrentGitBranch(branch);
      setSwitchMsg(`${t(language, "gitSwitchSuccess")} ${branch}`);
      setTimeout(() => setSwitchMsg(""), 2000);
    } catch {
      setSwitchMsg(t(language, "gitSwitchFailed"));
      setTimeout(() => setSwitchMsg(""), 3000);
    }
  }

  const isRepo = currentProjectPath && (gitBranches.length > 0 || currentGitBranch !== null);
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
        <h2 className={`text-xs font-bold flex items-center gap-1.5 ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
          <GitBranch size={13} className="text-orange-600" />
          {t(language, "gitBranch")}
        </h2>
        {currentProjectPath && isRepo && (
          <button onClick={() => loadBranches(currentProjectPath)} className={dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}>
            <RefreshCw size={12} />
          </button>
        )}
      </div>

      <select
        disabled={!isRepo}
        value={isRepo ? (currentGitBranch ?? "") : ""}
        onChange={(e) => handleSwitch(e.target.value)}
        className={selectCls}
      >
        {!isRepo ? (
          <option value="">{currentProjectPath ? t(language, "gitNotRepo") : "—"}</option>
        ) : (
          allBranches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))
        )}
      </select>

      {switchMsg && (
        <p className={`text-xs leading-snug ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{switchMsg}</p>
      )}
    </div>
  );
}
