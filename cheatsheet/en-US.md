<!--
CCL-CHEATSHEET
schema: 1
lang: en-US
version: 2026.05.24
updatedAt: 2026-05-24
source: official-docs + manual-notes
-->

# Claude Code Commands

## /help

> Show help

### Description

List all built-in Claude Code commands with short descriptions.

### Usage

```text
/help
```

## /clear

> Clear context

### Description

Clear the current conversation history and context, starting fresh.

### Usage

```text
/clear
```

## /init

> Init project

### Description

Scan the project and generate CLAUDE.md so Claude Code understands its structure and rules.

### Usage

```text
/init
```

## /model

> Switch model

### Description

Switch the model used in the current session, e.g. between Opus / Sonnet / Haiku.

### Usage

```text
/model
```

## /permissions

> Permissions

### Description

View and edit the allow / deny lists for tool permissions.

### Usage

```text
/permissions
```

## /compact

> Compact context

### Description

Compress a long conversation into a summary, freeing context while keeping key info.

### Usage

```text
/compact
```

# Claude Code Operations

## Shift + Tab

> Cycle perms

### Description

Cycle permission modes: default -> auto-accept -> plan mode.

### Usage

```text
Shift + Tab
```

## Esc

> Interrupt

### Description

Interrupt Claude's current generation or tool execution.

### Usage

```text
Esc
```

## Ctrl + J

> New line

### Description

Insert a new line in the input box instead of submitting the message.

### Usage

```text
Ctrl + J
```

## @

> Mention file

### Description

Type @ to trigger file path completion and pull file contents into the conversation.

### Usage

```text
@src/main.ts
```

## !

> Bash mode

### Description

Start a line with ! to run a shell command; its output is fed back into the chat.

### Usage

```text
!git status
```

## #

> Add memory

### Description

Content starting with # is written into the CLAUDE.md memory file.

### Usage

```text
# Always use pnpm
```

---

> Less common items

# Claude Code Commands

## /config

> Preferences

### Description

Open the config panel to adjust theme, model, status line and other preferences.

### Usage

```text
/config
```

## /doctor

> Check setup

### Description

Check that the Claude Code installation and runtime environment are healthy.

### Usage

```text
/doctor
```

## /agents

> Manage agents

### Description

View, create and manage custom subagents.

### Usage

```text
/agents
```

## /resume

> Resume session

### Description

Pick a past session from the list and continue that conversation.

### Usage

```text
/resume
```

# Claude Code Operations

## Esc Esc

> Rewind edit

### Description

Press Esc twice to rewind and edit one of your previously sent messages.

### Usage

```text
Esc Esc
```

## Ctrl + R

> Verbose output

### Description

Toggle verbose mode to expand the full input/output of tool calls.

### Usage

```text
Ctrl + R
```

## Vim mode

> Keyboard edit

### Description

For Vim users: edit the input box with keyboard commands.

### Usage

```text
i / Esc / dd / yy / p
```

### Notes

Enable Vim input mode in /config first.
