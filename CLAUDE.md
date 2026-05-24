# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev (starts Vite + Rust in parallel)
pnpm tauri dev

# Frontend only (hot reload, no Rust)
pnpm dev

# Production build
pnpm tauri build

# TypeScript type check
pnpm tsc --noEmit
```

## Architecture

**Tauri v2** desktop app. Rust process handles system calls; WebView renders the React UI.

```
src/                    # React + TypeScript frontend
  components/           # One file per UI section
  stores/appStore.ts    # Single Zustand v5 store — all state lives here
  utils/commandBuilder.ts  # Builds claude CLI args from store state
  utils/modelPresets.ts    # Provider → model list mapping
  i18n/                 # zh-CN + en-US translation strings
  types/config.ts       # Shared TS types (LaunchOptions, AppConfig, etc.)
src-tauri/
  src/commands.rs       # All Tauri commands (the only Rust file to edit)
  src/lib.rs            # Registers commands + plugins — rarely touched
  tauri.conf.json       # Window config: 800×566, min 800×566
  capabilities/default.json  # Permission allowlist (dialog:default etc.)
```

Domain language lives in `CONTEXT.md` (glossary); non-obvious decisions in `docs/adr/`.

## Key Constraints

**Tailwind v4** — CSS-based config only, no `tailwind.config.js`. Dark mode uses `@custom-variant dark (&:is(.dark *))` and is toggled by adding `.dark` to `document.documentElement`.

**Windows CLI detection** — npm-installed CLIs (like `claude`) are `.cmd` files. Use `Command::new("cmd").args(["/c", "claude", ...])`, not `Command::new("claude")` directly.

**Suppress console flash** — All background Rust commands on Windows must use `.creation_flags(CREATE_NO_WINDOW)` (already imported at top of `commands.rs`).

**pnpm v11** — Build scripts require explicit allowlist. Managed in `package.json` under `pnpm.onlyBuiltDependencies`, not in a workspace file.

**Model auto-detection** — `read_claude_settings` (commands.rs) reads `env.ANTHROPIC_*` from `.claude/settings.json`, in order: project `settings.local.json` → project `settings.json` → global `~/.claude/settings.json`; first file containing `ANTHROPIC_BASE_URL`/`ANTHROPIC_MODEL` wins. Provider is inferred from the base URL; `[...]` suffixes are stripped from model names. **Gotcha:** third-party config lives in the *global* file's `env`, which is empty whenever Claude itself is the active provider — so detection showing "Claude" during a Claude session is correct, not a bug. Rust changes need a full `pnpm tauri dev` restart (only the frontend hot-reloads).

**Project Memory** (per `(launchType, projectPath)`) — launch mode, model (preset + custom), bypass, and git branch are remembered per project AND per launch type (Normal vs Agent View are fully independent: separate project lists `projectsNormal`/`projectsAgentView`, separate memory maps `memoryNormal`/`memoryAgentView`, separate `lastProject*`). Stored in `config.json`; legacy `projects` is migrated into `projectsNormal` on first load. See ADR 0001/0002.
- **Provider is never stored** — always re-detected from the project's `.claude/settings.json` (`syncClaudeSettings`). Only the model *within* it is remembered: `presetModel` is restored only if it's in the detected provider's list, else the provider default; `customModel` is restored verbatim.
- A brand-new project (no memory) inherits launchMode/bypass from the currently-open project and is snapshotted at selection time, then stays independent.
- Every settings change persists immediately. Deleting a project drops its memory; deleting the *current* project auto-selects the next-most-recent (loading its memory) or resets to defaults if the list is empty.

## State & Data Flow

1. On app start: `loadConfig()` invokes Rust `load_config` → populates Zustand store from `%APPDATA%\com.claudecodelauncher.app\config.json`, restores Normal mode's last project (`lastProjectNormal`) and its memory, then calls `syncClaudeSettings(restoredPath)` to detect provider/model
2. User picks a project → `setCurrentProjectPath()` → restores/births that project's memory, then triggers git branch fetch via `get_git_branches` / `get_current_git_branch`
3. Launch button: reads store state → `buildClaudeArgs()` → invokes Rust `launch_claude` → opens terminal with `wt`→`powershell`→`cmd` fallback
   - **Agent View mode** (`startType === "agentView"`): command becomes `claude agents [--model x] [--permission-mode y]`; `launchMode` is ignored; button text changes to "打开 Agent View"
4. `startType` (Normal | Agent View) is **session-only** (never persisted), but switching it restores that mode's last project + per-project memory. `language`/`theme` are global prefs saved via `saveConfig`; all other settings persist into Project Memory (see Key Constraints)

## UI Conventions

- Primary color: `orange-600`; backgrounds: `bg-[#f7f5f2]` (light) / `bg-[#0d0e0f]` (dark)
- Window is 800×566 (default = min size); all components use `text-xs`/`text-sm` and compact padding to avoid scrollbars
- Native HTML `<select>` elements preferred over component library selects
- The `provider` flag is stored in state and included in `--model` arg resolution, but is not passed as its own CLI flag to `claude`

## Karpathy Coding Guidelines

### 1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.
- State assumptions explicitly; if uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so and push back.
- If something is unclear, stop, name what's confusing, and ask.

### 2. Simplicity First
Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No unrequested flexibility or configurability.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes
Touch only what you must. Clean up only your own mess.
- Don't improve adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove only imports/variables/functions that YOUR changes made unused.

### 4. Goal-Driven Execution
Define success criteria. Loop until verified.
- Transform tasks into verifiable goals before starting.
- For multi-step tasks, state a plan:
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
- Strong success criteria let you loop independently; weak ones require constant clarification.

### 5. Use the model only for judgment calls
Use me for: classification, drafting, summarization, extraction.
Do NOT use me for: routing, retries, deterministic transforms.
If code can answer, code answers.

### 6. Token budgets are not advisory
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.
Surface the breach. Do not silently overrun.

### 7. Surface conflicts, don't average them
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup.
Don't blend conflicting patterns.

### 8. Read before you write
Before adding code, read exports, immediate callers, shared utilities.
"Looks orthogonal" is dangerous. If unsure why code is structured a way, ask.

### 9. Tests verify intent, not just behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

### 10. Checkpoint after every significant step
Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back.
If you lose track, stop and restate.

### 11. Match the codebase's conventions, even if you disagree
Conformance > taste inside the codebase.
If you genuinely think a convention is harmful, surface it. Don't fork silently.

### 12. Fail loud
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.
