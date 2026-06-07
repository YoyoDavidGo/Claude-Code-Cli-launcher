import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { TopToolbar } from "./components/TopToolbar";
import { ProjectCard } from "./components/ProjectCard";
import { GitBranchSelector } from "./components/GitBranchSelector";
import { LaunchModeSelector } from "./components/LaunchModeSelector";
import { ModelSelector } from "./components/ModelSelector";
import { PermissionSelector } from "./components/PermissionSelector";
import { CommandPreview } from "./components/CommandPreview";
import { LaunchButton } from "./components/LaunchButton";
import { TerminalButton } from "./components/TerminalButton";
import { CheatsheetTab } from "./components/cheatsheet/CheatsheetTab";
import { useAppStore } from "./stores/appStore";

export default function App() {
  const { theme, activeView, startType, loadConfig, setClaudeAvailable } = useAppStore();
  const dark = theme === "dark";

  useEffect(() => {
    loadConfig();
    invoke<boolean>("check_claude_available")
      .then(setClaudeAvailable)
      .catch(() => setClaudeAvailable(false));
  }, []);

  return (
    <div className={`flex flex-col h-screen ${dark ? "bg-[#0d0e0f] text-zinc-200" : "bg-[#f7f5f2] text-zinc-900"}`}>
      <TopToolbar />
      {activeView === "cheatsheet" ? (
        <CheatsheetTab />
      ) : (
        <div className="flex-1 overflow-hidden flex flex-col pt-0 px-2.5 pb-2 space-y-1">
          <ProjectCard />
          <div className="grid grid-cols-[27fr_20fr_20fr_33fr] gap-1.5">
            <GitBranchSelector />
            <PermissionSelector />
            <LaunchModeSelector />
            <ModelSelector />
          </div>
          <CommandPreview />
          <div className="relative flex justify-between items-center mt-1">
            {startType === "normal" ? <TerminalButton /> : <div />}
            <LaunchButton />
          </div>
        </div>
      )}
    </div>
  );
}
