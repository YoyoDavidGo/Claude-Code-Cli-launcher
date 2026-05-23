export type LaunchMode = "new" | "continue" | "resume";

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
  bypass?: boolean;
  branch?: string;
}

export interface AppConfig {
  projects?: ProjectItem[];         // legacy — migration only
  projectsNormal: ProjectItem[];
  projectsAgentView: ProjectItem[];
  defaultLaunchMode: LaunchMode;
  defaultProvider: Provider;
  defaultModel: string;
  defaultBypass: boolean;
  defaultLanguage: AppLanguage;
  defaultTheme: AppTheme;
  lastProjectNormal?: string;
  lastProjectAgentView?: string;
  memoryNormal?: Record<string, ProjectMemory>;
  memoryAgentView?: Record<string, ProjectMemory>;
}

export interface LaunchOptions {
  projectPath: string;
  startType: StartType;
  launchMode: LaunchMode;
  provider: Provider;
  presetModel: string;
  customModel: string;
  bypass: boolean;
}
