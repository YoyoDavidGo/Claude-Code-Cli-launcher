import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { LaunchMode } from "../types/config";

const MODES: LaunchMode[] = ["new", "continue", "resume"];

export function LaunchModeSelector() {
  const { language, theme, launchMode, startType, setLaunchMode } = useAppStore();
  const dark = theme === "dark";
  const disabled = startType === "agentView";

  const labels: Record<LaunchMode, string> = {
    new: t(language, "modeNew"),
    continue: t(language, "modeContinue"),
    resume: t(language, "modeResume"),
  };

  return (
    <div className={`rounded-xl border p-2.5 flex flex-col gap-2 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <h2 className={`text-[13px] font-bold shrink-0 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
          {t(language, "launchMode")}
        </h2>
        {disabled && (
          <span className={`text-[10px] leading-tight text-right ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            {t(language, "launchModeAgentViewHint")}
          </span>
        )}
      </div>
      {MODES.map((mode) => (
        <label key={mode} className={`flex items-center gap-2.5 h-[26px] ${disabled ? "cursor-not-allowed opacity-35" : "cursor-pointer"}`}>
          <input
            type="radio"
            name="launchMode"
            value={mode}
            checked={launchMode === mode}
            onChange={() => setLaunchMode(mode)}
            disabled={disabled}
            className="accent-[#c86428] h-3.5 w-3.5 shrink-0"
          />
          <span className={`text-xs ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
            {labels[mode]}
          </span>
        </label>
      ))}
    </div>
  );
}
