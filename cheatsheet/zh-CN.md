<!--
CCL-CHEATSHEET
schema: 1
lang: zh-CN
version: 2026.05.24
updatedAt: 2026-05-24
source: official-docs + manual-notes
-->

# Claude Code 命令

## /help

> 查看帮助

### 说明

列出 Claude Code 的全部内置命令和简要说明。

### 用法

```text
/help
```

## /clear

> 清空上下文

### 说明

清空当前会话的对话历史和上下文，开始一段全新的对话。

### 用法

```text
/clear
```

## /init

> 初始化项目

### 说明

扫描当前项目并生成 CLAUDE.md，让 Claude Code 了解项目结构与开发规则。

### 用法

```text
/init
```

## /model

> 切换模型

### 说明

切换当前会话使用的模型，例如在 Opus / Sonnet / Haiku 之间切换。

### 用法

```text
/model
```

## /permissions

> 权限设置

### 说明

查看并编辑工具权限的允许 / 拒绝列表。

### 用法

```text
/permissions
```

## /compact

> 压缩上下文

### 说明

把当前长对话压缩成摘要，释放上下文空间又保留关键信息。

### 用法

```text
/compact
```

# Claude Code 操作

## Shift + Tab

> 切权限模式

### 说明

循环切换权限模式：默认 → 自动接受 → 计划模式。

### 用法

```text
Shift + Tab
```

## Esc

> 中断

### 说明

打断 Claude 当前的生成或工具执行。

### 用法

```text
Esc
```

## Ctrl + J

> 换行输入

### 说明

在输入框中插入换行，而不是直接提交消息。

### 用法

```text
Ctrl + J
```

## @

> 引用文件

### 说明

在输入中以 @ 触发文件路径补全，把文件内容引入对话。

### 用法

```text
@src/main.ts
```

## !

> Bash 模式

### 说明

以 ! 开头直接执行 shell 命令，输出回填到对话中。

### 用法

```text
!git status
```

## #

> 写入记忆

### 说明

以 # 开头的内容会被写入 CLAUDE.md 记忆文件。

### 用法

```text
# 总是用 pnpm
```

---

> 以下为不常用内容

# Claude Code 命令

## /config

> 偏好设置

### 说明

打开配置界面，调整主题、模型、状态栏等偏好。

### 用法

```text
/config
```

## /doctor

> 检查环境

### 说明

检查 Claude Code 的安装与运行环境是否正常。

### 用法

```text
/doctor
```

## /agents

> 管理子代理

### 说明

查看、创建和管理自定义子代理（subagent）。

### 用法

```text
/agents
```

## /resume

> 恢复会话

### 说明

从历史会话列表中选择一段，继续之前的对话。

### 用法

```text
/resume
```

# Claude Code 操作

## Esc Esc

> 回溯编辑

### 说明

连按两次 Esc，回溯并编辑之前发送过的某条消息。

### 用法

```text
Esc Esc
```

## Ctrl + R

> 详细输出

### 说明

切换详细模式，展开工具调用的完整输入输出。

### 用法

```text
Ctrl + R
```

## Vim 模式

> 键盘编辑

### 说明

面向熟悉 Vim 的用户，用键盘命令在输入框中编辑内容。

### 用法

```text
i / Esc / dd / yy / p
```

### 注意事项

需在 /config 中开启 Vim 输入模式后生效。
