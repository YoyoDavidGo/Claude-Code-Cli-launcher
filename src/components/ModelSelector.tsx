import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { t } from "../i18n";
import { MODEL_PRESETS, PROVIDERS } from "../utils/modelPresets";
import type { Provider } from "../types/config";

export function ModelSelector() {
  const { language, theme, provider, presetModel, customModel, gatewayModels, settingsModels, currentProjectPath, syncClaudeSettings, setProvider, setPresetModel, setCustomModel } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await syncClaudeSettings(currentProjectPath).catch(() => {});
    setRefreshing(false);
  }
  const dark = theme === "dark";
  const presets = settingsModels.length > 0
    ? settingsModels
    : provider === "Other" && gatewayModels.length > 0
      ? gatewayModels
      : MODEL_PRESETS[provider];

  function handleProviderChange(value: string) {
    const p = value as Provider;
    setProvider(p);
    setPresetModel(MODEL_PRESETS[p]?.[0] ?? "");
    setCustomModel("");
  }

  const rowCls = "grid grid-cols-[90px_1fr] items-center gap-2 h-[26px]";
  const labelCls = `text-xs font-medium truncate ${dark ? "text-zinc-300" : "text-zinc-700"}`;
  const selectCls = `w-full h-full rounded-lg border px-2 text-xs outline-none appearance-none ${
    dark ? "border-zinc-700 bg-zinc-950 text-zinc-200" : "border-zinc-200 bg-white text-zinc-800"
  }`;
  const inputCls = `w-full h-full rounded-lg border px-2 text-xs outline-none transition-colors ${
    dark
      ? "border-zinc-700 bg-zinc-950 text-zinc-200 placeholder:text-zinc-600 focus:border-brand-600"
      : "border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-400 focus:border-brand-500"
  }`;

  return (
    <div className={`rounded-xl border p-2.5 flex flex-col gap-2 ${dark ? "border-zinc-800 bg-[#151718]" : "border-zinc-200 bg-white"}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-[13px] font-semibold ${dark ? "text-zinc-200" : "text-zinc-800"}`}>
          {t(language, "modelConfig")}
        </h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          title={t(language, "refreshModel")}
          className={`transition-colors disabled:opacity-40 ${dark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      <div className={rowCls}>
        <label className={labelCls}>{t(language, "provider")}</label>
        <select value={provider} onChange={(e) => handleProviderChange(e.target.value)} className={selectCls}>
          {PROVIDERS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className={rowCls}>
        <label className={labelCls}>{t(language, "presetModel")}</label>
        <select
          value={presetModel}
          onChange={(e) => setPresetModel(e.target.value)}
          disabled={presets.length === 0}
          className={`${selectCls} ${presets.length === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          <option value="">{t(language, "noModel")}</option>
          {presets.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className={rowCls}>
        <label className={labelCls}>{t(language, "customModel")}</label>
        <input
          value={customModel}
          onChange={(e) => setCustomModel(e.target.value)}
          placeholder={t(language, "customModelPlaceholder")}
          className={inputCls}
        />
      </div>
    </div>
  );
}
