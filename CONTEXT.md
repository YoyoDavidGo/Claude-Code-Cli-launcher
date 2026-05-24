# Claude Code Launcher

A desktop launcher that opens the Claude Code CLI in a chosen project directory with a chosen set of options. Its job is to remember the user's per-project choices so they don't reconfigure on every launch.

## Language

**Project**:
A directory the user launches the Claude CLI in, identified by its filesystem path. Appears in a Recent list and can be marked Favorite.
_Avoid_: folder, repo, workspace

**Launch Type**:
Which of two ways the CLI is started: **Normal** (`claude` with launch-mode flags) or **Agent View** (`claude agents`). The two are fully independent memory namespaces — a Project's choices under Normal never bleed into Agent View.
_Avoid_: mode (ambiguous with Launch Mode), startType

**Launch Mode**:
Within Normal launch type, one of New / Continue / Resume. Unused under Agent View.
_Avoid_: session type

**Provider**:
The model vendor (Claude, DeepSeek, OpenAI, …). It is **always auto-detected** from the Project's own `.claude/settings.json` (inferred from the base URL) — never restored from launcher memory. The Project drives the Provider.
_Avoid_: vendor, 厂商 (use Provider), gateway

**Project Memory**:
The launcher's per-(Project, Launch Type) saved choices. Holds Launch Mode, the model selection (preset + custom), bypass permission, and git branch. Does **not** hold the Provider (that's the Project's own concern). Updated the instant the user changes any of these. Deleted when the Project is removed from the list.
_Avoid_: settings, config, preferences

**Preset Model**:
A model chosen from the Provider's fixed model list. Remembered per (Project, Launch Type), but on restore it is **validated** against the currently-detected Provider's list: if the remembered model isn't in that list, it falls back to the Provider's default model.

**Custom Model**:
A free-text model name typed by hand, not in any Provider list. Remembered per (Project, Launch Type) and restored verbatim (no validation).

## Example dialogue

> **Dev**: User opens project `acme-api` under Normal. What model shows?
> **Expert**: First we scan `acme-api`'s `.claude/settings.json` → Provider is DeepSeek. DeepSeek's fixed list appears. Then we check the Project Memory for (`acme-api`, Normal): it remembered `deepseek-reasoner`. That's in DeepSeek's list, so we select it.
> **Dev**: And if they'd switched the project's settings.json to Claude since last time?
> **Expert**: Scan now says Claude. The remembered `deepseek-reasoner` isn't in Claude's list, so it falls back to Claude's default model. The custom-model field, if they'd typed one, comes back verbatim regardless.
