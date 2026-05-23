import { Circle } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function TopToolbar() {
  const { language, theme, claudeAvailable, startType, setLanguage, setTheme, setStartType } = useAppStore();
  const dark = theme === "dark";

  return (
    <header className="relative flex items-center px-3 py-1 select-none shrink-0">
      <SegBtn
        dark={dark}
        value={startType}
        options={[
          { value: "normal", label: t(language, "startTypeNormal") },
          { value: "agentView", label: t(language, "startTypeAgentView") },
        ]}
        onChange={(v) => setStartType(v as "normal" | "agentView")}
      />
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <Circle size={7} className={claudeAvailable ? "fill-emerald-500 text-emerald-500" : "fill-red-400 text-red-400"} />
        <span className={`text-[13px] font-bold ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
          {t(language, claudeAvailable ? "claudeAvailable" : "claudeUnavailable")}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <SegBtn
          dark={dark}
          value={language}
          options={[
            { value: "zh-CN", label: "中文" },
            { value: "en-US", label: "EN" },
          ]}
          onChange={(v) => setLanguage(v as "zh-CN" | "en-US")}
        />
        <SegBtn
          dark={dark}
          value={theme}
          options={[
            { value: "light", label: t(language, "themeLight") },
            { value: "dark", label: t(language, "themeDark") },
          ]}
          onChange={(v) => setTheme(v as "light" | "dark")}
        />
      </div>
    </header>
  );
}

function SegBtn({
  value, options, onChange, dark,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  dark: boolean;
}) {
  return (
    <div className={`inline-flex rounded-lg p-0.5 my-0.5 ${
      dark
        ? "bg-white/[0.06] border border-white/[0.08]"
        : "bg-black/[0.05] border border-black/[0.07]"
    }`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-0.5 text-xs font-medium rounded-md transition-all ${
            value === opt.value
              ? dark
                ? "bg-brand-600/40 text-brand-300 shadow-sm"
                : "bg-brand-600/15 text-brand-700 shadow-sm"
              : dark
                ? "text-zinc-500 hover:text-zinc-300"
                : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
