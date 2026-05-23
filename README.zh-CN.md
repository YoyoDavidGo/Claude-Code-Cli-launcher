<div align="center">
  <img src="src-tauri/icons/128x128.png" width="96" alt="Claude Code Launcher" />
  <h1>Claude Code Launcher</h1>
  <p>Windows 上 <a href="https://claude.ai/code">Claude Code CLI</a> 的轻量级图形启动器</p>

  <p>
    <a href="README.md">English</a> · <a href="README.zh-CN.md"><b>中文</b></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/平台-Windows-0078D4?logo=windows" alt="platform" />
    <img src="https://img.shields.io/badge/版本-0.1.0-orange" alt="version" />
    <img src="https://img.shields.io/badge/许可证-MIT-green" alt="license" />
    <img src="https://img.shields.io/badge/Tauri-v2-24C8D8?logo=tauri" alt="tauri" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="react" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="typescript" />
  </p>
</div>

---

## 界面截图

<div align="center">
  <img src="docs/screenshot.png" alt="Claude Code Launcher 界面" width="800" />
</div>

---

## 功能特性

- **项目管理** — 通过文件夹选择器添加项目，支持设置备注别名、收藏置顶，自动记录最近 20 个项目
- **Git 分支选择** — 显示当前分支，启动前可直接切换分支
- **启动模式** — 新会话 · Continue 上次会话 · Resume 选择历史会话
- **Agent View 模式** — 一键启动 `claude agents`，直接打开 Agents 控制面板
- **多服务商模型支持** — 自动从 `.claude/settings.json` 检测服务商与模型：
  - Claude (Anthropic) · DeepSeek · OpenAI · Gemini · Kimi (月之暗面) · Qwen (阿里云) · 自定义接口
- **命令预览** — 底部实时显示即将执行的完整 `claude` 命令，支持一键复制
- **权限模式** — 对可信项目开启 `--permission-mode bypassPermissions`，跳过权限确认
- **主题与语言** — 亮色 / 暗色主题 · 简体中文 / English 界面切换

---

## 环境要求

| 依赖 | 说明 |
|---|---|
| Windows 10 / 11 | 通过 Windows Terminal 或 PowerShell 启动 Claude |
| [Claude Code CLI](https://claude.ai/code) | 需已安装并可在终端直接调用 `claude` |
| Node.js ≥ 20 + pnpm ≥ 9 | 仅从源码构建时需要 |
| Rust (stable) | 仅从源码构建时需要 |

---

## 安装方式

### 下载安装包（推荐）

前往 [Releases](https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher/releases) 下载最新的 `.msi` 或 `.exe` 安装包。

### 从源码构建

```powershell
# 1. 克隆仓库
git clone https://github.com/YoyoDavidGo/Claude-Code-Cli-launcher.git
cd Claude-Code-Cli-launcher

# 2. 安装依赖
pnpm install

# 3. 开发模式（前端热更新，Rust 自动重编译）
pnpm tauri dev

# 4. 生产构建 → 安装包输出至 src-tauri/target/release/bundle/
pnpm tauri build
```

---

## 使用方法

1. **选择项目** — 直接输入路径，或点击 **选择目录** 通过文件夹浏览器选择
2. **选择分支** — Git 分支面板显示当前分支，点击下拉菜单可在启动前切换
3. **选择启动模式**
   - `新会话` — 开启一次全新的 Claude Code 会话
   - `Continue` — 续接上次会话（`--continue`）
   - `Resume` — 从历史会话列表中选择一次恢复（`--resume`）
4. **配置模型** — 服务商与模型会从 `.claude/settings.json` 自动检测，也可手动覆盖
5. **预览并启动** — 检查底部命令预览，点击 **启动** 即可

> **Agent View 模式** — 点击顶部工具栏的模式切换按钮，进入 `claude agents` 模式。

---

## 配置文件

配置自动保存至：

```
%APPDATA%\com.claudecodelauncher.app\config.json
```

| 字段 | 默认值 | 说明 |
|---|---|---|
| `defaultLaunchMode` | `continue` | 启动时的默认启动模式 |
| `defaultProvider` | `Claude` | 默认 AI 服务商 |
| `defaultModel` | `sonnet` | 默认模型预设 |
| `defaultBypass` | `false` | 是否默认开启绕过权限 |
| `defaultLanguage` | `zh-CN` | 界面语言 |
| `defaultTheme` | `light` | 界面主题 |
| `projects` | `[]` | 保存的项目列表（最多 20 个最近 + 收藏） |

---

## 技术栈

| 层级 | 技术 |
|---|---|
| 桌面壳 | Tauri v2 (Rust) |
| UI 框架 | React 19 + TypeScript |
| 样式 | Tailwind CSS v4 |
| 状态管理 | Zustand v5 |
| 构建工具 | Vite 7 + pnpm |

---

## 参与贡献

欢迎提交 Pull Request。重大改动请先开 Issue 讨论。

```powershell
# 提交前请先运行类型检查
pnpm tsc --noEmit
```

---

## 许可证

[MIT](LICENSE) © 2026 David (YoyoDavidGo)
