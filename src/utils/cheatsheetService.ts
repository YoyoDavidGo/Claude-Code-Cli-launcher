import { invoke } from "@tauri-apps/api/core";
import type { AppLanguage, CheatsheetDoc } from "../types/config";
import { parseCheatsheet } from "./parseCheatsheet";

// Reads app_data_dir/cheatsheet/{lang}.md (Rust writes the bundled default on first run).
export async function loadCheatsheet(lang: AppLanguage): Promise<CheatsheetDoc> {
  const md = await invoke<string>("read_cheatsheet", { lang });
  return parseCheatsheet(md);
}

// Overwrites the local file with the program's built-in default, then returns it.
export async function restoreCheatsheetDefault(lang: AppLanguage): Promise<CheatsheetDoc> {
  const md = await invoke<string>("restore_cheatsheet_default", { lang });
  return parseCheatsheet(md);
}
