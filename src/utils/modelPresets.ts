import type { Provider } from "../types/config";

export const MODEL_PRESETS: Record<Provider, string[]> = {
  Claude: ["sonnet", "opus", "haiku"],
  DeepSeek: ["deepseek-v3.1", "deepseek-r1", "deepseek-chat", "deepseek-reasoner"],
  OpenAI: ["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "o3", "o4-mini"],
  Gemini: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
  Kimi: ["kimi-k2", "kimi-latest", "moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"],
  Qwen: ["qwen-max", "qwen-plus", "qwen-turbo", "qwen3-coder"],
  Other: [],
};

export function detectProvider(baseUrl: string | null): Provider {
  if (!baseUrl) return "Claude";
  const u = baseUrl.toLowerCase();
  if (u.includes("deepseek")) return "DeepSeek";
  if (u.includes("openai")) return "OpenAI";
  if (u.includes("google") || u.includes("gemini") || u.includes("googleapis")) return "Gemini";
  if (u.includes("moonshot") || u.includes("kimi")) return "Kimi";
  if (u.includes("aliyun") || u.includes("dashscope") || u.includes("qwen")) return "Qwen";
  if (u.includes("anthropic")) return "Claude";
  return "Other";
}

export const PROVIDERS: Provider[] = [
  "Claude",
  "DeepSeek",
  "OpenAI",
  "Gemini",
  "Kimi",
  "Qwen",
  "Other",
];
