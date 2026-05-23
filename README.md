<div align="center">
  <img src="src-tauri/icons/128x128.png" width="96" alt="Claude Code Launcher" />
  <h1>Claude Code Launcher</h1>
  <p>A lightweight GUI launcher for <a href="https://claude.ai/code">Claude Code CLI</a> on Windows</p>

  <p>
    <a href="README.md"><b>English</b></a> · <a href="README.zh-CN.md">中文</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/platform-Windows-0078D4?logo=windows" alt="platform" />
    <img src="https://img.shields.io/badge/version-0.1.0-orange" alt="version" />
    <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
    <img src="https://img.shields.io/badge/Tauri-v2-24C8D8?logo=tauri" alt="tauri" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="react" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="typescript" />
  </p>
</div>

---

## Screenshot

<div align="center">
  <img src="docs/screenshot.png" alt="Claude Code Launcher UI" width="800" />
</div>

---

## Features

- **Project Management** — Add projects via folder picker, set aliases, pin favorites, auto-tracks last 20 recent projects
- **Git Branch Selector** — Displays current branch and lets you switch branches before launching
- **Launch Modes** — New session · Continue last · Resume (pick from history)
- **Agent View Mode** — One-click launch of `claude agents` for the Agents dashboard
- **Multi-Provider Model Support** — Auto-detects provider and model from your `.claude/settings.json`:
  - Claude (Anthropic) · DeepSeek · OpenAI · Gemini · Kimi (Moonshot) · Qwen (Alibaba) · Custom endpoint
- **Command Preview** — Shows the exact `claude` CLI command before you launch it, with one-click copy
- **Permission Mode** — Toggle `--permission-mode bypassPermissions` for trusted projects
- **Theme & Language** — Light / Dark theme · Simplified Chinese / English UI

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Windows 10 / 11 | App launches Claude in Windows Terminal or PowerShell |
| [Claude Code CLI](https://claude.ai/code) | Must be installed and accessible as `claude` |
| Node.js ≥ 20 + pnpm ≥ 9 | For building from source |
| Rust (stable) | For building from source |

---

## Installation

### Download Release (Recommended)

Go to [Releases](https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher/releases) and download the latest `.msi` or `.exe` installer.

### Build from Source

```powershell
# 1. Clone the repo
git clone https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher.git
cd Claude-Code-Cli-launcher

# 2. Install dependencies
pnpm install

# 3. Dev mode (hot reload frontend, Rust auto-recompiles on change)
pnpm tauri dev

# 4. Production build → generates installer in src-tauri/target/release/bundle/
pnpm tauri build
```

---

## Usage

1. **Pick a project** — Type a path directly or click **Choose Directory** to browse
2. **Select a branch** — The Git Branch panel shows your current branch; click the dropdown to switch
3. **Choose launch mode**
   - `New Session` — starts a fresh Claude Code session
   - `Continue` — resumes the last conversation (`--continue`)
   - `Resume` — lets you pick a past conversation (`--resume`)
4. **Set the model** — Provider is auto-detected from `.claude/settings.json`; override it here if needed
5. **Preview & Launch** — Check the command preview at the bottom, then click **Launch**

> **Agent View** — Toggle the mode at the top toolbar to switch to `claude agents` mode.

---

## Configuration

Settings are saved automatically to:

```
%APPDATA%\com.claudecodelauncher.app\config.json
```

| Field | Default | Description |
|---|---|---|
| `defaultLaunchMode` | `continue` | Launch mode used on startup |
| `defaultProvider` | `Claude` | AI provider |
| `defaultModel` | `sonnet` | Model preset |
| `defaultBypass` | `false` | Bypass permissions toggle |
| `defaultLanguage` | `zh-CN` | UI language |
| `defaultTheme` | `light` | UI theme |
| `projects` | `[]` | Saved project list (max 20 recent + favorites) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop shell | Tauri v2 (Rust) |
| UI framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand v5 |
| Build tool | Vite 7 + pnpm |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

```powershell
# Run type check before submitting
pnpm tsc --noEmit
```

---

## License

[MIT](LICENSE) © 2026 David (YoyoDavidGo)
