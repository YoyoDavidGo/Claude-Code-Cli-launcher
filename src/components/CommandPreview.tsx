import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import { buildCommandPreview } from "../utils/commandBuilder";

export function CommandPreview() {
  const { language, theme, currentProjectPath, startType, launchMode, provider, presetModel, customModel, bypass } = useAppStore();
  const dark = theme === "dark";
  const [copied, setCopied] = useState(false);

  const command = buildCommandPreview({ projectPath: currentProjectPath, startType, launchMode, provider, presetModel, customModel, bypass });

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={`rounded-xl border p-2.5 h-full ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <h2 className={`text-[13px] font-semibold mb-1.5 ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
        {t(language, "commandPreview")}
      </h2>
      <div className="flex gap-2">
        <div className={`flex-1 rounded-lg border px-2.5 py-1.5 font-mono text-xs whitespace-nowrap overflow-x-auto ${
          dark ? "border-zinc-700 bg-zinc-950 text-zinc-300" : "border-zinc-200 bg-zinc-50 text-zinc-700"
        }`}>
          {command}
        </div>
        <button
          onClick={handleCopy}
          title={t(language, "copyCommand")}
          className={`rounded-lg border px-2 flex items-center shrink-0 transition-colors ${
            dark ? "border-zinc-700 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          {copied
            ? <Check size={14} className="text-emerald-500" />
            : <Copy size={14} className="text-brand-600" />}
        </button>
      </div>
    </div>
  );
}
