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
import { useAppStore } from "./stores/appStore";

export default function App() {
  const { theme, loadConfig, setClaudeAvailable } = useAppStore();
  const dark = theme === "dark";

  useEffect(() => {
    loadConfig();
    invoke<boolean>("check_claude_available")
      .then(setClaudeAvailable)
      .catch(() => setClaudeAvailable(false));
  }, []);

  return (
    <div className={`flex flex-col h-screen ${dark ? "bg-[#0d0e0f] text-zinc-100" : "bg-[#f7f5f2] text-zinc-900"}`}>
      <TopToolbar />
      <div className="flex-1 overflow-y-auto pt-1 px-2.5 pb-2.5 space-y-1.5">
        <ProjectCard />
        <div className="grid grid-cols-[0.78fr_0.9fr_1.32fr] gap-1.5">
          <GitBranchSelector />
          <LaunchModeSelector />
          <ModelSelector />
        </div>
        <div className="grid grid-cols-[0.78fr_0.9fr_1.32fr] gap-1.5 items-stretch">
          <PermissionSelector />
          <div className="col-span-2">
            <CommandPreview />
          </div>
        </div>
        <div className="flex justify-end">
          <LaunchButton />
        </div>
      </div>
    </div>
  );
}
