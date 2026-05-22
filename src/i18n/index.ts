import { zhCN } from "./zh-CN";
import { enUS } from "./en-US";
import type { AppLanguage } from "../types/config";

export const translations = { "zh-CN": zhCN, "en-US": enUS };

export function t(lang: AppLanguage, key: keyof typeof zhCN): string {
  return translations[lang][key] ?? key;
}
