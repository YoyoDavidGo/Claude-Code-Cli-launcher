<!--
CCL-CHEATSHEET
schema: 1
lang: zh-CN
version: 2026.05.25
updatedAt: 2026-05-25
source: official-docs
-->


# Claude Code 命令

## /agents

> 管理 agent 配置

### 用途

管理 agent 配置

### 用法

~~~text
/agents
~~~

## /branch

> 在此点创建当前对话的分支

### 用途

在此点创建当前对话的分支。切换到分支并保留原始分支，您可以使用 /resume 返回。别名：/fork。当设置 CLAUDE_CODE_FORK_SUBAGENT 时，/fork 改为生成一个分叉的 subagent，不再是此命令的别名

### 用法

~~~text
/branch [name]
~~~

## /btw

> 提出快速附加问题

### 用途

提出快速附加问题，无需添加到对话中

### 用法

~~~text
/btw
~~~

## /clear

> 使用空上下文启动新对话

### 用途

使用空上下文启动新对话。之前的对话在 /resume 中保持可用。传递一个名称以在 /resume 选择器中标记之前的对话。要在继续同一对话的同时释放上下文，请改用 /compact。别名：/reset、/new

### 用法

~~~text
/clear [name]
~~~

## /code-review

> 审阅代码差异

### 用途

Skill. 审阅当前差异以查找正确性错误并报告发现，无需编辑文件。较低的工作量级别返回较少、更高置信度的发现，而 high 到 max 提供更广泛的覆盖范围，可能包括不确定的发现。不带工作量参数时，审阅使用会话的当前工作量。传递 --comment 以将发现作为内联评论发布到当前 GitHub PR。传递路径或 PR 参考以审阅特定目标。之前为 /simplify，仍然作为别名工作

### 用法

~~~text
/code-review [low|medium|high|xhigh|max] [--comment] [target]
~~~

## /compact

> 压缩对话上下文

### 用途

通过总结到目前为止的对话来释放上下文。可选择性地传递焦点说明以进行总结。请参阅压缩如何处理规则、skills 和内存文件

### 用法

~~~text
/compact [instructions]
~~~

## /config

> 打开设置界面以调整主题

### 用途

打开设置界面以调整主题、模型、输出样式和其他偏好设置。别名：/settings

### 用法

~~~text
/config
~~~

## /context

> 可视化上下文用量

### 用途

将当前上下文使用情况可视化为彩色网格。显示上下文密集型工具、内存膨胀和容量警告的优化建议。在全屏模式中，每项的分解被折叠以保持网格可见。传递 all 以展开它

### 用法

~~~text
/context [all]
~~~

## /diff

> 打开交互式差异查看器

### 用途

打开交互式差异查看器，显示未提交的更改和每轮差异。使用左/右箭头在当前 git 差异和单个 Claude 轮次之间切换，使用上/下浏览文件

### 用法

~~~text
/diff
~~~

## /effort

> 设置模型工作量级别

### 用途

设置模型工作量级别。接受 low、medium、high、xhigh 或 max；可用级别取决于模型，max 仅限会话。auto 重置为模型默认值。不带参数时，打开交互式滑块；使用左右箭头选择级别，按 Enter 应用。立即生效，无需等待当前响应完成

### 用法

~~~text
/effort [level|auto]
~~~

## /fast

> 切换快速模式开启或关闭

### 用途

切换快速模式开启或关闭

### 用法

~~~text
/fast [on|off]
~~~

## /goal

> 设置一个目标

### 用途

设置一个目标：Claude 在多个轮次中继续工作，直到满足条件。不带参数时，显示当前或最近实现的目标。clear、stop、off、reset、none 或 cancel 会提前移除活跃目标

### 用法

~~~text
/goal [condition|clear]
~~~

## /help

> 显示帮助和可用命令

### 用途

显示帮助和可用命令

### 用法

~~~text
/help
~~~

## /init

> 初始化项目

### 用途

使用 CLAUDE.md 指南初始化项目。设置 CLAUDE_CODE_NEW_INIT=1 以获得交互式流程，该流程还会引导您完成 skills、hooks 和个人内存文件

### 用法

~~~text
/init
~~~

## /model

> 为当前会话设置 AI 模型

### 用途

为当前会话设置 AI 模型。对于支持的模型，使用左/右箭头调整工作量级别。不带参数时，打开一个选择器；在一行上按 d 以同时将该模型保存为新会话的默认值。当对话有先前输出时，选择器要求确认，因为下一个响应会重新读取完整历史记录而不使用缓存的上下文。确认后，更改立即生效，无需等待当前响应完成

### 用法

~~~text
/model [model]
~~~

## /permissions

> 管理工具权限

### 用途

管理工具权限的允许、询问和拒绝规则。打开交互式对话框，您可以按范围查看规则、添加或删除规则、管理工作目录，以及查看最近的自动模式拒绝。别名：/allowed-tools

### 用法

~~~text
/permissions
~~~

## /rename

> 重命名会话

### 用途

重命名当前会话并在提示栏上显示名称。不使用名称时，从对话历史记录自动生成一个

### 用法

~~~text
/rename [name]
~~~

## /resume

> 按 ID 或名称恢复对话

### 用途

按 ID 或名称恢复对话，或打开会话选择器。从 v2.1.144 起，后台会话在选择器中显示，标记为 bg。别名：/continue

### 用法

~~~text
/resume [session]
~~~

## /review

> 本地审阅 PR

### 用途

在当前会话中本地审阅 pull request。要进行更深入的基于云的审阅，请参阅 /ultrareview

### 用法

~~~text
/review [PR]
~~~

## /rewind

> 回滚对话状态

### 用途

将对话和/或代码倒回到上一个点，或从选定的消息进行总结。请参阅 checkpointing。别名：/checkpoint、/undo

### 用法

~~~text
/rewind
~~~

## /skills

> 列出可用的 skills

### 用途

列出可用的 skills。按 t 按令牌计数排序。按 Space 以从 Claude 或 / 菜单中隐藏 skill，然后按 Enter 保存

### 用法

~~~text
/skills
~~~

## /status

> 打开状态选项卡

### 用途

打开设置界面（状态选项卡），显示版本、模型、账户和连接性。在 Claude 响应时工作，无需等待当前响应完成

### 用法

~~~text
/status
~~~

## /usage

> 显示会话用量

### 用途

显示会话成本、计划使用限制和活动统计。有关订阅特定的详细信息，请参阅成本跟踪指南。/cost 和 /stats 是别名

### 用法

~~~text
/usage
~~~

# Claude Code 操作

## / at start

> 输入命令或 skill

### 描述

命令或 skill

### 注释

请参阅命令和 skills

### 用法

~~~text
/斜杠命令或者skill
~~~

## @

> 引用文件路径

### 描述

文件路径提及

### 注释

触发文件路径自动完成

### 用法

~~~text
@文件路径
~~~

## ! at start

> 执行 Shell 命令

### 描述

Shell 模式

### 注释

直接运行命令并将执行输出添加到会话

### 用法

~~~text
!shell命令
~~~

## Ctrl + C

> 中断当前操作

### 描述

中断，或清除输入

### 上下文

中断正在运行的操作。如果没有任何操作在运行，第一次按下会清除提示输入，第二次按下会退出 Claude Code

### 用法

~~~text
Ctrl + C
~~~

## Ctrl + D

> 退出会话

### 描述

退出 Claude Code 会话

### 上下文

EOF 信号

### 用法

~~~text
Ctrl + D
~~~

## Ctrl + L

> 重绘屏幕

### 描述

重绘屏幕

### 上下文

强制完整的终端重绘。输入和对话历史被保留。使用此功能可在显示变得混乱或部分空白时恢复

### 用法

~~~text
Ctrl + L
~~~

## Ctrl + O

> 切换转录查看器

### 描述

切换转录查看器

### 上下文

显示详细的工具使用和执行情况。还会展开 MCP 调用，这些调用默认会折叠为单行，如"Called slack 3 times"

### 用法

~~~text
Ctrl + O
~~~

## Ctrl + R

> 反向搜索历史

### 描述

反向搜索命令历史

### 上下文

交互式搜索以前的命令

### 用法

~~~text
Ctrl + R
~~~

## Ctrl + V

> 粘贴图片

### 描述

从剪贴板粘贴图像

### 上下文

在光标处插入 [Image #N] 芯片，以便您可以在提示中按位置引用它

### 用法

~~~text
Ctrl + V
~~~

## Esc

> 中断 Claude

### 描述

中断 Claude

### 上下文

停止当前响应或工具调用中途，以便您可以重定向。Claude 保留迄今为止完成的工作

### 用法

~~~text
Esc
~~~

## Esc + Esc

> 清除输入或回退

### 描述

清除输入草稿，或回退

### 上下文

当提示输入包含文本时，双 Esc 会清除它并将草稿保存到历史记录中，以便 Up 可以调用它。当输入为空时，双 Esc 会打开回退菜单以从上一个点恢复或总结代码和对话

### 用法

~~~text
Esc + Esc
~~~

## Shift + Tab

> 循环权限模式

### 描述

循环权限模式

### 上下文

在 default、acceptEdits、plan 和您启用的任何模式（如 auto 或 bypassPermissions）之间循环。请参阅权限模式。

### 用法

~~~text
Shift + Tab
~~~

## Option + P

> 切换模型

### 描述

切换模型

### 上下文

在不清除提示的情况下切换模型

### 用法

~~~text
Option + P
~~~

## Ctrl + A

> 光标移到行首

### 描述

将光标移动到当前行的开始

### 上下文

在多行输入中，移动到当前逻辑行的开始

### 用法

~~~text
Ctrl + A
~~~

## Ctrl + E

> 切换显示所有内容

### 描述

切换显示所有内容

### 用法

~~~text
Ctrl + E
~~~

## Ctrl + K

> 删除到行尾

### 描述

删除到行尾

### 上下文

存储已删除的文本以供粘贴

### 用法

~~~text
Ctrl + K
~~~

## Ctrl + U

> 从光标删到行首

### 描述

从光标删除到行首

### 上下文

存储已删除的文本以供粘贴。重复以清除多行输入中的多行。在 macOS 上，终端模拟器（包括 iTerm2 和 Terminal.app）将 Cmd+Backspace 映射到此快捷键

### 用法

~~~text
Ctrl + U
~~~

## Option + Enter

> Option 换行

### 说明

多行输入

### 方法

Option 键

### 上下文

在 macOS 上启用将 Option 作为 Meta 后

### 用法

~~~text
Option + Enter
~~~

## Shift + Enter

> Shift 换行

### 说明

多行输入

### 方法

Shift+Enter

### 上下文

在 iTerm2、WezTerm、Ghostty、Kitty、Warp、Apple Terminal、Windows Terminal 中开箱即用

### 用法

~~~text
Shift + Enter
~~~

## Ctrl + J

> 插入换行

### 说明

多行输入

### 方法

控制序列

### 上下文

在任何终端中工作，无需配置

### 用法

~~~text
Ctrl + J
~~~

---

> 以下为不常用内容

# Claude Code 命令

## /add-dir

> 添加工作目录

### 用途

为当前会话期间的文件访问添加工作目录。大多数 .claude/ 配置不会从添加的目录中发现。您可以稍后使用 --continue 或 --resume 从添加的目录恢复会话

### 用法

~~~text
/add-dir
~~~

## /autofix-pr

> 自动修复 PR

### 用途

生成一个网络版 Claude Code 会话，监视当前分支的 PR，并在 CI 失败或审阅者留下评论时推送修复。使用 gh pr view 检测已检出分支的开放 PR；要监视不同的 PR，请先检出其分支。默认情况下，远程会话被告知修复每个 CI 失败和审阅评论；传递一个提示以给它不同的说明，例如 /autofix-pr only fix lint and type errors。需要 gh CLI 和访问网络版 Claude Code

### 用法

~~~text
/autofix-pr [prompt]
~~~

## /background

> 后台分离会话

### 用途

将当前会话分离以作为后台 agent 运行并释放此终端。传递一个提示以在分离前发送一条更多指令。使用 claude agents 监视会话。别名：/bg

### 用法

~~~text
/background [prompt]
~~~

## /batch

> 批量并行更改

### 用途

Skill. 在整个代码库中并行编排大规模更改。研究代码库，将工作分解为 5 到 30 个独立单元，并呈现一个计划。获得批准后，在隔离的 git worktree 中为每个单元生成一个后台 subagent。每个 subagent 实现其单元、运行测试并打开一个 pull request。需要一个 git 存储库。示例：/batch migrate src/ from Solid to React

### 用法

~~~text
/batch
~~~

## /chrome

> 配置 Claude in Chrome 设置

### 用途

配置 Claude in Chrome 设置

### 用法

~~~text
/chrome
~~~

## /claude-api

> 加载 API 参考资料

### 用途

Skill. 为您的项目语言（Python、TypeScript、Java、Go、Ruby、C#、PHP 或 cURL）和 Managed Agents 参考加载 Claude API 参考资料。涵盖工具使用、流式传输、批处理、结构化输出和常见陷阱。当您的代码导入 anthropic 或 @anthropic-ai/sdk 时也会自动激活。运行 /claude-api migrate 以将现有 Claude API 代码升级到更新的模型：Claude 询问要扫描哪些文件以及要针对哪个模型，然后更新在版本之间更改的模型 ID、thinking 配置和其他参数。运行 /claude-api managed-agents-onboard 以获得交互式演练，从头开始创建新的 Managed Agent

### 用法

~~~text
/claude-api [migrate|managed-agents-onboard]
~~~

## /color

> 为当前会话设置提示栏颜色

### 用途

为当前会话设置提示栏颜色。可用颜色：red、blue、green、yellow、purple、orange、pink、cyan。使用 default 重置，或不带参数运行以选择随机颜色。当 Remote Control 连接时，颜色同步到 claude.ai/code

### 用法

~~~text
/color [color|default]
~~~

## /copy

> 复制助手响应

### 用途

将最后一个助手响应复制到剪贴板。传递数字 N 以复制第 N 个最新响应：/copy 2 复制倒数第二个。当存在代码块时，显示交互式选择器以选择单个块或完整响应。在选择器中按 w 将选择内容写入文件而不是剪贴板，这在 SSH 上很有用

### 用法

~~~text
/copy [N]
~~~

## /cost

> /usage 的别名

### 用途

/usage 的别名

### 用法

~~~text
/cost
~~~

## /debug

> 启用调试日志

### 用途

Skill. 为当前会话启用调试日志记录并通过读取会话调试日志来排查问题。调试日志默认关闭，除非您使用 claude --debug 启动，因此在会话中途运行 /debug 会从该点开始捕获日志。可选择性地描述问题以集中分析

### 用法

~~~text
/debug [description]
~~~

## /desktop

> 桌面应用继续

### 用途

在 Claude Code Desktop 应用中继续当前会话。仅限 macOS 和 Windows，需要 Claude 订阅。别名：/app

### 用法

~~~text
/desktop
~~~

## /doctor

> 诊断安装问题

### 用途

诊断并验证您的 Claude Code 安装和设置。结果显示状态图标。按 f 让 Claude 修复任何报告的问题

### 用法

~~~text
/doctor
~~~

## /exit

> 退出 CLI

### 用途

退出 CLI。在附加的后台会话中，这会分离并且会话继续运行。别名：/quit

### 用法

~~~text
/exit
~~~

## /export

> 将当前对话导出为纯文本

### 用途

将当前对话导出为纯文本。使用文件名时，直接写入该文件。不使用文件名时，打开对话框以复制到剪贴板或保存到文件

### 用法

~~~text
/export [filename]
~~~

## /feedback

> 提交反馈

### 用途

提交反馈、报告错误或分享您的对话。别名：/bug、/share

### 用法

~~~text
/feedback [report]
~~~

## /fewer-permission-prompts

> 减少权限提示

### 用途

Skill. 扫描您的记录以查找常见的只读 Bash 和 MCP 工具调用，然后向项目 .claude/settings.json 添加优先级允许列表以减少权限提示

### 用法

~~~text
/fewer-permission-prompts
~~~

## /focus

> 切换焦点视图

### 用途

切换焦点视图，仅显示您的最后一个提示、带有编辑 diffstats 的单行工具调用摘要和最终响应。选择在会话间保持。仅在全屏渲染中可用

### 用法

~~~text
/focus
~~~

## /heapdump

> 导出堆快照

### 用途

将 JavaScript 堆快照和内存分解写入 ~/Desktop，或在 Linux 上没有 Desktop 文件夹的情况下写入您的主目录，以诊断高内存使用情况。请参阅故障排除

### 用法

~~~text
/heapdump
~~~

## /hooks

> 查看工具事件的 hook 配置

### 用途

查看工具事件的 hook 配置

### 用法

~~~text
/hooks
~~~

## /ide

> 管理 IDE 集成并显示状态

### 用途

管理 IDE 集成并显示状态

### 用法

~~~text
/ide
~~~

## /insights

> 生成报告

### 用途

生成报告，分析您的 Claude Code 会话，包括项目领域、交互模式和摩擦点

### 用法

~~~text
/insights
~~~

## /install-github-app

> 安装 GitHub 应用

### 用途

为存储库设置 Claude GitHub Actions 应用。引导您选择存储库并配置集成

### 用法

~~~text
/install-github-app
~~~

## /install-slack-app

> 安装 Claude Slack 应用

### 用途

安装 Claude Slack 应用。打开浏览器以完成 OAuth 流程

### 用法

~~~text
/install-slack-app
~~~

## /keybindings

> 配置快捷键

### 用途

打开或创建您的快捷键配置文件

### 用法

~~~text
/keybindings
~~~

## /login

> 登录到您的 Anthropic 账户

### 用途

登录到您的 Anthropic 账户

### 用法

~~~text
/login
~~~

## /logout

> 从您的 Anthropic 账户登出

### 用途

从您的 Anthropic 账户登出

### 用法

~~~text
/logout
~~~

## /loop

> 循环执行任务

### 用途

Skill. 在会话保持打开状态时重复运行提示。省略间隔，Claude 会在迭代之间自动调整步速。省略提示，Claude 运行自主维护检查，或运行 .claude/loop.md 中的提示（如果可用）。示例：/loop 5m check if the deploy finished。请参阅按计划运行提示。别名：/proactive

### 用法

~~~text
/loop [interval] [prompt]
~~~

## /mcp

> 管理 MCP 连接

### 用途

管理 MCP server 连接和 OAuth 身份验证

### 用法

~~~text
/mcp
~~~

## /memory

> 编辑 CLAUDE.md 内存文件

### 用途

编辑 CLAUDE.md 内存文件，启用或禁用 auto-memory，并查看自动内存条目

### 用法

~~~text
/memory
~~~

## /mobile

> 下载移动应用

### 用途

显示二维码以下载 Claude 移动应用。别名：/ios、/android

### 用法

~~~text
/mobile
~~~

## /passes

> 分享免费周

### 用途

与朋友分享一周免费的 Claude Code。仅在您的账户符合条件时可见

### 用法

~~~text
/passes
~~~

## /plan

> 直接从提示进入 Plan Mode

### 用途

直接从提示进入 Plan Mode。传递可选描述以进入 Plan Mode 并立即开始该任务，例如 /plan fix the auth bug

### 用法

~~~text
/plan [description]
~~~

## /plugin

> 管理 Claude Code plugins

### 用途

管理 Claude Code plugins

### 用法

~~~text
/plugin
~~~

## /powerup

> 交互式功能教学

### 用途

通过带有动画演示的快速交互式课程发现 Claude Code 功能

### 用法

~~~text
/powerup
~~~

## /pr-comments

> 在 v2.1.91 中移除

### 用途

在 v2.1.91 中移除。改为直接询问 Claude 以查看 pull request 评论。在早期版本中，从 GitHub pull request 获取并显示评论；自动检测当前分支的 PR，或传递 PR URL 或编号。需要 gh CLI

### 用法

~~~text
/pr-comments [PR]
~~~

## /privacy-settings

> 查看和更新您的隐私设置

### 用途

查看和更新您的隐私设置。仅对 Pro 和 Max 计划订阅者可用

### 用法

~~~text
/privacy-settings
~~~

## /radio

> 打开 lo-fi 电台

### 用途

在浏览器中打开 Claude FM lo-fi 电台。当浏览器不可用时打印流 URL。在 Bedrock、Vertex 或 Foundry 上不可用

### 用法

~~~text
/radio
~~~

## /recap

> 生成会话摘要

### 用途

按需生成当前会话的单行摘要。请参阅会话摘要以了解您离开后出现的自动摘要

### 用法

~~~text
/recap
~~~

## /release-notes

> 查看更新日志

### 用途

在交互式版本选择器中查看更改日志。选择特定版本以查看其发布说明，或选择显示所有版本

### 用法

~~~text
/release-notes
~~~

## /reload-plugins

> 重载插件

### 用途

重新加载所有活跃 plugins 以应用待处理的更改，无需重启。报告每个已重新加载组件的计数并标记任何加载错误

### 用法

~~~text
/reload-plugins
~~~

## /remote-control

> 远程控制会话

### 用途

使此会话可从 claude.ai 进行远程控制。别名：/rc

### 用法

~~~text
/remote-control
~~~

## /remote-env

> 配置远程环境

### 用途

为使用 --remote 启动的网络会话配置默认远程环境

### 用法

~~~text
/remote-env
~~~

## /run

> 启动项目应用

### 用途

Skill. 启动并驱动您的项目应用以在运行的应用中看到更改工作，而不仅仅是在测试中。请参阅运行和验证您的应用。需要 Claude Code v2.1.145 或更高版本

### 用法

~~~text
/run
~~~

## /run-skill-generator

> 生成项目 skill

### 用途

Skill. 通过从干净环境编写每个项目的 skill，教 /run 和 /verify 如何构建、启动和驱动您的项目应用。需要 Claude Code v2.1.145 或更高版本

### 用法

~~~text
/run-skill-generator
~~~

## /sandbox

> 切换 sandbox mode

### 用途

切换 sandbox mode。仅在支持的平台上可用

### 用法

~~~text
/sandbox
~~~

## /schedule

> 创建

### 用途

创建、更新、列出或运行 routines，这些 routines 在 Anthropic 管理的云基础设施上执行。Claude 会以对话方式引导您完成设置。别名：/routines

### 用法

~~~text
/schedule [description]
~~~

## /scroll-speed

> 调整滚动速度

### 用途

交互式调整鼠标滚轮滚动速度，使用标尺，您可以在对话框打开时滚动以预览更改。仅在全屏渲染中可用，在 JetBrains IDE 终端中不可用

### 用法

~~~text
/scroll-speed
~~~

## /security-review

> 安全审查代码

### 用途

分析当前分支上的待处理更改以查找安全漏洞。审查 git 差异并识别注入、身份验证问题和数据泄露等风险

### 用法

~~~text
/security-review
~~~

## /setup-bedrock

> 配置 Bedrock

### 用途

通过交互式向导配置 Amazon Bedrock 身份验证、区域和模型固定。仅在设置 CLAUDE_CODE_USE_BEDROCK=1 时可见。首次 Bedrock 用户也可以从登录屏幕访问此向导

### 用法

~~~text
/setup-bedrock
~~~

## /setup-vertex

> 配置 Vertex AI

### 用途

通过交互式向导配置 Google Vertex AI 身份验证、项目、区域和模型固定。仅在设置 CLAUDE_CODE_USE_VERTEX=1 时可见。首次 Vertex AI 用户也可以从登录屏幕访问此向导

### 用法

~~~text
/setup-vertex
~~~

## /stats

> /usage 的别名

### 用途

/usage 的别名。在统计选项卡上打开

### 用法

~~~text
/stats
~~~

## /statusline

> 配置 Claude Code 的状态行

### 用途

配置 Claude Code 的状态行。描述您想要的内容，或不带参数运行以从您的 shell 提示自动配置

### 用法

~~~text
/statusline
~~~

## /stickers

> 订购 Claude Code 贴纸

### 用途

订购 Claude Code 贴纸

### 用法

~~~text
/stickers
~~~

## /stop

> 停止当前后台会话

### 用途

停止当前后台会话。仅在附加到后台会话时可用；记录和任何 worktree 都会保留。要分离而不停止，请使用 /exit 或按 ←

### 用法

~~~text
/stop
~~~

## /tasks

> 列出并管理后台任务

### 用途

列出并管理后台任务。也可用作 /bashes

### 用法

~~~text
/tasks
~~~

## /team-onboarding

> 生成团队入职指南

### 用途

从您的 Claude Code 使用历史记录生成团队入职指南。Claude 分析您过去 30 天的会话、命令和 MCP server 使用情况，并生成一个 markdown 指南，团队成员可以粘贴为第一条消息以快速设置。对于 Pro、Max、Team 和 Enterprise 计划上的 claude.ai 订阅者，还返回一个共享链接，团队成员可以直接在 Claude Code 中打开

### 用法

~~~text
/team-onboarding
~~~

## /teleport

> 拉取远程会话

### 用途

将网络版 Claude Code 会话拉入此终端：打开选择器，然后获取分支和对话。也可用作 /tp。需要 claude.ai 订阅

### 用法

~~~text
/teleport
~~~

## /terminal-setup

> 配置终端快捷键

### 用途

为 Shift+Enter 和其他快捷键配置终端快捷键。仅在需要它的终端中可见，如 VS Code、Cursor、Windsurf、Alacritty 或 Zed

### 用法

~~~text
/terminal-setup
~~~

## /theme

> 更改颜色主题

### 用途

更改颜色主题。包括跟随您终端深色或浅色背景的 auto 选项、浅色和深色变体、色盲友好（道尔顿化）主题、使用您终端颜色调色板的 ANSI 主题，以及来自 ~/.claude/themes/ 或 plugins 的任何自定义主题。选择\*\*新建自定义主题…\*\*以创建一个

### 用法

~~~text
/theme
~~~

## /tui

> 切换终端渲染器

### 用途

设置终端 UI 渲染器并使用您的对话完整性重新启动到它。fullscreen 启用无闪烁 alt-screen 渲染器。不带参数时，打印活跃渲染器

### 用法

~~~text
/tui [default|fullscreen]
~~~

## /ultraplan

> 在 ultraplan 会话中起草计划

### 用途

在 ultraplan 会话中起草计划，在浏览器中审阅，然后远程执行或将其发送回您的终端

### 用法

~~~text
/ultraplan
~~~

## /ultrareview

> 在云沙箱中运行深度

### 用途

在云沙箱中运行深度、多 agent 代码审阅，使用 ultrareview。Pro 和 Max 包括 3 次免费运行，然后需要额外使用

### 用法

~~~text
/ultrareview [PR]
~~~

## /upgrade

> 升级计划

### 用途

打开升级页面以切换到更高的计划层级

### 用法

~~~text
/upgrade
~~~

## /usage-credits

> 配置使用额度

### 用途

配置使用额度以在达到限制时继续工作。之前为 /extra-usage

### 用法

~~~text
/usage-credits
~~~

## /verify

> 验证代码改动

### 用途

Skill. 通过构建您的项目应用、运行它并观察结果来确认代码更改是否按预期工作，而不是依赖测试或类型检查。请参阅运行和验证您的应用。需要 Claude Code v2.1.145 或更高版本

### 用法

~~~text
/verify
~~~

## /vim

> 在 v2.1.92 中移除

### 用途

在 v2.1.92 中移除。要在 Vim 和普通编辑模式之间切换，请使用 /config → 编辑器模式

### 用法

~~~text
/vim
~~~

## /voice

> 切换语音听写

### 用途

切换语音听写，或在特定模式下启用它。需要 Claude.ai 账户

### 用法

~~~text
/voice [hold|tap|off]
~~~

## /web-setup

> 连接 GitHub

### 用途

使用您的本地 gh CLI 凭证将您的 GitHub 账户连接到网络版 Claude Code。如果 GitHub 未连接，/schedule 会自动提示此操作

### 用法

~~~text
/web-setup
~~~

# Claude Code 操作

## Ctrl + X Ctrl + K

> 终止后台子代理

### 描述

终止此会话中所有运行的后台子代理。在 3 秒内按两次以确认

### 上下文

子代理控制

### 用法

~~~text
Ctrl + X Ctrl + K
~~~

## Ctrl + G

> 外部编辑器打开

### 描述

在默认文本编辑器中打开

### 上下文

在默认文本编辑器中编辑您的提示或自定义响应。Ctrl+X Ctrl+E 是 readline 原生绑定。在 /config 中打开"在外部编辑器中显示最后响应"以在您的提示上方将 Claude 的上一个回复作为 # 注释上下文预置；保存时会删除注释块

### 用法

~~~text
Ctrl + G
~~~

## Ctrl + B

> 后台运行任务

### 描述

后台运行任务

### 上下文

后台运行 bash 命令和代理。Tmux 用户按两次

### 用法

~~~text
Ctrl + B
~~~

## Ctrl + T

> 切换任务列表

### 描述

切换代码块的语法突出显示

### 上下文

仅在 /theme 选择器菜单内工作。控制 Claude 响应中的代码是否使用语法着色

### 用法

~~~text
Ctrl + T
~~~

## Left/Right arrows

> 切换对话框选项卡

### 描述

在对话框选项卡之间循环

### 上下文

在权限对话框和菜单中的选项卡之间导航

### 用法

~~~text
Left/Right arrows
~~~

## Up/Down arrows

> 移动光标或历史

### 描述

移动光标或导航命令历史

### 上下文

在多行输入中，首先在提示内移动光标。一旦光标已在顶部或底部边缘，再次按下会导航命令历史

### 用法

~~~text
Up/Down arrows
~~~

## Option + T

> 切换扩展思考

### 描述

切换扩展思考

### 上下文

启用或禁用扩展思考模式。从 v2.1.132 开始，此快捷键在 macOS 上无需配置 Option 作为 Meta 即可工作

### 用法

~~~text
Option + T
~~~

## Option + O

> 切换快速模式

### 描述

切换快速模式

### 上下文

启用或禁用快速模式

### 用法

~~~text
Option + O
~~~

## Ctrl + W

> 删除上一个单词

### 描述

删除上一个单词

### 上下文

存储已删除的文本以供粘贴。在 Windows 上，Ctrl+Backspace 也会删除上一个单词

### 用法

~~~text
Ctrl + W
~~~

## Ctrl + Y

> 粘贴删除文本

### 描述

粘贴已删除的文本

### 上下文

粘贴用 Ctrl+K、Ctrl+U 或 Ctrl+W 删除的文本

### 用法

~~~text
Ctrl + Y
~~~

## Alt + Y

> 循环粘贴历史

### 描述

循环粘贴历史

### 上下文

粘贴后，循环浏览以前删除的文本。在 macOS 上需要将 Option 作为 Meta

### 用法

~~~text
Alt + Y
~~~

## Alt + B

> 光标后移一个词

### 描述

将光标向后移动一个单词

### 上下文

单词导航。在 macOS 上需要将 Option 作为 Meta

### 用法

~~~text
Alt + B
~~~

## Alt + F

> 光标前移一个词

### 描述

将光标向前移动一个单词

### 上下文

单词导航。在 macOS 上需要将 Option 作为 Meta

### 用法

~~~text
Alt + F
~~~

## \ + Enter

> 快速换行符

### 说明

多行输入

### 方法

快速转义

### 上下文

在所有终端中工作

### 用法

~~~text
\ + Enter
~~~

## Paste directly

> 直接粘贴内容

### 说明

多行输入

### 方法

粘贴模式

### 上下文

对于代码块、日志

### 用法

~~~text
Paste directly
~~~

## ?

> 切换键盘快捷键帮助面板

### 描述

切换键盘快捷键帮助面板。需要全屏渲染

### 用法

~~~text
?
~~~

## { / }

> 跳转用户提示

### 描述

跳转到上一个或下一个用户提示，如 vim 段落运动。需要全屏渲染

### 用法

~~~text
{ / }
~~~

## [

> 写入终端缓冲区

### 描述

将完整对话写入终端的原生滚动缓冲区，以便 Cmd+F、tmux 复制模式和其他原生工具可以搜索它。需要全屏渲染

### 用法

~~~text
[
~~~

## v

> 编辑器打开对话

### 描述

将对话写入临时文件并在 $VISUAL 或 $EDITOR 中打开它。需要全屏渲染

### 用法

~~~text
v
~~~

## q

> 退出转录视图

### 描述

退出转录视图。所有三个都可以通过 transcript:exit 重新绑定

### 用法

~~~text
q
~~~

## Hold

> 语音听写

### 描述

语音听写

### 注释

需要启用语音听写。按住以录制，或运行 /voice tap 以进行点击切换。可重新绑定

### 用法

~~~text
Hold
~~~
