<div align="center">
  <img src="src-tauri/icons/128x128.png" width="96" alt="Claude Code Launcher" />
  <h1>Claude Code Launcher</h1>
  <p>Skip the terminal gymnastics. Launch <a href="https://claude.ai/code">Claude Code</a> from a clean GUI — no commands to memorize.</p>

  <p>
    <a href="README.md"><b>English</b></a> · <a href="README.zh-CN.md">中文</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-0078D4" alt="platform" />
    <img src="https://img.shields.io/badge/version-0.1.1-orange" alt="version" />
    <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
    <img src="https://img.shields.io/badge/Tauri-v2-24C8D8?logo=tauri" alt="tauri" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="react" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="typescript" />
  </p>
</div>

---

## Why This Exists

Using Claude Code normally looks like this:

```
1. Find your project folder in File Explorer
2. Right-click → Open Terminal
3. Type:  claude --continue --model claude-sonnet-4-5 --permission-mode bypassPermissions
4. Realize you forgot --resume to pick a specific conversation
5. Start over.
```

It's tedious for beginners and repetitive for everyone else.

**Claude Code Launcher wraps that entire workflow in a GUI:**

- **Pick your project** from a saved list — no more navigating folders in a terminal
- **Open a terminal at your project** in one click — no right-clicking in File Explorer
- **Toggle bypass permissions** with a switch — no more memorizing `--permission-mode bypassPermissions`
- **Choose your conversation** visually — New / Continue / Resume, right there as a radio button
- **See the exact command** being built in real time before you hit Launch

If you're an experienced user, think of it as a project manager for your Claude Code sessions — one app to organize all your codebases, switch Git branches, configure models, and launch instantly.

---

## Screenshots

**☀️ Light Mode — Normal Launch**

![Light mode - normal launch](docs/screenshot-light-normal-en.png)

**🕶 Light Mode — Cheatsheet**

![Light mode - cheatsheet](docs/screenshot-light-cheatsheet-en.png)

**🌙 Dark Mode — Agent View**

![Dark mode - agent view](docs/screenshot-dark-agent-en.png)

---

## Features

| | Feature | What it replaces |
|---|---|---|
| 📁 | Project list with favorites & aliases | Navigating to folders manually every time |
| 🖥 | **Open Terminal** — open a shell at the project folder | Right-click → Open in Terminal |
| 🌿 | Git branch selector | `git checkout` before launching |
| 💬 | New · Continue · Resume session modes | Memorizing `--continue` / `--resume` flags |
| 🤖 | Agent View mode (`claude agents`) | Typing the agents subcommand |
| 🔓 | Bypass permissions toggle | Typing `--permission-mode bypassPermissions` |
| 🧠 | Auto-detects model from `.claude/settings.json` | Manually specifying `--model` every time |
| 👁 | Live command preview + copy | Guessing what flags were applied |
| 📋 | Built-in Claude Code cheatsheet | Searching the web for CLI flags |
| 🎨 | Light / Dark theme, zh-CN / English UI | — |

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Windows / macOS / Linux | Cross-platform — built with Tauri v2 |
| [Claude Code CLI](https://claude.ai/code) | Must be installed and callable as `claude` |
| Node.js ≥ 20 + pnpm ≥ 9 | Only needed for building from source |
| Rust (stable) | Only needed for building from source |

---

## Installation

### Download Release (Recommended)

Go to [Releases](https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher/releases) and download the latest installer for your platform.

### Build from Source

```powershell
git clone https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher.git
cd Claude-Code-Cli-launcher

pnpm install

# Dev mode (hot-reload frontend)
pnpm tauri dev

# Production build → installer in src-tauri/target/release/bundle/
pnpm tauri build
```

---

## Usage

1. **Add a project** — click **Choose Directory** or type the path directly; it's saved for next time
2. **Open a terminal** (optional) — click **Open Terminal** to jump straight to the project folder in your shell
3. **Pick a branch** — the Git panel shows your current branch; switch before launching if needed
4. **Choose session mode**
   - `New Session` — fresh start
   - `Continue` — picks up the last conversation (`--continue`)
   - `Resume` — shows a list of past conversations to choose from (`--resume`)
5. **Configure the model** — auto-detected from `.claude/settings.json`; override anytime
6. **Check the preview** — the bottom bar shows the exact command; click **Copy** or just **Launch**

> Switch to **Agent View** from the top toolbar to open the `claude agents` dashboard instead.

---

## Configuration

Auto-saved to the app data directory (platform-dependent, e.g. `%APPDATA%\com.claudecodelauncher.app\config.json` on Windows).

| Field | Default | Description |
|---|---|---|
| `defaultLaunchMode` | `continue` | Session mode on startup |
| `defaultProvider` | `Claude` | AI provider |
| `defaultModel` | `sonnet` | Model preset |
| `defaultBypass` | `false` | Bypass permissions on/off |
| `defaultLanguage` | `zh-CN` | UI language |
| `defaultTheme` | `light` | UI theme |
| `projects` | `[]` | Saved projects (max 20 recent + unlimited favorites) |

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

PRs are welcome. For major changes, open an issue first.

```powershell
pnpm tsc --noEmit   # type-check before submitting
```

---

## License

[MIT](LICENSE) © 2026 David (YoyoDavidGo)
