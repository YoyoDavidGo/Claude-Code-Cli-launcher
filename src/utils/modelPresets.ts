import type { Provider } from "../types/config";

export const MODEL_PRESETS: Record<Provider, string[]> = {
  Claude: ["sonnet", "opus", "claude-sonnet-4-5", "claude-opus-4-5"],
  DeepSeek: ["deepseek-v3.1", "deepseek-r1", "deepseek-chat", "deepseek-reasoner"],
  OpenAI: ["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "o3", "o4-mini"],
  Gemini: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
  Kimi: ["kimi-k2", "kimi-latest", "moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"],
  Qwen: ["qwen-max", "qwen-plus", "qwen-turbo", "qwen3-coder"],
  Other: [],
};

export const PROVIDERS: Provider[] = [
  "Claude",
  "DeepSeek",
  "OpenAI",
  "Gemini",
  "Kimi",
  "Qwen",
  "Other",
];
