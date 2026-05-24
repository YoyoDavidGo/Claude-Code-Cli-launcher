import type {
  AppLanguage,
  CheatsheetDoc,
  CheatsheetItem,
  CheatsheetItemType,
  CheatsheetMeta,
} from "../types/config";

const H1_COMMAND = ["Claude Code 命令", "Claude Code Commands"];
const H1_OPERATION = ["Claude Code 操作", "Claude Code Operations"];

function parseMeta(src: string): CheatsheetMeta | null {
  const m = src.match(/^\s*<!--([\s\S]*?)-->/);
  if (!m || !/CCL-CHEATSHEET/.test(m[1])) return null;
  const body = m[1];
  const get = (key: string) => {
    const r = body.match(new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "m"));
    return r ? r[1].trim() : undefined;
  };
  return {
    schema: Number(get("schema") ?? "1"),
    lang: (get("lang") as AppLanguage) ?? "zh-CN",
    version: get("version"),
    updatedAt: get("updatedAt"),
    source: get("source"),
  };
}

function sectionType(headingText: string): CheatsheetItemType | null {
  if (H1_COMMAND.some((h) => headingText.includes(h))) return "command";
  if (H1_OPERATION.some((h) => headingText.includes(h))) return "operation";
  return null;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseCheatsheet(src: string): CheatsheetDoc {
  const meta = parseMeta(src);
  const withoutComment = src.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  const lines = withoutComment.split(/\r?\n/);

  const items: CheatsheetItem[] = [];
  const usedIds = new Set<string>();
  let isCommon = true;
  let dividerSeen = false;
  let currentType: CheatsheetItemType = "command";
  let current: { title: string; buf: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    let shortNote = "";
    for (const l of current.buf) {
      const q = l.match(/^>\s?(.*)$/);
      if (q) {
        shortNote = q[1].trim();
        break;
      }
    }
    const base = slugify(current.title) || "item";
    let id = `${currentType}-${base}`;
    let n = 2;
    while (usedIds.has(id)) id = `${currentType}-${base}-${n++}`;
    usedIds.add(id);
    items.push({
      id,
      title: current.title,
      shortNote,
      type: currentType,
      isCommon,
      markdown: current.buf.join("\n").trim(),
    });
    current = null;
  };

  for (const line of lines) {
    if (!dividerSeen && /^---\s*$/.test(line)) {
      flush();
      dividerSeen = true;
      isCommon = false;
      continue;
    }
    const h1 = line.match(/^#\s+(.*)$/);
    if (h1) {
      flush();
      const t = sectionType(h1[1].trim());
      if (t) currentType = t;
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flush();
      current = { title: h2[1].trim(), buf: [line] };
      continue;
    }
    if (current) current.buf.push(line);
  }
  flush();

  return { meta, items };
}
