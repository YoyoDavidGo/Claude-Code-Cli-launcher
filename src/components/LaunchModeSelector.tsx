import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { LaunchMode } from "../types/config";

const MODES: LaunchMode[] = ["new", "continue", "resume"];

export function LaunchModeSelector() {
  const { language, theme, launchMode, setLaunchMode } = useAppStore();
  const dark = theme === "dark";

  const labels: Record<LaunchMode, string> = {
    new: t(language, "modeNew"),
    continue: t(language, "modeContinue"),
    resume: t(language, "modeResume"),
  };

  return (
    <div className={`rounded-xl border p-2.5 flex flex-col gap-2 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <h2 className={`text-xs font-bold ${dark ? "text-zinc-100" : "text-zinc-900"}`}>
        {t(language, "launchMode")}
      </h2>
      {MODES.map((mode) => (
        <label key={mode} className="flex items-center gap-2.5 h-[26px] cursor-pointer">
          <input
            type="radio"
            name="launchMode"
            value={mode}
            checked={launchMode === mode}
            onChange={() => setLaunchMode(mode)}
            className="accent-orange-600 h-3.5 w-3.5 shrink-0"
          />
          <span className={`text-xs ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
            {labels[mode]}
          </span>
        </label>
      ))}
    </div>
  );
}
