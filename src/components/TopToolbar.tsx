import { Circle, Sun, Moon } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";

export function TopToolbar() {
  const { language, theme, claudeAvailable, startType, setLanguage, setTheme, setStartType } = useAppStore();
  const dark = theme === "dark";

  return (
    <header className={`relative flex items-center px-3 py-1.5 select-none shrink-0 border-b ${
      dark ? "border-zinc-800" : "border-zinc-200/80"
    }`}>
      <SegBtn
        dark={dark}
        primary
        value={startType}
        options={[
          { value: "normal", label: t(language, "startTypeNormal") },
          { value: "agentView", label: t(language, "startTypeAgentView") },
        ]}
        onChange={(v) => setStartType(v as "normal" | "agentView")}
      />

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <Circle size={6} className={claudeAvailable ? "fill-emerald-500 text-emerald-500" : "fill-red-400 text-red-400"} />
        <span className={`text-xs font-medium ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
          {t(language, claudeAvailable ? "claudeAvailable" : "claudeUnavailable")}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <SegBtn
          dark={dark}
          value={language}
          options={[
            { value: "zh-CN", label: "中文" },
            { value: "en-US", label: "EN" },
          ]}
          onChange={(v) => setLanguage(v as "zh-CN" | "en-US")}
        />
        <ThemeToggle dark={dark} theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

function SegBtn({
  value, options, onChange, dark, primary = false,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  dark: boolean;
  primary?: boolean;
}) {
  return (
    <div className={`inline-flex rounded-md p-0.5 ${
      primary
        ? dark ? "bg-zinc-800 border border-zinc-700/60" : "bg-zinc-200/80 border border-zinc-300/60"
        : dark ? "bg-zinc-800/70" : "bg-zinc-200/70"
    }`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-xs rounded transition-all duration-150 ${
            value === opt.value
              ? primary
                ? "bg-brand-600 text-white shadow-sm font-semibold"
                : dark
                  ? "bg-zinc-700 text-zinc-200 shadow-sm font-medium"
                  : "bg-white text-zinc-700 shadow-sm font-medium"
              : primary
                ? dark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-700"
                : dark
                  ? "text-zinc-500 hover:text-zinc-300"
                  : "text-zinc-500 hover:text-zinc-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ dark, theme, setTheme }: { dark: boolean; theme: string; setTheme: (t: "light" | "dark") => void }) {
  return (
    <div className={`inline-flex rounded-md p-0.5 ${dark ? "bg-zinc-800/70" : "bg-zinc-200/70"}`}>
      <button
        onClick={() => setTheme("light")}
        title="浅色"
        className={`min-w-[34px] py-0.5 rounded transition-all duration-150 flex items-center justify-center ${
          theme === "light"
            ? "bg-white text-zinc-600 shadow-sm"
            : "text-zinc-500 hover:text-zinc-600"
        }`}
      >
        <Sun size={12} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        title="深色"
        className={`min-w-[34px] py-0.5 rounded transition-all duration-150 flex items-center justify-center ${
          theme === "dark"
            ? "bg-zinc-700 text-zinc-200 shadow-sm"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <Moon size={12} />
      </button>
    </div>
  );
}
