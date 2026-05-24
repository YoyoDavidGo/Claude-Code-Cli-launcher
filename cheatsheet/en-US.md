<!--
CCL-CHEATSHEET
schema: 1
lang: en-US
version: 2026.05.24
updatedAt: 2026-05-24
source: official-docs
-->


# Claude Code Commands

## /agents

> Manage agent configurations

### Description

Manage agent configurations

### Usage

~~~text
/agents
~~~

## /clear

> Start a new conversation with empty

### Description

Start a new conversation with empty context. The previous conversation stays available in /resume. Pass a name to label the previous conversation in the /resume picker. To free up context while continuing the same conversation, use /compact instead. Aliases: /reset, /new

### Usage

~~~text
/clear [name]
~~~

## /compact

> Free up context by summarizing the

### Description

Free up context by summarizing the conversation so far. Optionally pass focus instructions for the summary. See how compaction handles rules, skills, and memory files

### Usage

~~~text
/compact [instructions]
~~~

## /config

> Open the Settings interface to adjust

### Description

Open the Settings interface to adjust theme, model, output style, and other preferences. Alias: /settings

### Usage

~~~text
/config
~~~

## /context

> Visualize current context usage as a

### Description

Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings. In fullscreen mode the per-item breakdown is collapsed to keep the grid visible. Pass all to expand it

### Usage

~~~text
/context [all]
~~~

## /cost

> Alias for /usage

### Description

Alias for /usage

### Usage

~~~text
/cost
~~~

## /help

> Show help and available commands

### Description

Show help and available commands

### Usage

~~~text
/help
~~~

## /init

> Initialize project with a CLAUDE

### Description

Initialize project with a CLAUDE.md guide. Set CLAUDE_CODE_NEW_INIT=1 for an interactive flow that also walks through skills, hooks, and personal memory files

### Usage

~~~text
/init
~~~

## /model

> Set the AI model for the current session

### Description

Set the AI model for the current session. For models that support it, use left/right arrows to adjust effort level. With no argument, opens a picker; press d on a row to also save that model as the default for new sessions. The picker asks for confirmation when the conversation has prior output, since the next response re-reads the full history without cached context. Once confirmed, the change applies without waiting for the current response to finish

### Usage

~~~text
/model [model]
~~~

## /permissions

> Manage allow, ask, and deny rules for

### Description

Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials. Alias: /allowed-tools

### Usage

~~~text
/permissions
~~~

## /resume

> Resume a conversation by ID or name, or

### Description

Resume a conversation by ID or name, or open the session picker. As of v2.1.144, background sessions appear in the picker marked with bg. Alias: /continue

### Usage

~~~text
/resume [session]
~~~

## /review

> Review a pull request locally in your

### Description

Review a pull request locally in your current session. For a deeper cloud-based review, see /ultrareview

### Usage

~~~text
/review [PR]
~~~

## /usage

> Show session cost, plan usage limits,

### Description

Show session cost, plan usage limits, and activity stats. See the cost tracking guide for subscription-specific details. /cost and /stats are aliases

### Usage

~~~text
/usage
~~~

# Claude Code Operations

## Ctrl + C

> Interrupt, or clear input

### Description

Interrupt, or clear input

### Usage

~~~text
Ctrl + C
~~~

## Ctrl + L

> Redraw screen

### Description

Redraw screen

### Usage

~~~text
Ctrl + L
~~~

## Ctrl + O

> Toggle transcript viewer

### Description

Toggle transcript viewer

### Usage

~~~text
Ctrl + O
~~~

## Ctrl + R

> Reverse search command history

### Description

Reverse search command history

### Usage

~~~text
Ctrl + R
~~~

## Ctrl + V

> Paste image from clipboard

### Description

Paste image from clipboard

### Usage

~~~text
Ctrl + V
~~~

## Esc

> Interrupt Claude

### Description

Interrupt Claude

### Usage

~~~text
Esc
~~~

## Esc + Esc

> Clear input draft, or rewind

### Description

Clear input draft, or rewind

### Usage

~~~text
Esc + Esc
~~~

## Shift + Tab

> Cycle permission modes

### Description

Cycle permission modes

### Usage

~~~text
Shift + Tab
~~~

## Option + P

> Switch model

### Description

Switch model

### Usage

~~~text
Option + P
~~~

## Shift + Enter

> Shift+Enter — Native in iTerm2,

### Description

Shift+Enter — Native in iTerm2, WezTerm, Ghostty, Kitty, Warp, Apple Terminal, Windows Terminal

### Usage

~~~text
Shift + Enter
~~~

## Ctrl + J

> Control sequence — Works in any

### Description

Control sequence — Works in any terminal without configuration

### Usage

~~~text
Ctrl + J
~~~

## @

> File path mention

### Description

File path mention

### Usage

~~~text
@
~~~

---

> Less common items

# Claude Code Commands

## /add-dir

> Add a working directory for file access

### Description

Add a working directory for file access during the current session. Most .claude/ configuration is not discovered from the added directory. You can later resume the session from the added directory with --continue or --resume

### Usage

~~~text
/add-dir
~~~

## /autofix-pr

> Spawn a Claude Code on the web session

### Description

Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with gh pr view; to watch a different PR, check out its branch first. By default the remote session is told to fix every CI failure and review comment; pass a prompt to give it different instructions, for example /autofix-pr only fix lint and type errors. Requires the gh CLI and access to Claude Code on the web

### Usage

~~~text
/autofix-pr [prompt]
~~~

## /background

> Detach the current session to run as a

### Description

Detach the current session to run as a background agent and free this terminal. Pass a prompt to send one more instruction before detaching. Monitor the session with claude agents. Alias: /bg

### Usage

~~~text
/background [prompt]
~~~

## /batch

> Orchestrate large-scale changes across

### Description

Orchestrate large-scale changes across a codebase in parallel. Researches the codebase, decomposes the work into 5 to 30 independent units, and presents a plan. Once approved, spawns one background subagent per unit in an isolated git worktree. Each subagent implements its unit, runs tests, and opens a pull request. Requires a git repository. Example: /batch migrate src/ from Solid to React

### Usage

~~~text
/batch
~~~

## /branch

> Create a branch of the current

### Description

Create a branch of the current conversation at this point. Switches you into the branch and preserves the original, which you can return to with /resume. Alias: /fork. When CLAUDE_CODE_FORK_SUBAGENT is set, /fork instead spawns a forked subagent and is no longer an alias for this command

### Usage

~~~text
/branch [name]
~~~

## /btw

> Ask a quick side question without

### Description

Ask a quick side question without adding to the conversation

### Usage

~~~text
/btw
~~~

## /chrome

> Configure Claude in Chrome settings

### Description

Configure Claude in Chrome settings

### Usage

~~~text
/chrome
~~~

## /claude-api

> Load Claude API reference material for

### Description

Load Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL) and Managed Agents reference. Covers tool use, streaming, batches, structured outputs, and common pitfalls. Also activates automatically when your code imports anthropic or @anthropic-ai/sdk. Run /claude-api migrate to upgrade existing Claude API code to a newer model: Claude asks which files to scan and which model to target, then updates model IDs, thinking configuration, and other parameters that changed between versions. Run /claude-api managed-agents-onboard for an interactive walkthrough that creates a new Managed Agent from scratch

### Usage

~~~text
/claude-api [migrate|managed-agents-onboard]
~~~

## /code-review

> Review the current diff for correctness

### Description

Review the current diff for correctness bugs and report findings without editing files. Lower effort levels return fewer, higher-confidence findings, while high through max give broader coverage and may include uncertain findings. Without an effort argument, the review uses the session's current effort. Pass --comment to post findings as inline comments on the current GitHub PR. Pass a path or PR reference to review a specific target. Formerly /simplify, which still works as an alias

### Usage

~~~text
/code-review [low|medium|high|xhigh|max] [--comment] [target]
~~~

## /color

> Set the prompt bar color for the

### Description

Set the prompt bar color for the current session. Available colors: red, blue, green, yellow, purple, orange, pink, cyan. Use default to reset, or run with no argument to pick a random color. When Remote Control is connected, the color syncs to claude.ai/code

### Usage

~~~text
/color [color|default]
~~~

## /copy

> Copy the last assistant response to

### Description

Copy the last assistant response to clipboard. Pass a number N to copy the Nth-latest response: /copy 2 copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press w in the picker to write the selection to a file instead of the clipboard, which is useful over SSH

### Usage

~~~text
/copy [N]
~~~

## /debug

> Enable debug logging for the current

### Description

Enable debug logging for the current session and troubleshoot issues by reading the session debug log. Debug logging is off by default unless you started with claude --debug, so running /debug mid-session starts capturing logs from that point forward. Optionally describe the issue to focus the analysis

### Usage

~~~text
/debug [description]
~~~

## /desktop

> Continue the current session in the

### Description

Continue the current session in the Claude Code Desktop app. Requires macOS or Windows and a Claude subscription. Alias: /app

### Usage

~~~text
/desktop
~~~

## /diff

> Open an interactive diff viewer showing

### Description

Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files

### Usage

~~~text
/diff
~~~

## /doctor

> Diagnose and verify your Claude Code

### Description

Diagnose and verify your Claude Code installation and settings. Results show with status icons. Press f to have Claude fix any reported issues

### Usage

~~~text
/doctor
~~~

## /effort

> Set the model effort level

### Description

Set the model effort level. Accepts low, medium, high, xhigh, or max; available levels depend on the model and max is session-only. auto resets to the model default. Without an argument, opens an interactive slider; use left and right arrows to pick a level and Enter to apply. Takes effect immediately without waiting for the current response to finish

### Usage

~~~text
/effort [level|auto]
~~~

## /exit

> Exit the CLI

### Description

Exit the CLI. In an attached background session, this detaches and the session keeps running. Alias: /quit

### Usage

~~~text
/exit
~~~

## /export

> Export the current conversation as

### Description

Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file

### Usage

~~~text
/export [filename]
~~~

## /fast

> Toggle fast mode on or off

### Description

Toggle fast mode on or off

### Usage

~~~text
/fast [on|off]
~~~

## /feedback

> Submit feedback, report a bug, or share

### Description

Submit feedback, report a bug, or share your conversation. Aliases: /bug, /share

### Usage

~~~text
/feedback [report]
~~~

## /fewer-permission-prompts

> Scan your transcripts for common

### Description

Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts

### Usage

~~~text
/fewer-permission-prompts
~~~

## /focus

> Toggle the focus view, which shows only

### Description

Toggle the focus view, which shows only your last prompt, a one-line tool-call summary with edit diffstats, and the final response. The selection persists across sessions; set viewMode in settings to override it. Only available in fullscreen rendering

### Usage

~~~text
/focus
~~~

## /goal

> Set a goal

### Description

Set a goal: Claude keeps working across turns until the condition is met. With no argument, shows the current or most recently achieved goal. clear, stop, off, reset, none, or cancel removes an active goal early

### Usage

~~~text
/goal [condition|clear]
~~~

## /heapdump

> Write a JavaScript heap snapshot and a

### Description

Write a JavaScript heap snapshot and a memory breakdown to ~/Desktop, or your home directory on Linux without a Desktop folder, for diagnosing high memory usage. See troubleshooting

### Usage

~~~text
/heapdump
~~~

## /hooks

> View hook configurations for tool events

### Description

View hook configurations for tool events

### Usage

~~~text
/hooks
~~~

## /ide

> Manage IDE integrations and show status

### Description

Manage IDE integrations and show status

### Usage

~~~text
/ide
~~~

## /insights

> Generate a report analyzing your Claude

### Description

Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points

### Usage

~~~text
/insights
~~~

## /install-github-app

> Set up the Claude GitHub Actions app

### Description

Set up the Claude GitHub Actions app for a repository. Walks you through selecting a repo and configuring the integration

### Usage

~~~text
/install-github-app
~~~

## /install-slack-app

> Install the Claude Slack app

### Description

Install the Claude Slack app. Opens a browser to complete the OAuth flow

### Usage

~~~text
/install-slack-app
~~~

## /keybindings

> Open or create your keybindings

### Description

Open or create your keybindings configuration file

### Usage

~~~text
/keybindings
~~~

## /login

> Sign in to your Anthropic account

### Description

Sign in to your Anthropic account

### Usage

~~~text
/login
~~~

## /logout

> Sign out from your Anthropic account

### Description

Sign out from your Anthropic account

### Usage

~~~text
/logout
~~~

## /loop

> Run a prompt repeatedly while the

### Description

Run a prompt repeatedly while the session stays open. Omit the interval and Claude self-paces between iterations. Omit the prompt and, where available, Claude runs an autonomous maintenance check or the prompt in .claude/loop.md. Example: /loop 5m check if the deploy finished. See Run prompts on a schedule. Alias: /proactive

### Usage

~~~text
/loop [interval] [prompt]
~~~

## /mcp

> Manage MCP server connections and OAuth

### Description

Manage MCP server connections and OAuth authentication

### Usage

~~~text
/mcp
~~~

## /memory

> Edit CLAUDE

### Description

Edit CLAUDE.md memory files, enable or disable auto-memory, and view auto-memory entries

### Usage

~~~text
/memory
~~~

## /mobile

> Show QR code to download the Claude

### Description

Show QR code to download the Claude mobile app. Aliases: /ios, /android

### Usage

~~~text
/mobile
~~~

## /passes

> Share a free week of Claude Code with

### Description

Share a free week of Claude Code with friends. Only visible if your account is eligible

### Usage

~~~text
/passes
~~~

## /plan

> Enter plan mode directly from the prompt

### Description

Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example /plan fix the auth bug

### Usage

~~~text
/plan [description]
~~~

## /plugin

> Manage Claude Code plugins

### Description

Manage Claude Code plugins

### Usage

~~~text
/plugin
~~~

## /powerup

> Discover Claude Code features through

### Description

Discover Claude Code features through quick interactive lessons with animated demos

### Usage

~~~text
/powerup
~~~

## /pr-comments

> Removed in v2

### Description

Removed in v2.1.91. Ask Claude directly to view pull request comments instead. On earlier versions, fetches and displays comments from a GitHub pull request; automatically detects the PR for the current branch, or pass a PR URL or number. Requires the gh CLI

### Usage

~~~text
/pr-comments [PR]
~~~

## /privacy-settings

> View and update your privacy settings

### Description

View and update your privacy settings. Only available for Pro and Max plan subscribers

### Usage

~~~text
/privacy-settings
~~~

## /radio

> Open Claude FM lo-fi radio in your

### Description

Open Claude FM lo-fi radio in your browser. Prints the stream URL when no browser is available. Not available on Bedrock, Vertex, or Foundry

### Usage

~~~text
/radio
~~~

## /recap

> Generate a one-line summary of the

### Description

Generate a one-line summary of the current session on demand. See Session recap for the automatic recap that appears after you've been away

### Usage

~~~text
/recap
~~~

## /release-notes

> View the changelog in an interactive

### Description

View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions

### Usage

~~~text
/release-notes
~~~

## /reload-plugins

> Reload all active plugins to apply

### Description

Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors

### Usage

~~~text
/reload-plugins
~~~

## /remote-control

> Make this session available for remote

### Description

Make this session available for remote control from claude.ai. Alias: /rc

### Usage

~~~text
/remote-control
~~~

## /remote-env

> Configure the default remote

### Description

Configure the default remote environment for web sessions started with --remote

### Usage

~~~text
/remote-env
~~~

## /rename

> Rename the current session and show the

### Description

Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history

### Usage

~~~text
/rename [name]
~~~

## /rewind

> Rewind the conversation and/or code to

### Description

Rewind the conversation and/or code to a previous point, or summarize from a selected message. See checkpointing. Aliases: /checkpoint, /undo

### Usage

~~~text
/rewind
~~~

## /run

> Launch and drive your project's app to

### Description

Launch and drive your project's app to see a change working in the running app, not just in tests. See Run and verify your app. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/run
~~~

## /run-skill-generator

> Teach /run and /verify how to build,

### Description

Teach /run and /verify how to build, launch, and drive your project's app from a clean environment by writing a per-project skill. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/run-skill-generator
~~~

## /sandbox

> Toggle sandbox mode

### Description

Toggle sandbox mode. Available on supported platforms only

### Usage

~~~text
/sandbox
~~~

## /schedule

> Create, update, list, or run routines,

### Description

Create, update, list, or run routines, which execute on Anthropic-managed cloud infrastructure. Claude walks you through the setup conversationally. Alias: /routines

### Usage

~~~text
/schedule [description]
~~~

## /scroll-speed

> Adjust mouse wheel scroll speed

### Description

Adjust mouse wheel scroll speed interactively, with a ruler you can scroll while the dialog is open to preview the change. Available in fullscreen rendering only and not in the JetBrains IDE terminal

### Usage

~~~text
/scroll-speed
~~~

## /security-review

> Analyze pending changes on the current

### Description

Analyze pending changes on the current branch for security vulnerabilities. Reviews the git diff and identifies risks like injection, auth issues, and data exposure

### Usage

~~~text
/security-review
~~~

## /setup-bedrock

> Configure Amazon Bedrock

### Description

Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when CLAUDE_CODE_USE_BEDROCK=1 is set. First-time Bedrock users can also access this wizard from the login screen

### Usage

~~~text
/setup-bedrock
~~~

## /setup-vertex

> Configure Google Vertex AI

### Description

Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when CLAUDE_CODE_USE_VERTEX=1 is set. First-time Vertex AI users can also access this wizard from the login screen

### Usage

~~~text
/setup-vertex
~~~

## /skills

> List available skills

### Description

List available skills. Press t to sort by token count. Press Space to hide a skill from Claude or the / menu, then Enter to save

### Usage

~~~text
/skills
~~~

## /stats

> Alias for /usage

### Description

Alias for /usage. Opens on the Stats tab

### Usage

~~~text
/stats
~~~

## /status

> Open the Settings interface (Status

### Description

Open the Settings interface (Status tab) showing version, model, account, and connectivity. Works while Claude is responding, without waiting for the current response to finish

### Usage

~~~text
/status
~~~

## /statusline

> Configure Claude Code's status line

### Description

Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt

### Usage

~~~text
/statusline
~~~

## /stickers

> Order Claude Code stickers

### Description

Order Claude Code stickers

### Usage

~~~text
/stickers
~~~

## /stop

> Stop the current background session

### Description

Stop the current background session. Only available while attached to a background session; the transcript and any worktree are kept. To detach without stopping, use /exit or press ←

### Usage

~~~text
/stop
~~~

## /tasks

> List and manage background tasks

### Description

List and manage background tasks. Also available as /bashes

### Usage

~~~text
/tasks
~~~

## /team-onboarding

> Generate a team onboarding guide from

### Description

Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide a teammate can paste as a first message to get set up quickly. For claude.ai subscribers on Pro, Max, Team, and Enterprise plans, also returns a share link teammates can open directly in Claude Code

### Usage

~~~text
/team-onboarding
~~~

## /teleport

> Pull a Claude Code on the web session

### Description

Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as /tp. Requires a claude.ai subscription

### Usage

~~~text
/teleport
~~~

## /terminal-setup

> Configure terminal keybindings for

### Description

Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Cursor, Windsurf, Alacritty, or Zed

### Usage

~~~text
/terminal-setup
~~~

## /theme

> Change the color theme

### Description

Change the color theme. Includes an auto option that matches your terminal's light or dark background, light and dark variants, colorblind-accessible (daltonized) themes, ANSI themes that use your terminal's color palette, and any custom themes from ~/.claude/themes/ or plugins. Select New custom theme… to create one

### Usage

~~~text
/theme
~~~

## /tui

> Set the terminal UI renderer and

### Description

Set the terminal UI renderer and relaunch into it with your conversation intact. fullscreen enables the flicker-free alt-screen renderer. With no argument, prints the active renderer

### Usage

~~~text
/tui [default|fullscreen]
~~~

## /ultraplan

> Draft a plan in an ultraplan session,

### Description

Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back to your terminal

### Usage

~~~text
/ultraplan
~~~

## /ultrareview

> Run a deep, multi-agent code review in

### Description

Run a deep, multi-agent code review in a cloud sandbox with ultrareview. Includes 3 free runs on Pro and Max, then requires usage credits

### Usage

~~~text
/ultrareview [PR]
~~~

## /upgrade

> Open the upgrade page to switch to a

### Description

Open the upgrade page to switch to a higher plan tier

### Usage

~~~text
/upgrade
~~~

## /usage-credits

> Configure usage credits to keep working

### Description

Configure usage credits to keep working when you hit a limit. Previously /extra-usage

### Usage

~~~text
/usage-credits
~~~

## /verify

> Confirm a code change does what it

### Description

Confirm a code change does what it should by building your project's app, running it, and observing the result, rather than relying on tests or type checks. See Run and verify your app. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/verify
~~~

## /vim

> Removed in v2

### Description

Removed in v2.1.92. To toggle between Vim and Normal editing modes, use /config → Editor mode

### Usage

~~~text
/vim
~~~

## /voice

> Toggle voice dictation, or enable it in

### Description

Toggle voice dictation, or enable it in a specific mode. Requires a Claude.ai account

### Usage

~~~text
/voice [hold|tap|off]
~~~

## /web-setup

> Connect your GitHub account to Claude

### Description

Connect your GitHub account to Claude Code on the web using your local gh CLI credentials. /schedule prompts for this automatically if GitHub isn't connected

### Usage

~~~text
/web-setup
~~~

# Claude Code Operations

## Ctrl + X Ctrl + K

> Kill all running background subagents

### Description

Kill all running background subagents in this session. Press twice within 3 seconds to confirm

### Usage

~~~text
Ctrl + X Ctrl + K
~~~

## Ctrl + D

> Exit Claude Code session

### Description

Exit Claude Code session

### Usage

~~~text
Ctrl + D
~~~

## Ctrl + G

> Open in default text editor

### Description

Open in default text editor

### Usage

~~~text
Ctrl + G
~~~

## Ctrl + B

> Background running tasks

### Description

Background running tasks

### Usage

~~~text
Ctrl + B
~~~

## Ctrl + T

> Toggle task list

### Description

Toggle task list

### Usage

~~~text
Ctrl + T
~~~

## Left/Right arrows

> Cycle through dialog tabs

### Description

Cycle through dialog tabs

### Usage

~~~text
Left/Right arrows
~~~

## Up/Down arrows

> Move cursor or navigate command history

### Description

Move cursor or navigate command history

### Usage

~~~text
Up/Down arrows
~~~

## Option + T

> Toggle extended thinking

### Description

Toggle extended thinking

### Usage

~~~text
Option + T
~~~

## Option + O

> Toggle fast mode

### Description

Toggle fast mode

### Usage

~~~text
Option + O
~~~

## Ctrl + A

> Move cursor to start of current line

### Description

Move cursor to start of current line

### Usage

~~~text
Ctrl + A
~~~

## Ctrl + E

> Move cursor to end of current line

### Description

Move cursor to end of current line

### Usage

~~~text
Ctrl + E
~~~

## Ctrl + K

> Delete to end of line

### Description

Delete to end of line

### Usage

~~~text
Ctrl + K
~~~

## Ctrl + U

> Delete from cursor to line start

### Description

Delete from cursor to line start

### Usage

~~~text
Ctrl + U
~~~

## Ctrl + W

> Delete previous word

### Description

Delete previous word

### Usage

~~~text
Ctrl + W
~~~

## Ctrl + Y

> Paste deleted text

### Description

Paste deleted text

### Usage

~~~text
Ctrl + Y
~~~

## Alt + Y

> Cycle paste history

### Description

Cycle paste history

### Usage

~~~text
Alt + Y
~~~

## Alt + B

> Move cursor back one word

### Description

Move cursor back one word

### Usage

~~~text
Alt + B
~~~

## Alt + F

> Move cursor forward one word

### Description

Move cursor forward one word

### Usage

~~~text
Alt + F
~~~

## \ + Enter

> Quick escape — Works in all terminals

### Description

Quick escape — Works in all terminals

### Usage

~~~text
\ + Enter
~~~

## Option + Enter

> Option key — After enabling Option as

### Description

Option key — After enabling Option as Meta on macOS

### Usage

~~~text
Option + Enter
~~~

## Paste directly

> Paste mode — For code blocks, logs

### Description

Paste mode — For code blocks, logs

### Usage

~~~text
Paste directly
~~~

## / at start

> Command or skill

### Description

Command or skill

### Usage

~~~text
/ at start
~~~

## ! at start

> Shell mode

### Description

Shell mode

### Usage

~~~text
! at start
~~~

## ?

> Toggle the keyboard shortcut help panel

### Description

Toggle the keyboard shortcut help panel. Requires fullscreen rendering

### Usage

~~~text
?
~~~

## { / }

> Jump to the previous or next user

### Description

Jump to the previous or next user prompt, like vim paragraph motion. Requires fullscreen rendering

### Usage

~~~text
{ / }
~~~

## [

> Write the full conversation to your

### Description

Write the full conversation to your terminal's native scrollback so Cmd+F, tmux copy mode, and other native tools can search it. Requires fullscreen rendering

### Usage

~~~text
[
~~~

## v

> Write the conversation to a temporary

### Description

Write the conversation to a temporary file and open it in $VISUAL or $EDITOR. Requires fullscreen rendering

### Usage

~~~text
v
~~~

## q

> Exit transcript view

### Description

Exit transcript view. All three can be rebound via transcript:exit

### Usage

~~~text
q
~~~

## Hold

> Voice dictation

### Description

Voice dictation

### Usage

~~~text
Hold
~~~
