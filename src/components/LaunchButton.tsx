import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Play } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import { buildClaudeArgs } from "../utils/commandBuilder";

export function LaunchButton() {
  const { language, theme, claudeAvailable, currentProjectPath, launchMode, provider, presetModel, customModel, bypass, addOrUpdateProject } = useAppStore();
  const dark = theme === "dark";
  const [launching, setLaunching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showNotReady, setShowNotReady] = useState(false);

  async function handleLaunch() {
    if (!claudeAvailable) {
      setShowNotReady(true);
      return;
    }
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
    <>
      {showNotReady && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowNotReady(false)}
        >
          <div
            className={`rounded-2xl shadow-2xl p-6 max-w-xs w-full mx-4 ${dark ? "bg-[#1a1b1e] text-zinc-200" : "bg-white text-zinc-800"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold mb-2">{t(language, "claudeNotReadyTitle")}</h3>
            <p className={`text-xs leading-relaxed whitespace-pre-line mb-4 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(language, "claudeNotReadyMsg")}
            </p>
            <button
              onClick={() => setShowNotReady(false)}
              className="w-full py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors"
            >
              {t(language, "closeDialog")}
            </button>
          </div>
        </div>
      )}
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
    </>
  );
}
