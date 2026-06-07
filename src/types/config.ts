export type LaunchMode = "new" | "continue" | "resume";

export type PermissionMode = "default" | "auto" | "bypass";

export type StartType = "normal" | "agentView";

export type Provider =
  | "Claude"
  | "DeepSeek"
  | "OpenAI"
  | "Gemini"
  | "Kimi"
  | "Qwen"
  | "Other";

export type AppLanguage = "zh-CN" | "en-US";

export type AppTheme = "light" | "dark";

export interface ProjectItem {
  id: string;
  folderName: string;
  alias: string;
  path: string;
  isFavorite: boolean;
  lastUsedAt: string;
}

export interface ProjectMemory {
  launchMode?: LaunchMode;
  presetModel?: string;
  customModel?: string;
  bypass?: boolean;          // legacy — migrated to permissionMode on load
  permissionMode?: PermissionMode;
  branch?: string;
  detectedBaseUrl?: string;  // last detected base_url; baseline for "config changed" → clears customModel
}

export interface AppConfig {
  projects?: ProjectItem[];         // legacy — migration only
  projectsNormal: ProjectItem[];
  projectsAgentView: ProjectItem[];
  defaultLaunchMode: LaunchMode;
  defaultProvider: Provider;
  defaultModel: string;
  defaultPermissionMode: PermissionMode;
  defaultLanguage: AppLanguage;
  defaultTheme: AppTheme;
  lastProjectNormal?: string;
  lastProjectAgentView?: string;
  memoryNormal?: Record<string, ProjectMemory>;
  memoryAgentView?: Record<string, ProjectMemory>;
}

export interface SubdirGitInfo {
  subdir: string;
  current: string;
  branches: string[];
}

export type CheatsheetItemType = "command" | "operation";

export interface CheatsheetItem {
  id: string;
  title: string;
  shortNote: string;
  type: CheatsheetItemType;
  isCommon: boolean;
  markdown: string;
}

export interface CheatsheetMeta {
  schema: number;
  lang: AppLanguage;
  version?: string;
  updatedAt?: string;
  source?: string;
}

export interface CheatsheetDoc {
  meta: CheatsheetMeta | null;
  items: CheatsheetItem[];
}

export interface LaunchOptions {
  projectPath: string;
  startType: StartType;
  launchMode: LaunchMode;
  provider: Provider;
  presetModel: string;
  customModel: string;
  permissionMode: PermissionMode;
}
