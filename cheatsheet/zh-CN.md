<!--
CCL-CHEATSHEET
schema: 1
lang: zh-CN
version: 2026.05.24
updatedAt: 2026-05-24
source: official-docs
-->


# Claude Code 命令

## /agents

> 管理子代理

### 说明

管理 agent 配置。

### 用法

~~~text
/agents
~~~

## /clear

> 清空上下文

### 说明

以空上下文开始新对话。先前对话仍可在 /resume 中找到。传入 name 可在 /resume 选择器中为先前对话加标签。若想在继续同一对话的同时释放上下文，请改用 /compact。别名：/reset、/new。

### 用法

~~~text
/clear [name]
~~~

## /compact

> 压缩上下文

### 说明

通过总结目前为止的对话来释放上下文。可选传入聚焦指令。参见压缩如何处理规则、skills 和记忆文件。

### 用法

~~~text
/compact [instructions]
~~~

## /config

> 打开设置

### 说明

打开设置界面以调整主题、模型、output style 和其它偏好。别名：/settings。

### 用法

~~~text
/config
~~~

## /context

> 查看上下文

### 说明

将当前上下文用量可视化为彩色网格。显示对上下文占用较多的工具、记忆膨胀的优化建议和容量警告。全屏模式下逐项明细会折叠以保持网格可见，传入 all 可展开。

### 用法

~~~text
/context [all]
~~~

## /cost

> 查看用量

### 说明

/usage 的别名。

### 用法

~~~text
/cost
~~~

## /help

> 查看帮助

### 说明

显示帮助和可用命令。

### 用法

~~~text
/help
~~~

## /init

> 初始化项目

### 说明

用 CLAUDE.md 指南初始化项目。设置 CLAUDE_CODE_NEW_INIT=1 可进入交互式流程，同时引导设置 skills、hooks 和个人记忆文件。

### 用法

~~~text
/init
~~~

## /model

> 切换模型

### 说明

设置当前会话的 AI 模型。对支持的模型，用左右方向键调整 effort 等级。不带参数时打开选择器；在某行按 d 可同时将该模型保存为新会话的默认。当对话已有先前输出时，选择器会请求确认，因为下一次响应会在无缓存上下文的情况下重新读取完整历史。确认后立即生效，无需等待当前响应结束。

### 用法

~~~text
/model [model]
~~~

## /permissions

> 管理权限

### 说明

管理工具权限的 allow、ask 和 deny 规则。打开交互式对话框，可按作用域查看规则、增删规则、管理工作目录，以及查看近期 auto 模式的拒绝记录。别名：/allowed-tools。

### 用法

~~~text
/permissions
~~~

## /resume

> 恢复会话

### 说明

按 ID 或名称恢复对话，或打开会话选择器。自 v2.1.144 起，后台会话在选择器中以 bg 标记出现。别名：/continue。

### 用法

~~~text
/resume [session]
~~~

## /review

> 评审PR

### 说明

在当前会话中本地评审一个 pull request。如需更深入的云端评审，参见 /ultrareview。

### 用法

~~~text
/review [PR]
~~~

## /usage

> 查看用量

### 说明

显示会话花费、套餐用量上限和活动统计。订阅相关细节参见费用追踪指南。/cost 和 /stats 是别名。

### 用法

~~~text
/usage
~~~

# Claude Code 操作

## Ctrl + C

> 中断或清空

### 说明

中断，或清空输入。

### 用法

~~~text
Ctrl + C
~~~

## Ctrl + L

> 重绘屏幕

### 说明

重绘屏幕。

### 用法

~~~text
Ctrl + L
~~~

## Ctrl + O

> 切换记录查看

### 说明

切换 transcript 查看器。

### 用法

~~~text
Ctrl + O
~~~

## Ctrl + R

> 反向搜历史

### 说明

反向搜索命令历史。

### 用法

~~~text
Ctrl + R
~~~

## Ctrl + V

> 粘贴图片

### 说明

从剪贴板粘贴图片。

### 用法

~~~text
Ctrl + V
~~~

## Esc

> 中断Claude

### 说明

中断 Claude。

### 用法

~~~text
Esc
~~~

## Esc + Esc

> 清草稿或回退

### 说明

清空输入草稿，或回退。

### 用法

~~~text
Esc + Esc
~~~

## Shift + Tab

> 切换权限模式

### 说明

循环切换权限模式。

### 用法

~~~text
Shift + Tab
~~~

## Option + P

> 切换模型

### 说明

切换模型。

### 用法

~~~text
Option + P
~~~

## Shift + Enter

> 换行输入

### 说明

Shift+Enter — 在 iTerm2、WezTerm、Ghostty、Kitty、Warp、Apple Terminal、Windows Terminal 中原生支持。

### 用法

~~~text
Shift + Enter
~~~

## Ctrl + J

> 换行输入

### 说明

控制序列 — 在任意终端中无需配置即可用。

### 用法

~~~text
Ctrl + J
~~~

## @

> 提及文件路径

### 说明

文件路径提及。

### 用法

~~~text
@
~~~

---

> 以下为不常用内容

# Claude Code 命令

## /add-dir

> 添加工作目录

### 说明

为当前会话添加一个用于文件访问的工作目录。大部分 .claude/ 配置不会从添加的目录中发现。之后可用 --continue 或 --resume 从该目录恢复会话。

### 用法

~~~text
/add-dir
~~~

## /autofix-pr

> 自动修复PR

### 说明

启动一个 Claude Code on the web 会话，监视当前分支的 PR，并在 CI 失败或评审者留言时推送修复。通过 gh pr view 从已检出的分支检测打开的 PR；要监视其它 PR，请先检出其分支。默认让远程会话修复所有 CI 失败和评审意见；传入 prompt 可给出不同指令，例如 /autofix-pr only fix lint and type errors。需要 gh CLI 和 Claude Code on the web 访问权限。

### 用法

~~~text
/autofix-pr [prompt]
~~~

## /background

> 转后台运行

### 说明

将当前会话分离为后台 agent 运行，释放当前终端。传入 prompt 可在分离前再发送一条指令。用 claude agents 监视会话。别名：/bg。

### 用法

~~~text
/background [prompt]
~~~

## /batch

> 批量改动

### 说明

并行编排跨代码库的大规模改动。研究代码库，将工作拆分为 5 到 30 个独立单元并给出计划。批准后，在隔离的 git worktree 中为每个单元启动一个后台子代理。每个子代理实现其单元、运行测试并打开一个 pull request。需要 git 仓库。示例：/batch migrate src/ from Solid to React。

### 用法

~~~text
/batch
~~~

## /branch

> 分支对话

### 说明

在当前位置创建对话分支。切换到该分支并保留原对话，可用 /resume 返回。别名：/fork。当设置了 CLAUDE_CODE_FORK_SUBAGENT 时，/fork 改为启动一个分叉子代理，不再是本命令的别名。

### 用法

~~~text
/branch [name]
~~~

## /btw

> 顺便提问

### 说明

提一个简短的旁支问题，不计入对话。

### 用法

~~~text
/btw
~~~

## /chrome

> 配置Chrome

### 说明

配置 Claude in Chrome 设置。

### 用法

~~~text
/chrome
~~~

## /claude-api

> 加载API资料

### 说明

为你项目的语言（Python、TypeScript、Java、Go、Ruby、C#、PHP 或 cURL）加载 Claude API 参考资料及 Managed Agents 参考。涵盖工具使用、流式、批处理、结构化输出和常见陷阱。当代码导入 anthropic 或 @anthropic-ai/sdk 时也会自动激活。运行 /claude-api migrate 将现有 Claude API 代码升级到更新的模型：Claude 询问要扫描哪些文件、目标模型，然后更新版本间变化的模型 ID、thinking 配置和其它参数。运行 /claude-api managed-agents-onboard 进入交互式向导，从零创建一个新的 Managed Agent。

### 用法

~~~text
/claude-api [migrate|managed-agents-onboard]
~~~

## /code-review

> 代码评审

### 说明

评审当前 diff 的正确性缺陷并报告发现，不修改文件。较低的 effort 等级返回更少、更高置信度的发现，high 到 max 覆盖更广但可能包含不确定的发现。不带 effort 参数时使用会话当前的 effort。传入 --comment 将发现作为内联评论发布到当前 GitHub PR。传入路径或 PR 引用可评审指定目标。原为 /simplify，仍作为别名可用。

### 用法

~~~text
/code-review [low|medium|high|xhigh|max] [--comment] [target]
~~~

## /color

> 设置提示栏色

### 说明

设置当前会话的提示栏颜色。可用颜色：red、blue、green、yellow、purple、orange、pink、cyan。用 default 重置，或不带参数运行随机选色。当连接 Remote Control 时，颜色会同步到 claude.ai/code。

### 用法

~~~text
/color [color|default]
~~~

## /copy

> 复制回复

### 说明

复制最后一条助手回复到剪贴板。传入数字 N 可复制倒数第 N 条：/copy 2 复制倒数第二条。存在代码块时，显示交互式选择器以选择单个代码块或完整回复。在选择器中按 w 可将所选内容写入文件而非剪贴板，在 SSH 下很有用。

### 用法

~~~text
/copy [N]
~~~

## /debug

> 调试日志

### 说明

为当前会话启用调试日志，并通过读取会话调试日志排查问题。除非以 claude --debug 启动，否则调试日志默认关闭，因此会话中途运行 /debug 会从该时刻起开始捕获日志。可选描述问题以聚焦分析。

### 用法

~~~text
/debug [description]
~~~

## /desktop

> 转桌面应用

### 说明

在 Claude Code 桌面应用中继续当前会话。需要 macOS 或 Windows 及 Claude 订阅。别名：/app。

### 用法

~~~text
/desktop
~~~

## /diff

> 查看差异

### 说明

打开交互式 diff 查看器，显示未提交改动和每轮 diff。用左右方向键在当前 git diff 与各个 Claude 轮次之间切换，用上下键浏览文件。

### 用法

~~~text
/diff
~~~

## /doctor

> 检查环境

### 说明

诊断并验证你的 Claude Code 安装与设置。结果带状态图标显示。按 f 可让 Claude 修复报告的问题。

### 用法

~~~text
/doctor
~~~

## /effort

> 设置努力级

### 说明

设置模型 effort 等级。接受 low、medium、high、xhigh 或 max；可用等级取决于模型，max 仅限当前会话。auto 重置为模型默认。不带参数时打开交互式滑块；用左右方向键选择等级，回车应用。立即生效，无需等待当前响应结束。

### 用法

~~~text
/effort [level|auto]
~~~

## /exit

> 退出CLI

### 说明

退出 CLI。在已连接的后台会话中，这会分离而会话继续运行。别名：/quit。

### 用法

~~~text
/exit
~~~

## /export

> 导出对话

### 说明

将当前对话导出为纯文本。带文件名时直接写入该文件。不带时打开对话框以复制到剪贴板或保存到文件。

### 用法

~~~text
/export [filename]
~~~

## /fast

> 切换快速模式

### 说明

开启或关闭 fast mode。

### 用法

~~~text
/fast [on|off]
~~~

## /feedback

> 提交反馈

### 说明

提交反馈、报告 bug 或分享你的对话。别名：/bug、/share。

### 用法

~~~text
/feedback [report]
~~~

## /fewer-permission-prompts

> 减少权限提示

### 说明

扫描你的会话记录中常见的只读 Bash 和 MCP 工具调用，然后向项目 .claude/settings.json 添加一份按优先级排序的允许列表以减少权限提示。

### 用法

~~~text
/fewer-permission-prompts
~~~

## /focus

> 切换聚焦视图

### 说明

切换聚焦视图，只显示你最后的 prompt、带编辑 diffstat 的单行工具调用摘要和最终回复。该选择跨会话保留；在设置中设 viewMode 可覆盖。仅在全屏渲染下可用。

### 用法

~~~text
/focus
~~~

## /goal

> 设定目标

### 说明

设定一个目标：Claude 会跨多轮持续工作直到条件满足。不带参数时显示当前或最近达成的目标。clear、stop、off、reset、none 或 cancel 可提前移除活动目标。

### 用法

~~~text
/goal [condition|clear]
~~~

## /heapdump

> 导出堆快照

### 说明

将 JavaScript 堆快照和内存明细写入 ~/Desktop（在没有 Desktop 文件夹的 Linux 上写入主目录），用于诊断高内存占用。参见故障排查。

### 用法

~~~text
/heapdump
~~~

## /hooks

> 查看钩子

### 说明

查看工具事件的 hook 配置。

### 用法

~~~text
/hooks
~~~

## /ide

> 管理IDE集成

### 说明

管理 IDE 集成并显示状态。

### 用法

~~~text
/ide
~~~

## /insights

> 生成洞察报告

### 说明

生成一份分析你 Claude Code 会话的报告，包括项目领域、交互模式和摩擦点。

### 用法

~~~text
/insights
~~~

## /install-github-app

> 安装GitHub应用

### 说明

为某仓库设置 Claude GitHub Actions 应用。引导你选择仓库并配置集成。

### 用法

~~~text
/install-github-app
~~~

## /install-slack-app

> 安装Slack应用

### 说明

安装 Claude Slack 应用。打开浏览器完成 OAuth 流程。

### 用法

~~~text
/install-slack-app
~~~

## /keybindings

> 编辑快捷键

### 说明

打开或创建你的快捷键配置文件。

### 用法

~~~text
/keybindings
~~~

## /login

> 登录账户

### 说明

登录你的 Anthropic 账户。

### 用法

~~~text
/login
~~~

## /logout

> 退出账户

### 说明

退出你的 Anthropic 账户。

### 用法

~~~text
/logout
~~~

## /loop

> 循环运行

### 说明

在会话保持打开时反复运行某个 prompt。省略 interval 时 Claude 自行把握每次迭代的节奏。省略 prompt 时，在可用情况下 Claude 运行自主维护检查或 .claude/loop.md 中的 prompt。示例：/loop 5m check if the deploy finished。参见按计划运行 prompt。别名：/proactive。

### 用法

~~~text
/loop [interval] [prompt]
~~~

## /mcp

> 管理MCP

### 说明

管理 MCP 服务器连接和 OAuth 认证。

### 用法

~~~text
/mcp
~~~

## /memory

> 编辑记忆

### 说明

编辑 CLAUDE.md 记忆文件，启用或禁用 auto-memory，并查看 auto-memory 条目。

### 用法

~~~text
/memory
~~~

## /mobile

> 下载移动应用

### 说明

显示二维码以下载 Claude 移动应用。别名：/ios、/android。

### 用法

~~~text
/mobile
~~~

## /passes

> 赠送体验周

### 说明

与朋友分享一周免费的 Claude Code。仅在账户符合条件时可见。

### 用法

~~~text
/passes
~~~

## /plan

> 进入计划模式

### 说明

直接从提示进入计划模式。可传入描述以进入计划模式并立即以该任务开始，例如 /plan fix the auth bug。

### 用法

~~~text
/plan [description]
~~~

## /plugin

> 管理插件

### 说明

管理 Claude Code 插件。

### 用法

~~~text
/plugin
~~~

## /powerup

> 功能小课

### 说明

通过带动画演示的快速交互式小课了解 Claude Code 功能。

### 用法

~~~text
/powerup
~~~

## /pr-comments

> 查看PR评论

### 说明

已在 v2.1.91 移除，请改为直接让 Claude 查看 pull request 评论。在更早版本中，获取并显示 GitHub pull request 的评论；自动检测当前分支的 PR，或传入 PR URL 或编号。需要 gh CLI。

### 用法

~~~text
/pr-comments [PR]
~~~

## /privacy-settings

> 隐私设置

### 说明

查看并更新你的隐私设置。仅 Pro 和 Max 套餐订阅者可用。

### 用法

~~~text
/privacy-settings
~~~

## /radio

> 打开电台

### 说明

在浏览器中打开 Claude FM lo-fi 电台。无可用浏览器时打印流地址。在 Bedrock、Vertex 或 Foundry 上不可用。

### 用法

~~~text
/radio
~~~

## /recap

> 会话摘要

### 说明

按需生成当前会话的一行摘要。参见会话回顾，了解离开后自动出现的回顾。

### 用法

~~~text
/recap
~~~

## /release-notes

> 查看更新日志

### 说明

在交互式版本选择器中查看更新日志。选择特定版本查看其发布说明，或选择显示所有版本。

### 用法

~~~text
/release-notes
~~~

## /reload-plugins

> 重载插件

### 说明

重新加载所有活动插件以应用待定改动，无需重启。报告每个重载组件的数量并标记任何加载错误。

### 用法

~~~text
/reload-plugins
~~~

## /remote-control

> 开启远程控制

### 说明

使本会话可从 claude.ai 远程控制。别名：/rc。

### 用法

~~~text
/remote-control
~~~

## /remote-env

> 配置远程环境

### 说明

为以 --remote 启动的 web 会话配置默认远程环境。

### 用法

~~~text
/remote-env
~~~

## /rename

> 重命名会话

### 说明

重命名当前会话并在提示栏显示名称。不带名称时，从对话历史自动生成一个。

### 用法

~~~text
/rename [name]
~~~

## /rewind

> 回退对话

### 说明

将对话和/或代码回退到先前某个点，或从所选消息开始总结。参见 checkpointing。别名：/checkpoint、/undo。

### 用法

~~~text
/rewind
~~~

## /run

> 运行应用

### 说明

启动并驱动你项目的应用，在运行中的应用里看到改动生效，而不只是在测试中。参见运行并验证你的应用。需要 Claude Code v2.1.145 或更高版本。

### 用法

~~~text
/run
~~~

## /run-skill-generator

> 教学运行方式

### 说明

教 /run 和 /verify 如何从干净环境构建、启动并驱动你项目的应用，方法是写一个项目专属 skill。需要 Claude Code v2.1.145 或更高版本。

### 用法

~~~text
/run-skill-generator
~~~

## /sandbox

> 切换沙箱

### 说明

切换沙箱模式。仅在受支持的平台上可用。

### 用法

~~~text
/sandbox
~~~

## /schedule

> 计划任务

### 说明

创建、更新、列出或运行 routines，它们在 Anthropic 托管的云基础设施上执行。Claude 会以对话方式引导你完成设置。别名：/routines。

### 用法

~~~text
/schedule [description]
~~~

## /scroll-speed

> 调滚动速度

### 说明

交互式调整鼠标滚轮滚动速度，对话框打开时可滚动标尺预览变化。仅在全屏渲染下可用，JetBrains IDE 终端中不可用。

### 用法

~~~text
/scroll-speed
~~~

## /security-review

> 安全评审

### 说明

分析当前分支的待定改动中的安全漏洞。评审 git diff 并识别注入、认证问题和数据暴露等风险。

### 用法

~~~text
/security-review
~~~

## /setup-bedrock

> 配置Bedrock

### 说明

通过交互式向导配置 Amazon Bedrock 认证、区域和模型固定。仅在设置 CLAUDE_CODE_USE_BEDROCK=1 时可见。首次使用 Bedrock 的用户也可从登录界面进入此向导。

### 用法

~~~text
/setup-bedrock
~~~

## /setup-vertex

> 配置Vertex

### 说明

通过交互式向导配置 Google Vertex AI 认证、项目、区域和模型固定。仅在设置 CLAUDE_CODE_USE_VERTEX=1 时可见。首次使用 Vertex AI 的用户也可从登录界面进入此向导。

### 用法

~~~text
/setup-vertex
~~~

## /skills

> 列出技能

### 说明

列出可用的 skills。按 t 按 token 数排序。按 Space 将某个 skill 对 Claude 或 / 菜单隐藏，再按 Enter 保存。

### 用法

~~~text
/skills
~~~

## /stats

> 查看统计

### 说明

/usage 的别名，打开时定位到 Stats 标签。

### 用法

~~~text
/stats
~~~

## /status

> 查看状态

### 说明

打开设置界面（Status 标签），显示版本、模型、账户和连接情况。在 Claude 响应时也可用，无需等待当前响应结束。

### 用法

~~~text
/status
~~~

## /statusline

> 配置状态栏

### 说明

配置 Claude Code 的状态行。描述你想要的样子，或不带参数运行以从你的 shell 提示自动配置。

### 用法

~~~text
/statusline
~~~

## /stickers

> 订购贴纸

### 说明

订购 Claude Code 贴纸。

### 用法

~~~text
/stickers
~~~

## /stop

> 停止后台会话

### 说明

停止当前后台会话。仅在连接到后台会话时可用；记录和任何 worktree 都会保留。要分离而不停止，请用 /exit 或按 ←。

### 用法

~~~text
/stop
~~~

## /tasks

> 管理后台任务

### 说明

列出并管理后台任务。也可用 /bashes。

### 用法

~~~text
/tasks
~~~

## /team-onboarding

> 生成上手指南

### 说明

从你的 Claude Code 使用历史生成团队上手指南。Claude 分析你过去 30 天的会话、命令和 MCP 服务器使用，生成一份 markdown 指南，队友可作为第一条消息粘贴以快速上手。对 Pro、Max、Team 和 Enterprise 套餐的 claude.ai 订阅者，还会返回一个队友可直接在 Claude Code 中打开的分享链接。

### 用法

~~~text
/team-onboarding
~~~

## /teleport

> 拉取Web会话

### 说明

将一个 Claude Code on the web 会话拉入当前终端：打开选择器，然后获取分支和对话。也可用 /tp。需要 claude.ai 订阅。

### 用法

~~~text
/teleport
~~~

## /terminal-setup

> 配置终端键位

### 说明

为 Shift+Enter 和其它快捷键配置终端键位绑定。仅在需要的终端中可见，如 VS Code、Cursor、Windsurf、Alacritty 或 Zed。

### 用法

~~~text
/terminal-setup
~~~

## /theme

> 切换主题

### 说明

更改配色主题。包含匹配终端浅色或深色背景的 auto 选项、浅色和深色变体、色盲友好（daltonized）主题、使用终端调色板的 ANSI 主题，以及来自 ~/.claude/themes/ 或插件的自定义主题。选择 New custom theme… 可创建一个。

### 用法

~~~text
/theme
~~~

## /tui

> 设置渲染器

### 说明

设置终端 UI 渲染器并带着完整对话重新启动进入。fullscreen 启用无闪烁的备用屏渲染器。不带参数时打印当前渲染器。

### 用法

~~~text
/tui [default|fullscreen]
~~~

## /ultraplan

> 起草计划

### 说明

在 ultraplan 会话中起草计划，在浏览器中评审，然后远程执行或发回你的终端。

### 用法

~~~text
/ultraplan
~~~

## /ultrareview

> 深度评审

### 说明

在云沙箱中用 ultrareview 运行深度的多代理代码评审。Pro 和 Max 含 3 次免费运行，之后需要用量额度。

### 用法

~~~text
/ultrareview [PR]
~~~

## /upgrade

> 升级套餐

### 说明

打开升级页面以切换到更高的套餐层级。

### 用法

~~~text
/upgrade
~~~

## /usage-credits

> 配置用量额度

### 说明

配置用量额度，以便在达到上限时继续工作。原为 /extra-usage。

### 用法

~~~text
/usage-credits
~~~

## /verify

> 验证改动

### 说明

通过构建、运行你项目的应用并观察结果来确认代码改动符合预期，而不依赖测试或类型检查。参见运行并验证你的应用。需要 Claude Code v2.1.145 或更高版本。

### 用法

~~~text
/verify
~~~

## /vim

> 已移除Vim

### 说明

已在 v2.1.92 移除。要在 Vim 和 Normal 编辑模式间切换，请用 /config → Editor mode。

### 用法

~~~text
/vim
~~~

## /voice

> 语音输入

### 说明

切换语音听写，或以特定模式启用。需要 Claude.ai 账户。

### 用法

~~~text
/voice [hold|tap|off]
~~~

## /web-setup

> 连接Web

### 说明

用你本地的 gh CLI 凭据将 GitHub 账户连接到 Claude Code on the web。若未连接 GitHub，/schedule 会自动提示进行此操作。

### 用法

~~~text
/web-setup
~~~

# Claude Code 操作

## Ctrl + X Ctrl + K

> 终止后台代理

### 说明

终止本会话中所有运行的后台子代理。3 秒内按两次确认。

### 用法

~~~text
Ctrl + X Ctrl + K
~~~

## Ctrl + D

> 退出会话

### 说明

退出 Claude Code 会话。

### 用法

~~~text
Ctrl + D
~~~

## Ctrl + G

> 外部编辑器打开

### 说明

在默认文本编辑器中打开。

### 用法

~~~text
Ctrl + G
~~~

## Ctrl + B

> 后台运行任务

### 说明

后台运行任务。

### 用法

~~~text
Ctrl + B
~~~

## Ctrl + T

> 切换任务列表

### 说明

切换任务列表。

### 用法

~~~text
Ctrl + T
~~~

## Left/Right arrows

> 切换对话框签

### 说明

在对话框标签间循环。

### 用法

~~~text
Left/Right arrows
~~~

## Up/Down arrows

> 移光标或历史

### 说明

移动光标或浏览命令历史。

### 用法

~~~text
Up/Down arrows
~~~

## Option + T

> 切换扩展思考

### 说明

切换 extended thinking。

### 用法

~~~text
Option + T
~~~

## Option + O

> 切换快速模式

### 说明

切换 fast mode。

### 用法

~~~text
Option + O
~~~

## Ctrl + A

> 移到行首

### 说明

将光标移到当前行首。

### 用法

~~~text
Ctrl + A
~~~

## Ctrl + E

> 移到行尾

### 说明

将光标移到当前行尾。

### 用法

~~~text
Ctrl + E
~~~

## Ctrl + K

> 删到行尾

### 说明

删除到行尾。

### 用法

~~~text
Ctrl + K
~~~

## Ctrl + U

> 删到行首

### 说明

从光标删除到行首。

### 用法

~~~text
Ctrl + U
~~~

## Ctrl + W

> 删除前一词

### 说明

删除前一个单词。

### 用法

~~~text
Ctrl + W
~~~

## Ctrl + Y

> 粘贴已删文本

### 说明

粘贴已删除的文本。

### 用法

~~~text
Ctrl + Y
~~~

## Alt + Y

> 循环粘贴历史

### 说明

循环粘贴历史。

### 用法

~~~text
Alt + Y
~~~

## Alt + B

> 后退一词

### 说明

光标后退一个单词。

### 用法

~~~text
Alt + B
~~~

## Alt + F

> 前进一词

### 说明

光标前进一个单词。

### 用法

~~~text
Alt + F
~~~

## \ + Enter

> 换行输入

### 说明

快速转义 — 在所有终端中可用。

### 用法

~~~text
\ + Enter
~~~

## Option + Enter

> 换行输入

### 说明

Option 键 — 在 macOS 上启用 Option as Meta 之后。

### 用法

~~~text
Option + Enter
~~~

## Paste directly

> 直接粘贴

### 说明

粘贴模式 — 用于代码块、日志。

### 用法

~~~text
Paste directly
~~~

## / at start

> 命令或技能

### 说明

命令或 skill。

### 用法

~~~text
/ at start
~~~

## ! at start

> Shell模式

### 说明

Shell 模式。

### 用法

~~~text
! at start
~~~

## ?

> 切换帮助面板

### 说明

切换键盘快捷键帮助面板。需要全屏渲染。

### 用法

~~~text
?
~~~

## { / }

> 跳转提示

### 说明

跳到上一条或下一条用户 prompt，类似 vim 段落移动。需要全屏渲染。

### 用法

~~~text
{ / }
~~~

## [

> 写入回滚缓冲

### 说明

将完整对话写入终端原生 scrollback，使 Cmd+F、tmux 复制模式等原生工具可搜索。需要全屏渲染。

### 用法

~~~text
[
~~~

## v

> 编辑器开对话

### 说明

将对话写入临时文件并在 $VISUAL 或 $EDITOR 中打开。需要全屏渲染。

### 用法

~~~text
v
~~~

## q

> 退出记录查看

### 说明

退出 transcript 视图。这三个键都可通过 transcript:exit 重新绑定。

### 用法

~~~text
q
~~~

## Hold

> 语音听写

### 说明

语音听写。

### 用法

~~~text
Hold
~~~
