export type LaunchMode = "new" | "continue" | "resume";

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

export interface AppConfig {
  projects: ProjectItem[];
  defaultLaunchMode: LaunchMode;
  defaultProvider: Provider;
  defaultModel: string;
  defaultBypass: boolean;
  defaultLanguage: AppLanguage;
  defaultTheme: AppTheme;
}

export interface LaunchOptions {
  projectPath: string;
  launchMode: LaunchMode;
  provider: Provider;
  presetModel: string;
  customModel: string;
  bypass: boolean;
}
