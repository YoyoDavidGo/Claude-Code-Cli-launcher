import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function PermissionSelector() {
  const { language, theme, bypass, setBypass } = useAppStore();
  const dark = theme === "dark";

  return (
    <div className={`rounded-xl border p-2.5 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <h2 className={`text-[13px] font-bold mb-1.5 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
        {t(language, "permissionMode")}
      </h2>
      <label className={`block rounded-lg border px-2.5 py-2 cursor-pointer ${
        dark ? "border-brand-900/80 bg-brand-950/20" : "border-brand-200 bg-brand-50/70"
      }`}>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bypass}
            onChange={(e) => setBypass(e.target.checked)}
            className="accent-[#c86428] h-3.5 w-3.5 shrink-0"
          />
          <span className="text-xs font-bold text-brand-600">
            {t(language, "bypassLabel")}
          </span>
        </div>
      </label>
    </div>
  );
}
