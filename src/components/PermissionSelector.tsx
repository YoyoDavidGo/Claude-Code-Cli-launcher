import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function PermissionSelector() {
  const { language, theme, bypass, setBypass } = useAppStore();
  const dark = theme === "dark";

  return (
    <div className={`rounded-xl border p-2.5 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <h2 className={`text-[13px] font-semibold mb-1.5 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
        {t(language, "permissionMode")}
      </h2>
      <label className={`block rounded-lg border px-2.5 py-2 cursor-pointer ${
        dark ? "border-zinc-700/60 bg-zinc-900/40" : "border-zinc-200 bg-zinc-50"
      }`}>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bypass}
            onChange={(e) => setBypass(e.target.checked)}
            className="accent-[#c86428] h-3.5 w-3.5 shrink-0"
          />
          <span className={`text-xs font-medium ${bypass ? "text-brand-600" : dark ? "text-zinc-300" : "text-zinc-700"}`}>
            {t(language, "bypassLabel")}
          </span>
        </div>
      </label>
    </div>
  );
}
