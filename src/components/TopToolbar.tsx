import { Circle } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import logo from "../assets/logo.png";

export function TopToolbar() {
  const { language, theme, claudeAvailable, setLanguage, setTheme } = useAppStore();
  const dark = theme === "dark";

  return (
    <header className="flex items-center justify-between px-3 py-1.5 select-none shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 overflow-hidden rounded-xl shrink-0">
          <img src={logo} alt="" className="h-full w-full scale-[1.2]" />
        </div>
        <div className="flex items-center gap-1.5">
          <Circle size={7} className={claudeAvailable ? "fill-emerald-500 text-emerald-500" : "fill-red-400 text-red-400"} />
          <span className={`text-xs ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
            {t(language, claudeAvailable ? "claudeAvailable" : "claudeUnavailable")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
            { value: "light", label: "浅色" },
            { value: "dark", label: "深色" },
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
    <div className={`inline-flex rounded-lg border p-0.5 ${dark ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-zinc-50"}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
            value === opt.value
              ? "bg-brand-600 text-white shadow-sm"
              : dark
                ? "text-zinc-400 hover:text-zinc-200"
                : "text-zinc-600 hover:text-zinc-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
