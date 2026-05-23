import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import type {
  AppConfig,
  AppLanguage,
  AppTheme,
  LaunchMode,
  ProjectItem,
  Provider,
} from "../types/config";
import { MODEL_PRESETS, detectProvider } from "../utils/modelPresets";

export interface ClaudeSettingsInfo {
  base_url: string | null;
  model: string | null;
  default_sonnet: string | null;
  default_opus: string | null;
  default_haiku: string | null;
  all_models: string[];
  gateway_models: string[];
  source: string;
}

const DEFAULT_CONFIG: AppConfig = {
  projects: [],
  defaultLaunchMode: "continue",
  defaultProvider: "Claude",
  defaultModel: "sonnet",
  defaultBypass: false,
  defaultLanguage: "zh-CN",
  defaultTheme: "light",
};

interface AppState {
  // Persisted config
  config: AppConfig;

  // Session UI state
  currentProjectPath: string;
  launchMode: LaunchMode;
  provider: Provider;
  presetModel: string;
  customModel: string;
  bypass: boolean;
  language: AppLanguage;
  theme: AppTheme;

  // Git state
  gitBranches: string[];
  currentGitBranch: string | null;
  gitStatusMessage: string;

  // App status
  claudeAvailable: boolean;
  configLoaded: boolean;
  gatewayModels: string[];
  settingsModels: string[];

  // Actions
  loadConfig: () => Promise<void>;
  saveConfig: () => Promise<void>;
  syncClaudeSettings: (path: string) => Promise<void>;

  setCurrentProjectPath: (path: string) => void;
  setLaunchMode: (mode: LaunchMode) => void;
  setProvider: (provider: Provider) => void;
  setPresetModel: (model: string) => void;
  setCustomModel: (model: string) => void;
  setBypass: (bypass: boolean) => void;
  setLanguage: (lang: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
  setClaudeAvailable: (available: boolean) => void;

  addOrUpdateProject: (path: string) => void;
  toggleFavorite: (id: string) => void;
  updateAlias: (id: string, alias: string) => void;
  deleteProject: (id: string) => void;

  setGitBranches: (branches: string[]) => void;
  setCurrentGitBranch: (branch: string | null) => void;
  setGitStatusMessage: (msg: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  config: DEFAULT_CONFIG,
  currentProjectPath: "",
  launchMode: DEFAULT_CONFIG.defaultLaunchMode,
  provider: DEFAULT_CONFIG.defaultProvider,
  presetModel: DEFAULT_CONFIG.defaultModel,
  customModel: "",
  bypass: DEFAULT_CONFIG.defaultBypass,
  language: DEFAULT_CONFIG.defaultLanguage,
  theme: DEFAULT_CONFIG.defaultTheme,
  gitBranches: [],
  currentGitBranch: null,
  gitStatusMessage: "",
  claudeAvailable: false,
  configLoaded: false,
  gatewayModels: [],
  settingsModels: [],

  loadConfig: async () => {
    try {
      const config = await invoke<AppConfig>("load_config");
      set({
        config,
        launchMode: config.defaultLaunchMode,
        provider: config.defaultProvider,
        presetModel: config.defaultModel,
        bypass: config.defaultBypass,
        language: config.defaultLanguage,
        theme: config.defaultTheme,
        configLoaded: true,
      });
      applyTheme(config.defaultTheme);
      // Detect global provider/model immediately on startup
      get().syncClaudeSettings("");
    } catch {
      set({ configLoaded: true });
    }
  },

  saveConfig: async () => {
    const s = get();
    const config: AppConfig = {
      ...s.config,
      defaultLaunchMode: s.launchMode,
      defaultProvider: s.provider,
      defaultModel: s.presetModel,
      defaultBypass: s.bypass,
      defaultLanguage: s.language,
      defaultTheme: s.theme,
    };
    try {
      await invoke("save_config", { config });
      set({ config });
    } catch (e) {
      console.error("Failed to save config:", e);
    }
  },

  syncClaudeSettings: async (path) => {
    try {
      const info = await invoke<ClaudeSettingsInfo>("read_claude_settings", { projectPath: path });
      if (info.source === "none") {
        // No provider config found — reset to default Claude
        set({ gatewayModels: info.gateway_models, settingsModels: [], provider: "Claude", presetModel: MODEL_PRESETS["Claude"][0] ?? "", customModel: "" });
        return;
      }
      const provider = detectProvider(info.base_url);
      const model = info.model ?? "";
      const presets = info.all_models.length > 0
        ? info.all_models
        : provider === "Other"
          ? info.gateway_models
          : (MODEL_PRESETS[provider] ?? []);
      const isInPreset = presets.includes(model);
      set({
        gatewayModels: info.gateway_models,
        settingsModels: info.all_models,
        provider,
        presetModel: isInPreset ? model : (presets[0] ?? ""),
        customModel: !isInPreset && model ? model : "",
      });
    } catch {
      // silent — keep existing state
    }
  },

  setCurrentProjectPath: (path) => {
    set({ currentProjectPath: path, settingsModels: [] });
    get().syncClaudeSettings(path);
  },
  setLaunchMode: (launchMode) => set({ launchMode }),
  setProvider: (provider) => set({ provider }),
  setPresetModel: (presetModel) => set({ presetModel }),
  setCustomModel: (customModel) => set({ customModel }),
  setBypass: (bypass) => set({ bypass }),
  setLanguage: (language) => {
    set({ language });
    get().saveConfig();
  },
  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
    get().saveConfig();
  },
  setClaudeAvailable: (claudeAvailable) => set({ claudeAvailable }),

  addOrUpdateProject: (path) => {
    const folderName = path.split(/[\\/]/).pop() ?? path;
    const existing = get().config.projects.find((p) => p.path === path);
    const now = new Date().toISOString();

    let projects: ProjectItem[];
    if (existing) {
      projects = get().config.projects.map((p) =>
        p.path === path ? { ...p, lastUsedAt: now } : p
      );
    } else {
      const newProject: ProjectItem = {
        id: crypto.randomUUID(),
        folderName,
        alias: "",
        path,
        isFavorite: false,
        lastUsedAt: now,
      };
      projects = [newProject, ...get().config.projects];
    }

    // Keep max 20 recent (non-favorite)
    const favorites = projects.filter((p) => p.isFavorite);
    const recent = projects
      .filter((p) => !p.isFavorite)
      .sort((a, b) => b.lastUsedAt.localeCompare(a.lastUsedAt))
      .slice(0, 20);
    const merged = [...favorites, ...recent].reduce<ProjectItem[]>((acc, p) => {
      if (!acc.find((x) => x.id === p.id)) acc.push(p);
      return acc;
    }, []);

    const newConfig = { ...get().config, projects: merged };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  toggleFavorite: (id) => {
    const projects = get().config.projects.map((p) =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    const newConfig = { ...get().config, projects };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  updateAlias: (id, alias) => {
    const projects = get().config.projects.map((p) =>
      p.id === id ? { ...p, alias } : p
    );
    const newConfig = { ...get().config, projects };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  deleteProject: (id) => {
    const projects = get().config.projects.filter((p) => p.id !== id);
    const newConfig = { ...get().config, projects };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  setGitBranches: (gitBranches) => set({ gitBranches }),
  setCurrentGitBranch: (currentGitBranch) => set({ currentGitBranch }),
  setGitStatusMessage: (gitStatusMessage) => set({ gitStatusMessage }),
}));

function applyTheme(theme: AppTheme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
