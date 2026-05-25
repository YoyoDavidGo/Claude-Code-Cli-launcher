import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Terminal } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function TerminalButton() {
  const { language, currentProjectPath, gitBranches, currentGitBranch, subdirBranches, subdirSelected } = useAppStore();
  const [errorMsg, setErrorMsg] = useState("");

  async function handleOpen() {
    if (!currentProjectPath) {
      setErrorMsg(t(language, "selectProjectFirst"));
      return;
    }
    setErrorMsg("");

    const isParentRepo = gitBranches.length > 0 || currentGitBranch !== null;
    let terminalPath = currentProjectPath;
    if (!isParentRepo && subdirBranches.length > 0 && subdirSelected) {
      const slashIdx = subdirSelected.indexOf("/");
      if (slashIdx !== -1) {
        terminalPath = `${currentProjectPath}/${subdirSelected.substring(0, slashIdx)}`;
      }
    }

    try {
      await invoke("open_terminal", { projectPath: terminalPath });
    } catch {
      setErrorMsg(t(language, "terminalFailed"));
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2.5 rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-950/20 hover:bg-brand-500 active:bg-brand-700 transition-colors"
      >
        <Terminal size={15} strokeWidth={2.5} />
        {t(language, "openTerminal")}
      </button>
    </div>
  );
}
