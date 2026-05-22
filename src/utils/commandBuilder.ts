import type { LaunchOptions } from "../types/config";

export function resolveModel(options: Pick<LaunchOptions, "presetModel" | "customModel">): string {
  const custom = options.customModel.trim();
  if (custom) return custom;
  return options.presetModel.trim();
}

export function buildClaudeArgs(options: LaunchOptions): string[] {
  const args: string[] = [];

  if (options.launchMode === "continue") args.push("--continue");
  if (options.launchMode === "resume") args.push("--resume");

  const model = resolveModel(options);
  if (model) args.push("--model", model);

  if (options.bypass) args.push("--permission-mode", "bypassPermissions");

  return args;
}

export function buildCommandPreview(options: LaunchOptions): string {
  const args = buildClaudeArgs(options);
  return ["claude", ...args].join(" ");
}
