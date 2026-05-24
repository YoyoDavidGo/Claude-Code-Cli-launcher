import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import type { PermissionMode } from "../types/config";

const MODES: PermissionMode[] = ["default", "auto", "bypass"];

export function PermissionSelector() {
  const { language, theme, permissionMode, setPermissionMode } = useAppStore();
  const dark = theme === "dark";

  const labels: Record<PermissionMode, string> = {
    default: t(language, "permModeDefault"),
    auto: t(language, "permModeAuto"),
    bypass: t(language, "permModeBypass"),
  };

  return (
    <div className={`rounded-xl border p-2.5 flex flex-col gap-2 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <h2 className={`text-[13px] font-semibold ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
        {t(language, "permissionMode")}
      </h2>
      {MODES.map((mode) => (
        <label key={mode} className="flex items-center gap-2.5 h-[26px] cursor-pointer">
          <input
            type="radio"
            name="permissionMode"
            value={mode}
            checked={permissionMode === mode}
            onChange={() => setPermissionMode(mode)}
            className="accent-[#c86428] h-3.5 w-3.5 shrink-0 dark:[color-scheme:dark]"
          />
          <span className={`text-xs whitespace-nowrap ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
            {labels[mode]}
          </span>
        </label>
      ))}
    </div>
  );
}
