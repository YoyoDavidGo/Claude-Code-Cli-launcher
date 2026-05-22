import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Play } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import { buildClaudeArgs } from "../utils/commandBuilder";

export function LaunchButton() {
  const { language, currentProjectPath, launchMode, provider, presetModel, customModel, bypass, addOrUpdateProject } = useAppStore();
  const [launching, setLaunching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLaunch() {
    if (!currentProjectPath) {
      setErrorMsg(t(language, "selectProjectFirst"));
      return;
    }
    setLaunching(true);
    setErrorMsg("");
    try {
      const args = buildClaudeArgs({ projectPath: currentProjectPath, launchMode, provider, presetModel, customModel, bypass });
      await invoke("launch_claude", { projectPath: currentProjectPath, args });
      addOrUpdateProject(currentProjectPath);
    } catch (e: unknown) {
      const msg = typeof e === "string" ? e : (e as Error)?.message ?? String(e);
      setErrorMsg(msg.includes("directory") ? t(language, "projectNotExist") : t(language, "terminalFailed"));
    } finally {
      setLaunching(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
      <button
        onClick={handleLaunch}
        disabled={launching}
        className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-950/20 hover:bg-brand-500 active:bg-brand-700 transition-colors disabled:opacity-60"
      >
        <Play size={15} fill="white" />
        {launching ? t(language, "launching") : t(language, "launchButton")}
      </button>
    </div>
  );
}
