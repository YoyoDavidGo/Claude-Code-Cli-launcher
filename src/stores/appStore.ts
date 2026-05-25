import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import type {
  AppConfig,
  AppLanguage,
  AppTheme,
  LaunchMode,
  PermissionMode,
  ProjectMemory,
  StartType,
  ProjectItem,
  Provider,
  SubdirGitInfo,
} from "../types/config";
import { MODEL_PRESETS, detectProvider } from "../utils/modelPresets";

function memKey(startType: StartType) {
  return startType === "normal" ? "memoryNormal" : "memoryAgentView";
}

function getMemory(config: AppConfig, startType: StartType, path: string): ProjectMemory | undefined {
  if (!path) return undefined;
  return config[memKey(startType)]?.[path];
}

// Merge a partial memory into (startType, path); returns a new config.
function patchMemory(config: AppConfig, startType: StartType, path: string, patch: Partial<ProjectMemory>): AppConfig {
  const key = memKey(startType);
  const map = config[key] ?? {};
  const prev = map[path] ?? {};
  return { ...config, [key]: { ...map, [path]: { ...prev, ...patch } } };
}

// Mark a project as most-recently-used (or add it) and return the new list,
// keeping favorites first and capping the non-favorite (recent) tail at 20.
function bumpProjectList(list: ProjectItem[], path: string): ProjectItem[] {
  const now = new Date().toISOString();
  const folderName = path.split(/[\\/]/).pop() ?? path;
  const existing = list.find((p) => p.path === path);
  const projects = existing
    ? list.map((p) => (p.path === path ? { ...p, lastUsedAt: now } : p))
    : [{ id: crypto.randomUUID(), folderName, alias: "", path, isFavorite: false, lastUsedAt: now }, ...list];
  const favorites = projects.filter((p) => p.isFavorite);
  const recent = projects.filter((p) => !p.isFavorite).sort((a, b) => b.lastUsedAt.localeCompare(a.lastUsedAt)).slice(0, 20);
  return [...favorites, ...recent].reduce<ProjectItem[]>((acc, p) => {
    if (!acc.find((x) => x.id === p.id)) acc.push(p);
    return acc;
  }, []);
}

// Migrate legacy per-project `bypass` boolean to the permissionMode enum.
// Returns the same map reference when nothing needs migrating.
function migrateMemoryMap(map?: Record<string, ProjectMemory>): Record<string, ProjectMemory> | undefined {
  if (!map) return map;
  let changed = false;
  const out: Record<string, ProjectMemory> = {};
  for (const [path, mem] of Object.entries(map)) {
    if (mem.permissionMode === undefined && mem.bypass !== undefined) {
      const { bypass, ...rest } = mem;
      out[path] = { ...rest, permissionMode: bypass ? "bypass" : "default" };
      changed = true;
    } else {
      out[path] = mem;
    }
  }
  return changed ? out : map;
}

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
  projectsNormal: [],
  projectsAgentView: [],
  defaultLaunchMode: "continue",
  defaultProvider: "Claude",
  defaultModel: "sonnet",
  defaultPermissionMode: "auto",
  defaultLanguage: "zh-CN",
  defaultTheme: "light",
};

interface AppState {
  // Persisted config
  config: AppConfig;

  // Session UI state
  activeView: "launcher" | "cheatsheet";
  currentProjectPath: string;
  startType: StartType;
  launchMode: LaunchMode;
  provider: Provider;
  presetModel: string;
  customModel: string;
  permissionMode: PermissionMode;
  language: AppLanguage;
  theme: AppTheme;

  // Git state
  gitBranches: string[];
  currentGitBranch: string | null;
  gitStatusMessage: string;
  subdirBranches: SubdirGitInfo[];
  subdirSelected: string;

  // App status
  claudeAvailable: boolean;
  configLoaded: boolean;
  gatewayModels: string[];
  settingsModels: string[];

  // Actions
  loadConfig: () => Promise<void>;
  saveConfig: () => Promise<void>;
  syncClaudeSettings: (path: string) => Promise<void>;

  setActiveView: (view: "launcher" | "cheatsheet") => void;
  setCurrentProjectPath: (path: string) => void;
  setStartType: (type: StartType) => void;
  setLaunchMode: (mode: LaunchMode) => void;
  setProvider: (provider: Provider) => void;
  setPresetModel: (model: string) => void;
  setCustomModel: (model: string) => void;
  setPermissionMode: (mode: PermissionMode) => void;
  setLanguage: (lang: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
  setClaudeAvailable: (available: boolean) => void;

  addOrUpdateProject: (path: string) => void;
  toggleFavorite: (id: string) => void;
  updateAlias: (id: string, alias: string) => void;
  deleteProject: (id: string) => void;
  saveLastBranch: (projectPath: string, branch: string) => void;

  setGitBranches: (branches: string[]) => void;
  setCurrentGitBranch: (branch: string | null) => void;
  setGitStatusMessage: (msg: string) => void;
  setSubdirBranches: (v: SubdirGitInfo[] | ((prev: SubdirGitInfo[]) => SubdirGitInfo[])) => void;
  setSubdirSelected: (v: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  config: DEFAULT_CONFIG,
  activeView: "launcher",
  currentProjectPath: "",
  startType: "normal",
  launchMode: DEFAULT_CONFIG.defaultLaunchMode,
  provider: DEFAULT_CONFIG.defaultProvider,
  presetModel: DEFAULT_CONFIG.defaultModel,
  customModel: "",
  permissionMode: DEFAULT_CONFIG.defaultPermissionMode,
  language: DEFAULT_CONFIG.defaultLanguage,
  theme: DEFAULT_CONFIG.defaultTheme,
  gitBranches: [],
  currentGitBranch: null,
  gitStatusMessage: "",
  subdirBranches: [],
  subdirSelected: "",
  claudeAvailable: false,
  configLoaded: false,
  gatewayModels: [],
  settingsModels: [],

  loadConfig: async () => {
    try {
      let config = await invoke<AppConfig>("load_config");
      let dirty = false;
      if (config.projects && config.projects.length > 0 && config.projectsNormal.length === 0) {
        config = { ...config, projectsNormal: config.projects, projects: [] };
        dirty = true;
      }
      const mn = migrateMemoryMap(config.memoryNormal);
      const ma = migrateMemoryMap(config.memoryAgentView);
      if (mn !== config.memoryNormal || ma !== config.memoryAgentView) {
        config = { ...config, memoryNormal: mn, memoryAgentView: ma };
        dirty = true;
      }
      if (dirty) invoke("save_config", { config }).catch(console.error);
      const restoredPath = config.lastProjectNormal ?? "";
      const mem = getMemory(config, "normal", restoredPath);
      set({
        config,
        currentProjectPath: restoredPath,
        launchMode: mem?.launchMode ?? (config.defaultLaunchMode as LaunchMode),
        permissionMode: mem?.permissionMode ?? config.defaultPermissionMode,
        language: config.defaultLanguage as AppLanguage,
        theme: config.defaultTheme as AppTheme,
        configLoaded: true,
      });
      applyTheme(config.defaultTheme as AppTheme);
      localStorage.setItem("theme-preference", config.defaultTheme as AppTheme);
      get().syncClaudeSettings(restoredPath); // resolves provider + model from memory
    } catch {
      set({ configLoaded: true });
    }
  },

  saveConfig: async () => {
    const s = get();
    const config: AppConfig = { ...s.config, defaultLanguage: s.language, defaultTheme: s.theme };
    try {
      await invoke("save_config", { config });
      set({ config });
    } catch (e) {
      console.error("Failed to save config:", e);
    }
  },

  // Provider is ALWAYS detected from the project. The model within it comes from
  // memory (validated against the detected list), else the provider default.
  // For a project with no memory yet, snapshots the resolved model (memory birth).
  syncClaudeSettings: async (path) => {
    try {
      const info = await invoke<ClaudeSettingsInfo>("read_claude_settings", { projectPath: path });
      const s = get();
      const mem = getMemory(s.config, s.startType, path);

      let provider: Provider;
      let presets: string[];
      let detectedDefault: string;
      if (info.source === "none") {
        provider = "Claude";
        presets = MODEL_PRESETS["Claude"] ?? [];
        detectedDefault = presets[0] ?? "";
      } else {
        provider = detectProvider(info.base_url);
        const model = info.model ?? "";
        presets = info.all_models.length > 0
          ? info.all_models
          : provider === "Other"
            ? info.gateway_models
            : (MODEL_PRESETS[provider] ?? []);
        detectedDefault = presets.includes(model) ? model : (presets[0] ?? "");
      }

      const memPreset = mem?.presetModel;
      const presetModel = memPreset && presets.includes(memPreset) ? memPreset : detectedDefault;
      const customModel = mem?.customModel ?? "";

      let config = s.config;
      if (path && !mem) {
        config = patchMemory(config, s.startType, path, { presetModel, customModel });
        invoke("save_config", { config }).catch(console.error);
      }

      set({
        gatewayModels: info.gateway_models,
        settingsModels: info.source === "none" ? [] : info.all_models,
        provider,
        presetModel,
        customModel,
        config,
      });
    } catch {
      // silent — keep existing state
    }
  },

  // Select a project. Does NOT reorder the recent list — selection must not
  // bump order (only an actual launch counts as "really opened"; see
  // addOrUpdateProject in LaunchButton). Restores launchMode/permissionMode
  // from memory, or inherits the current values and snapshots them as the new
  // project's memory (memory birth).
  setCurrentProjectPath: (path) => {
    const s = get();
    const mem = getMemory(s.config, s.startType, path);
    const launchMode = mem?.launchMode ?? s.launchMode;
    const permissionMode = mem?.permissionMode ?? s.permissionMode;

    const lpKey = s.startType === "normal" ? "lastProjectNormal" : "lastProjectAgentView";
    let config = { ...s.config, [lpKey]: path };
    if (path && !mem) {
      config = patchMemory(config, s.startType, path, { launchMode, permissionMode });
    }
    set({ currentProjectPath: path, launchMode, permissionMode, settingsModels: [], config });
    invoke("save_config", { config }).catch(console.error);
    get().syncClaudeSettings(path); // resolves + snapshots model
  },
  setActiveView: (activeView) => set({ activeView }),
  setStartType: (startType) => {
    const { config, launchMode, permissionMode } = get();
    const savedPath = startType === "normal"
      ? (config.lastProjectNormal ?? "")
      : (config.lastProjectAgentView ?? "");
    const mem = getMemory(config, startType, savedPath);
    set({
      startType,
      currentProjectPath: savedPath,
      settingsModels: [],
      launchMode: mem?.launchMode ?? (savedPath ? launchMode : (config.defaultLaunchMode as LaunchMode)),
      permissionMode: mem?.permissionMode ?? (savedPath ? permissionMode : config.defaultPermissionMode),
    });
    get().syncClaudeSettings(savedPath); // resolves provider + model under new mode
  },
  setLaunchMode: (launchMode) => {
    const s = get();
    const config = s.currentProjectPath
      ? patchMemory(s.config, s.startType, s.currentProjectPath, { launchMode })
      : s.config;
    set({ launchMode, config });
    if (s.currentProjectPath) invoke("save_config", { config }).catch(console.error);
  },
  setProvider: (provider) => set({ provider }), // session-only; never persisted (always re-detected)
  setPresetModel: (presetModel) => {
    const s = get();
    const config = s.currentProjectPath
      ? patchMemory(s.config, s.startType, s.currentProjectPath, { presetModel })
      : s.config;
    set({ presetModel, config });
    if (s.currentProjectPath) invoke("save_config", { config }).catch(console.error);
  },
  setCustomModel: (customModel) => {
    const s = get();
    const config = s.currentProjectPath
      ? patchMemory(s.config, s.startType, s.currentProjectPath, { customModel })
      : s.config;
    set({ customModel, config });
    if (s.currentProjectPath) invoke("save_config", { config }).catch(console.error);
  },
  setPermissionMode: (permissionMode) => {
    const s = get();
    const config = s.currentProjectPath
      ? patchMemory(s.config, s.startType, s.currentProjectPath, { permissionMode })
      : s.config;
    set({ permissionMode, config });
    if (s.currentProjectPath) invoke("save_config", { config }).catch(console.error);
  },
  setLanguage: (language) => {
    set({ language });
    get().saveConfig();
  },
  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
    localStorage.setItem("theme-preference", theme);
    get().saveConfig();
  },
  setClaudeAvailable: (claudeAvailable) => set({ claudeAvailable }),

  addOrUpdateProject: (path) => {
    const { startType } = get();
    const key = startType === "normal" ? "projectsNormal" : "projectsAgentView";
    const merged = bumpProjectList(get().config[key] ?? [], path);
    const newConfig = { ...get().config, [key]: merged };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  toggleFavorite: (id) => {
    const { startType } = get();
    const key = startType === "normal" ? "projectsNormal" : "projectsAgentView";
    const projects = get().config[key].map((p) => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
    const newConfig = { ...get().config, [key]: projects };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  updateAlias: (id, alias) => {
    const { startType } = get();
    const key = startType === "normal" ? "projectsNormal" : "projectsAgentView";
    const projects = get().config[key].map((p) => p.id === id ? { ...p, alias } : p);
    const newConfig = { ...get().config, [key]: projects };
    set({ config: newConfig });
    invoke("save_config", { config: newConfig }).catch(console.error);
  },

  deleteProject: (id) => {
    const s = get();
    const listKey = s.startType === "normal" ? "projectsNormal" : "projectsAgentView";
    const mKey = memKey(s.startType);
    const lpKey = s.startType === "normal" ? "lastProjectNormal" : "lastProjectAgentView";

    const target = s.config[listKey].find((p) => p.id === id);
    const projects = s.config[listKey].filter((p) => p.id !== id);
    const memMap = { ...(s.config[mKey] ?? {}) };
    if (target) delete memMap[target.path];

    const config = { ...s.config, [listKey]: projects, [mKey]: memMap };
    const wasCurrent = !!target && target.path === s.currentProjectPath;
    set({ config });

    if (wasCurrent) {
      const next = [...projects].sort((a, b) => b.lastUsedAt.localeCompare(a.lastUsedAt))[0];
      if (next) {
        get().setCurrentProjectPath(next.path); // persists list + loads next's memory
      } else {
        const cleared = { ...config, [lpKey]: "" };
        set({
          config: cleared,
          currentProjectPath: "",
          launchMode: cleared.defaultLaunchMode as LaunchMode,
          permissionMode: cleared.defaultPermissionMode,
          settingsModels: [],
        });
        invoke("save_config", { config: cleared }).catch(console.error);
        get().syncClaudeSettings("");
      }
    } else {
      invoke("save_config", { config }).catch(console.error);
    }
  },

  saveLastBranch: (projectPath, branch) => {
    const s = get();
    const config = patchMemory(s.config, s.startType, projectPath, { branch });
    set({ config });
    invoke("save_config", { config }).catch(console.error);
  },

  setGitBranches: (gitBranches) => set({ gitBranches }),
  setCurrentGitBranch: (currentGitBranch) => set({ currentGitBranch }),
  setGitStatusMessage: (gitStatusMessage) => set({ gitStatusMessage }),
  setSubdirBranches: (subdirBranches) => set((s) => ({
    subdirBranches: typeof subdirBranches === "function" ? subdirBranches(s.subdirBranches) : subdirBranches,
  })),
  setSubdirSelected: (subdirSelected) => set({ subdirSelected }),
}));

function applyTheme(theme: AppTheme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
