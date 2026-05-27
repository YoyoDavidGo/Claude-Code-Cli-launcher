<!--
CCL-CHEATSHEET
schema: 1
lang: en-US
version: 2026.05.25
updatedAt: 2026-05-25
source: official-docs
-->


# Claude Code Commands

## /agents

> Manage agent configurations

### Purpose

Manage agent configurations

### Usage

~~~text
/agents
~~~

## /branch

> Branch conversation at current point

### Purpose

Create a branch of the current conversation at this point. Switches you into the branch and preserves the original, which you can return to with /resume. Alias: /fork. When CLAUDE_CODE_FORK_SUBAGENT is set, /fork instead spawns a forked subagent and is no longer an alias for this command

### Usage

~~~text
/branch [name]
~~~

## /btw

> Ask a quick side question

### Purpose

Ask a quick side question without adding to the conversation

### Usage

~~~text
/btw
~~~

## /clear

> Start a new conversation with empty context

### Purpose

Start a new conversation with empty context. The previous conversation stays available in /resume. Pass a name to label the previous conversation in the /resume picker. To free up context while continuing the same conversation, use /compact instead. Aliases: /reset, /new

### Usage

~~~text
/clear [name]
~~~

## /code-review

> Review diff for correctness bugs

### Purpose

Review the current diff for correctness bugs and report findings without editing files. Lower effort levels return fewer, higher-confidence findings, while high through max give broader coverage and may include uncertain findings. Without an effort argument, the review uses the session's current effort. Pass --comment to post findings as inline comments on the current GitHub PR. Pass a path or PR reference to review a specific target. Formerly /simplify, which still works as an alias

### Usage

~~~text
/code-review [low|medium|high|xhigh|max] [--comment] [target]
~~~

## /compact

> Free up context by summarizing conversation

### Purpose

Free up context by summarizing the conversation so far. Optionally pass focus instructions for the summary. See how compaction handles rules, skills, and memory files

### Usage

~~~text
/compact [instructions]
~~~

## /config

> Open Settings interface

### Purpose

Open the Settings interface to adjust theme, model, output style, and other preferences. Alias: /settings

### Usage

~~~text
/config
~~~

## /context

> Visualize current context usage as a colored grid

### Purpose

Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings. In fullscreen mode the per-item breakdown is collapsed to keep the grid visible. Pass all to expand it

### Usage

~~~text
/context [all]
~~~

## /diff

> Open interactive diff viewer

### Purpose

Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files

### Usage

~~~text
/diff
~~~

## /effort

> Set the model effort level

### Purpose

Set the model effort level. Accepts low, medium, high, xhigh, or max; available levels depend on the model and max is session-only. auto resets to the model default. Without an argument, opens an interactive slider; use left and right arrows to pick a level and Enter to apply. Takes effect immediately without waiting for the current response to finish

### Usage

~~~text
/effort [level|auto]
~~~

## /fast

> Toggle fast mode on or off

### Purpose

Toggle fast mode on or off

### Usage

~~~text
/fast [on|off]
~~~

## /goal

> Set a goal

### Purpose

Set a goal: Claude keeps working across turns until the condition is met. With no argument, shows the current or most recently achieved goal. clear, stop, off, reset, none, or cancel removes an active goal early

### Usage

~~~text
/goal [condition|clear]
~~~

## /help

> Show help and available commands

### Purpose

Show help and available commands

### Usage

~~~text
/help
~~~

## /init

> Initialize project with a CLAUDE

### Purpose

Initialize project with a CLAUDE.md guide. Set CLAUDE_CODE_NEW_INIT=1 for an interactive flow that also walks through skills, hooks, and personal memory files

### Usage

~~~text
/init
~~~

## /model

> Set the AI model for the current session

### Purpose

Set the AI model for the current session. For models that support it, use left/right arrows to adjust effort level. With no argument, opens a picker; press d on a row to also save that model as the default for new sessions. The picker asks for confirmation when the conversation has prior output, since the next response re-reads the full history without cached context. Once confirmed, the change applies without waiting for the current response to finish

### Usage

~~~text
/model [model]
~~~

## /permissions

> Manage tool permission rules

### Purpose

Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials. Alias: /allowed-tools

### Usage

~~~text
/permissions
~~~

## /rename

> Rename current session

### Purpose

Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history

### Usage

~~~text
/rename [name]
~~~

## /resume

> Resume a conversation by ID or name

### Purpose

Resume a conversation by ID or name, or open the session picker. As of v2.1.144, background sessions appear in the picker marked with bg. Alias: /continue

### Usage

~~~text
/resume [session]
~~~

## /review

> Review a pull request locally

### Purpose

Review a pull request locally in your current session. For a deeper cloud-based review, see /ultrareview

### Usage

~~~text
/review [PR]
~~~

## /rewind

> Rewind conversation to previous point

### Purpose

Rewind the conversation and/or code to a previous point, or summarize from a selected message. See checkpointing. Aliases: /checkpoint, /undo

### Usage

~~~text
/rewind
~~~

## /skills

> List available skills

### Purpose

List available skills. Press t to sort by token count. Press Space to hide a skill from Claude or the / menu, then Enter to save

### Usage

~~~text
/skills
~~~

## /status

> Show version, model, and connectivity

### Purpose

Open the Settings interface (Status tab) showing version, model, account, and connectivity. Works while Claude is responding, without waiting for the current response to finish

### Usage

~~~text
/status
~~~

## /usage

> Show session cost and usage stats

### Purpose

Show session cost, plan usage limits, and activity stats. See the cost tracking guide for subscription-specific details. /cost and /stats are aliases

### Usage

~~~text
/usage
~~~

# Claude Code Operations

## Ctrl + C

> Interrupt running operation or clear input

### Description

Interrupt, or clear input

### Context

Interrupts a running operation. If nothing is running, the first press clears the prompt input and a second press exits Claude Code

### Usage

~~~text
Ctrl + C
~~~

## Ctrl + D

> Exit Claude Code session — EOF signal

### Description

Exit Claude Code session

### Context

EOF signal

### Usage

~~~text
Ctrl + D
~~~

## Ctrl + L

> Redraw screen — Forces a full terminal redraw

### Description

Redraw screen

### Context

Forces a full terminal redraw. Input and conversation history are kept. Use this to recover if the display becomes garbled or partially blank

### Usage

~~~text
Ctrl + L
~~~

## Ctrl + O

> Toggle transcript viewer

### Description

Toggle transcript viewer

### Context

Shows detailed tool usage and execution. Also expands MCP calls, which collapse to a single line like "Called slack 3 times" by default

### Usage

~~~text
Ctrl + O
~~~

## Ctrl + R

> Reverse search command history

### Description

Reverse search command history

### Context

Search through previous commands interactively

### Usage

~~~text
Ctrl + R
~~~

## Ctrl + V

> Paste image from clipboard

### Description

Paste image from clipboard

### Context

Inserts an [Image #N] chip at the cursor so you can reference it positionally in your prompt

### Usage

~~~text
Ctrl + V
~~~

## Esc

> Stop current response mid-turn

### Description

Interrupt Claude

### Context

Stop the current response or tool call mid-turn so you can redirect. Claude keeps the work done so far

### Usage

~~~text
Esc
~~~

## Esc + Esc

> Clear input draft or open rewind menu

### Description

Clear input draft, or rewind

### Context

When the prompt input contains text, double Esc clears it and saves the draft to history so Up recalls it. When the input is empty, double Esc opens the rewind menu to restore or summarize code and conversation from a previous point

### Usage

~~~text
Esc + Esc
~~~

## Shift + Tab

> Cycle through permission modes

### Description

Cycle permission modes

### Context

Cycle through default, acceptEdits, plan, and any modes you have enabled, such as auto or bypassPermissions. See permission modes.

### Usage

~~~text
Shift + Tab
~~~

## Option + P

> Switch model without clearing prompt

### Description

Switch model

### Context

Switch models without clearing your prompt

### Usage

~~~text
Option + P
~~~

## Ctrl + A

> Move cursor to start of line

### Description

Move cursor to start of current line

### Context

In multiline input, moves to the start of the current logical line

### Usage

~~~text
Ctrl + A
~~~

## Ctrl + E

> Move cursor to end of line

### Description

Move cursor to end of current line

### Context

In multiline input, moves to the end of the current logical line

### Usage

~~~text
Ctrl + E
~~~

## Ctrl + K

> Delete to end of line

### Description

Delete to end of line

### Context

Stores deleted text for pasting

### Usage

~~~text
Ctrl + K
~~~

## Ctrl + U

> Delete from cursor to line start

### Description

Delete from cursor to line start

### Context

Stores deleted text for pasting. Repeat to clear across lines in multiline input. On macOS, terminal emulators including iTerm2 and Terminal.app map Cmd+Backspace to this shortcut

### Usage

~~~text
Ctrl + U
~~~

## Option + Enter

> Option key newline

### Description

Multiline input

### Method

Option key

### Context

After enabling Option as Meta on macOS

### Usage

~~~text
Option + Enter
~~~

## Shift + Enter

> Shift+Enter newline

### Description

Multiline input

### Method

Shift+Enter

### Context

Native in iTerm2, WezTerm, Ghostty, Kitty, Warp, Apple Terminal, Windows Terminal

### Usage

~~~text
Shift + Enter
~~~

## Ctrl + J

> Insert newline via control sequence

### Description

Multiline input

### Method

Control sequence

### Context

Works in any terminal without configuration

### Usage

~~~text
Ctrl + J
~~~

## / at start

> Command or skill — See commands and skills

### Description

Command or skill

### Notes

See commands and skills

### Usage

~~~text
/ at start
~~~

## @

> File path mention — Trigger file path autocomplete

### Description

File path mention

### Notes

Trigger file path autocomplete

### Usage

~~~text
@
~~~

---

> Less common items

# Claude Code Commands

## /add-dir

> Add a working directory for file access

### Purpose

Add a working directory for file access during the current session. Most .claude/ configuration is not discovered from the added directory. You can later resume the session from the added directory with --continue or --resume

### Usage

~~~text
/add-dir
~~~

## /autofix-pr

> Auto-fix PR CI failures and review comments

### Purpose

Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with gh pr view; to watch a different PR, check out its branch first. By default the remote session is told to fix every CI failure and review comment; pass a prompt to give it different instructions, for example /autofix-pr only fix lint and type errors. Requires the gh CLI and access to Claude Code on the web

### Usage

~~~text
/autofix-pr [prompt]
~~~

## /background

> Detach session as background agent

### Purpose

Detach the current session to run as a background agent and free this terminal. Pass a prompt to send one more instruction before detaching. Monitor the session with claude agents. Alias: /bg

### Usage

~~~text
/background [prompt]
~~~

## /batch

> Orchestrate large-scale parallel changes

### Purpose

Orchestrate large-scale changes across a codebase in parallel. Researches the codebase, decomposes the work into 5 to 30 independent units, and presents a plan. Once approved, spawns one background subagent per unit in an isolated git worktree. Each subagent implements its unit, runs tests, and opens a pull request. Requires a git repository. Example: /batch migrate src/ from Solid to React

### Usage

~~~text
/batch
~~~

## /chrome

> Configure Claude in Chrome settings

### Purpose

Configure Claude in Chrome settings

### Usage

~~~text
/chrome
~~~

## /claude-api

> Load Claude API reference material

### Purpose

Load Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL) and Managed Agents reference. Covers tool use, streaming, batches, structured outputs, and common pitfalls. Also activates automatically when your code imports anthropic or @anthropic-ai/sdk. Run /claude-api migrate to upgrade existing Claude API code to a newer model: Claude asks which files to scan and which model to target, then updates model IDs, thinking configuration, and other parameters that changed between versions. Run /claude-api managed-agents-onboard for an interactive walkthrough that creates a new Managed Agent from scratch

### Usage

~~~text
/claude-api [migrate|managed-agents-onboard]
~~~

## /color

> Set the prompt bar color for the current session

### Purpose

Set the prompt bar color for the current session. Available colors: red, blue, green, yellow, purple, orange, pink, cyan. Use default to reset, or run with no argument to pick a random color. When Remote Control is connected, the color syncs to claude.ai/code

### Usage

~~~text
/color [color|default]
~~~

## /copy

> Copy the last assistant response to clipboard

### Purpose

Copy the last assistant response to clipboard. Pass a number N to copy the Nth-latest response: /copy 2 copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press w in the picker to write the selection to a file instead of the clipboard, which is useful over SSH

### Usage

~~~text
/copy [N]
~~~

## /cost

> Alias for /usage

### Purpose

Alias for /usage

### Usage

~~~text
/cost
~~~

## /debug

> Enable debug logging for session

### Purpose

Enable debug logging for the current session and troubleshoot issues by reading the session debug log. Debug logging is off by default unless you started with claude --debug, so running /debug mid-session starts capturing logs from that point forward. Optionally describe the issue to focus the analysis

### Usage

~~~text
/debug [description]
~~~

## /desktop

> Continue session in Desktop app

### Purpose

Continue the current session in the Claude Code Desktop app. Requires macOS or Windows and a Claude subscription. Alias: /app

### Usage

~~~text
/desktop
~~~

## /doctor

> Diagnose and verify installation

### Purpose

Diagnose and verify your Claude Code installation and settings. Results show with status icons. Press f to have Claude fix any reported issues

### Usage

~~~text
/doctor
~~~

## /exit

> Exit the CLI

### Purpose

Exit the CLI. In an attached background session, this detaches and the session keeps running. Alias: /quit

### Usage

~~~text
/exit
~~~

## /export

> Export the current conversation as plain text

### Purpose

Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file

### Usage

~~~text
/export [filename]
~~~

## /feedback

> Submit feedback or report a bug

### Purpose

Submit feedback, report a bug, or share your conversation. Aliases: /bug, /share

### Usage

~~~text
/feedback [report]
~~~

## /fewer-permission-prompts

> Reduce permission prompts via allowlist

### Purpose

Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts

### Usage

~~~text
/fewer-permission-prompts
~~~

## /focus

> Toggle focus view

### Purpose

Toggle the focus view, which shows only your last prompt, a one-line tool-call summary with edit diffstats, and the final response. The selection persists across sessions; set viewMode in settings to override it. Only available in fullscreen rendering

### Usage

~~~text
/focus
~~~

## /heapdump

> Write JS heap snapshot for diagnostics

### Purpose

Write a JavaScript heap snapshot and a memory breakdown to ~/Desktop, or your home directory on Linux without a Desktop folder, for diagnosing high memory usage. See troubleshooting

### Usage

~~~text
/heapdump
~~~

## /hooks

> View hook configurations for tool events

### Purpose

View hook configurations for tool events

### Usage

~~~text
/hooks
~~~

## /ide

> Manage IDE integrations and show status

### Purpose

Manage IDE integrations and show status

### Usage

~~~text
/ide
~~~

## /insights

> Generate session analysis report

### Purpose

Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points

### Usage

~~~text
/insights
~~~

## /install-github-app

> Set up Claude GitHub Actions app

### Purpose

Set up the Claude GitHub Actions app for a repository. Walks you through selecting a repo and configuring the integration

### Usage

~~~text
/install-github-app
~~~

## /install-slack-app

> Install the Claude Slack app

### Purpose

Install the Claude Slack app. Opens a browser to complete the OAuth flow

### Usage

~~~text
/install-slack-app
~~~

## /keybindings

> Open or create your keybindings configuration file

### Purpose

Open or create your keybindings configuration file

### Usage

~~~text
/keybindings
~~~

## /login

> Sign in to your Anthropic account

### Purpose

Sign in to your Anthropic account

### Usage

~~~text
/login
~~~

## /logout

> Sign out from your Anthropic account

### Purpose

Sign out from your Anthropic account

### Usage

~~~text
/logout
~~~

## /loop

> Run a prompt repeatedly on schedule

### Purpose

Run a prompt repeatedly while the session stays open. Omit the interval and Claude self-paces between iterations. Omit the prompt and, where available, Claude runs an autonomous maintenance check or the prompt in .claude/loop.md. Example: /loop 5m check if the deploy finished. See Run prompts on a schedule. Alias: /proactive

### Usage

~~~text
/loop [interval] [prompt]
~~~

## /mcp

> Manage MCP server connections

### Purpose

Manage MCP server connections and OAuth authentication

### Usage

~~~text
/mcp
~~~

## /memory

> Edit CLAUDE

### Purpose

Edit CLAUDE.md memory files, enable or disable auto-memory, and view auto-memory entries

### Usage

~~~text
/memory
~~~

## /mobile

> Show QR code to download the Claude mobile app

### Purpose

Show QR code to download the Claude mobile app. Aliases: /ios, /android

### Usage

~~~text
/mobile
~~~

## /passes

> Share a free week of Claude Code with friends

### Purpose

Share a free week of Claude Code with friends. Only visible if your account is eligible

### Usage

~~~text
/passes
~~~

## /plan

> Enter plan mode directly from the prompt

### Purpose

Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example /plan fix the auth bug

### Usage

~~~text
/plan [description]
~~~

## /plugin

> Manage Claude Code plugins

### Purpose

Manage Claude Code plugins

### Usage

~~~text
/plugin
~~~

## /powerup

> Discover features via interactive lessons

### Purpose

Discover Claude Code features through quick interactive lessons with animated demos

### Usage

~~~text
/powerup
~~~

## /pr-comments

> Removed in v2

### Purpose

Removed in v2.1.91. Ask Claude directly to view pull request comments instead. On earlier versions, fetches and displays comments from a GitHub pull request; automatically detects the PR for the current branch, or pass a PR URL or number. Requires the gh CLI

### Usage

~~~text
/pr-comments [PR]
~~~

## /privacy-settings

> View and update your privacy settings

### Purpose

View and update your privacy settings. Only available for Pro and Max plan subscribers

### Usage

~~~text
/privacy-settings
~~~

## /radio

> Open Claude FM lo-fi radio in your browser

### Purpose

Open Claude FM lo-fi radio in your browser. Prints the stream URL when no browser is available. Not available on Bedrock, Vertex, or Foundry

### Usage

~~~text
/radio
~~~

## /recap

> Generate one-line session summary

### Purpose

Generate a one-line summary of the current session on demand. See Session recap for the automatic recap that appears after you've been away

### Usage

~~~text
/recap
~~~

## /release-notes

> View changelog in version picker

### Purpose

View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions

### Usage

~~~text
/release-notes
~~~

## /reload-plugins

> Reload all active plugins

### Purpose

Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors

### Usage

~~~text
/reload-plugins
~~~

## /remote-control

> Enable remote control from claude.ai

### Purpose

Make this session available for remote control from claude.ai. Alias: /rc

### Usage

~~~text
/remote-control
~~~

## /remote-env

> Configure default remote environment

### Purpose

Configure the default remote environment for web sessions started with --remote

### Usage

~~~text
/remote-env
~~~

## /run

> Launch and drive project app

### Purpose

Launch and drive your project's app to see a change working in the running app, not just in tests. See Run and verify your app. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/run
~~~

## /run-skill-generator

> Teach /run how to build and drive app

### Purpose

Teach /run and /verify how to build, launch, and drive your project's app from a clean environment by writing a per-project skill. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/run-skill-generator
~~~

## /sandbox

> Toggle sandbox mode

### Purpose

Toggle sandbox mode. Available on supported platforms only

### Usage

~~~text
/sandbox
~~~

## /schedule

> Create and manage cloud routines

### Purpose

Create, update, list, or run routines, which execute on Anthropic-managed cloud infrastructure. Claude walks you through the setup conversationally. Alias: /routines

### Usage

~~~text
/schedule [description]
~~~

## /scroll-speed

> Adjust mouse wheel scroll speed

### Purpose

Adjust mouse wheel scroll speed interactively, with a ruler you can scroll while the dialog is open to preview the change. Available in fullscreen rendering only and not in the JetBrains IDE terminal

### Usage

~~~text
/scroll-speed
~~~

## /security-review

> Analyze changes for security vulnerabilities

### Purpose

Analyze pending changes on the current branch for security vulnerabilities. Reviews the git diff and identifies risks like injection, auth issues, and data exposure

### Usage

~~~text
/security-review
~~~

## /setup-bedrock

> Configure Amazon Bedrock via wizard

### Purpose

Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when CLAUDE_CODE_USE_BEDROCK=1 is set. First-time Bedrock users can also access this wizard from the login screen

### Usage

~~~text
/setup-bedrock
~~~

## /setup-vertex

> Configure Google Vertex AI via wizard

### Purpose

Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when CLAUDE_CODE_USE_VERTEX=1 is set. First-time Vertex AI users can also access this wizard from the login screen

### Usage

~~~text
/setup-vertex
~~~

## /stats

> Alias for /usage

### Purpose

Alias for /usage. Opens on the Stats tab

### Usage

~~~text
/stats
~~~

## /statusline

> Configure Claude Code's status line

### Purpose

Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt

### Usage

~~~text
/statusline
~~~

## /stickers

> Order Claude Code stickers

### Purpose

Order Claude Code stickers

### Usage

~~~text
/stickers
~~~

## /stop

> Stop the current background session

### Purpose

Stop the current background session. Only available while attached to a background session; the transcript and any worktree are kept. To detach without stopping, use /exit or press ←

### Usage

~~~text
/stop
~~~

## /tasks

> List and manage background tasks

### Purpose

List and manage background tasks. Also available as /bashes

### Usage

~~~text
/tasks
~~~

## /team-onboarding

> Generate team onboarding guide from history

### Purpose

Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide a teammate can paste as a first message to get set up quickly. For claude.ai subscribers on Pro, Max, Team, and Enterprise plans, also returns a share link teammates can open directly in Claude Code

### Usage

~~~text
/team-onboarding
~~~

## /teleport

> Pull web session into terminal

### Purpose

Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as /tp. Requires a claude.ai subscription

### Usage

~~~text
/teleport
~~~

## /terminal-setup

> Configure terminal keybindings

### Purpose

Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Cursor, Windsurf, Alacritty, or Zed

### Usage

~~~text
/terminal-setup
~~~

## /theme

> Change the color theme

### Purpose

Change the color theme. Includes an auto option that matches your terminal's light or dark background, light and dark variants, colorblind-accessible (daltonized) themes, ANSI themes that use your terminal's color palette, and any custom themes from ~/.claude/themes/ or plugins. Select New custom theme… to create one

### Usage

~~~text
/theme
~~~

## /tui

> Set terminal UI renderer

### Purpose

Set the terminal UI renderer and relaunch into it with your conversation intact. fullscreen enables the flicker-free alt-screen renderer. With no argument, prints the active renderer

### Usage

~~~text
/tui [default|fullscreen]
~~~

## /ultraplan

> Draft plan in cloud ultraplan session

### Purpose

Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back to your terminal

### Usage

~~~text
/ultraplan
~~~

## /ultrareview

> Run deep multi-agent code review in cloud

### Purpose

Run a deep, multi-agent code review in a cloud sandbox with ultrareview. Includes 3 free runs on Pro and Max, then requires usage credits

### Usage

~~~text
/ultrareview [PR]
~~~

## /upgrade

> Open upgrade page for higher plan tier

### Purpose

Open the upgrade page to switch to a higher plan tier

### Usage

~~~text
/upgrade
~~~

## /usage-credits

> Configure usage credits for limits

### Purpose

Configure usage credits to keep working when you hit a limit. Previously /extra-usage

### Usage

~~~text
/usage-credits
~~~

## /verify

> Confirm code change by running app

### Purpose

Confirm a code change does what it should by building your project's app, running it, and observing the result, rather than relying on tests or type checks. See Run and verify your app. Requires Claude Code v2.1.145 or later

### Usage

~~~text
/verify
~~~

## /vim

> Removed in v2

### Purpose

Removed in v2.1.92. To toggle between Vim and Normal editing modes, use /config → Editor mode

### Usage

~~~text
/vim
~~~

## /voice

> Toggle voice dictation mode

### Purpose

Toggle voice dictation, or enable it in a specific mode. Requires a Claude.ai account

### Usage

~~~text
/voice [hold|tap|off]
~~~

## /web-setup

> Connect GitHub account to Claude Code web

### Purpose

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

### Context

Subagent control

### Usage

~~~text
Ctrl + X Ctrl + K
~~~

## Ctrl + G

> Open prompt in default text editor

### Description

Open in default text editor

### Context

Edit your prompt or custom response in your default text editor. Ctrl+X Ctrl+E is the readline-native binding. Turn on Show last response in external editor in /config to prepend Claude's previous reply as #-commented context above your prompt; the comment block is stripped when you save

### Usage

~~~text
Ctrl + G
~~~

## Ctrl + B

> Background running tasks

### Description

Background running tasks

### Context

Backgrounds bash commands and agents. Tmux users press twice

### Usage

~~~text
Ctrl + B
~~~

## Ctrl + T

> Toggle task list visibility

### Description

Toggle task list

### Context

Show or hide the task list in the terminal status area

### Usage

~~~text
Ctrl + T
~~~

## Left/Right arrows

> Cycle through dialog tabs

### Description

Cycle through dialog tabs

### Context

Navigate between tabs in permission dialogs and menus

### Usage

~~~text
Left/Right arrows
~~~

## Up/Down arrows

> Move cursor or navigate history

### Description

Move cursor or navigate command history

### Context

In multiline input, first moves the cursor within the prompt. Once the cursor is already on the top or bottom edge, pressing again navigates command history

### Usage

~~~text
Up/Down arrows
~~~

## Option + T

> Toggle extended thinking mode

### Description

Toggle extended thinking

### Context

Enable or disable extended thinking mode. As of v2.1.132 this shortcut works on macOS without configuring Option as Meta

### Usage

~~~text
Option + T
~~~

## Option + O

> Toggle fast mode — Enable or disable fast mode

### Description

Toggle fast mode

### Context

Enable or disable fast mode

### Usage

~~~text
Option + O
~~~

## Ctrl + W

> Delete previous word

### Description

Delete previous word

### Context

Stores deleted text for pasting. On Windows, Ctrl+Backspace also deletes the previous word

### Usage

~~~text
Ctrl + W
~~~

## Ctrl + Y

> Paste previously deleted text

### Description

Paste deleted text

### Context

Paste text deleted with Ctrl+K, Ctrl+U, or Ctrl+W

### Usage

~~~text
Ctrl + Y
~~~

## Alt + Y

> Cycle through paste history

### Description

Cycle paste history

### Context

After pasting, cycle through previously deleted text. Requires Option as Meta on macOS

### Usage

~~~text
Alt + Y
~~~

## Alt + B

> Move cursor back one word — Word navigation

### Description

Move cursor back one word

### Context

Word navigation. Requires Option as Meta on macOS

### Usage

~~~text
Alt + B
~~~

## Alt + F

> Move cursor forward one word — Word navigation

### Description

Move cursor forward one word

### Context

Word navigation. Requires Option as Meta on macOS

### Usage

~~~text
Alt + F
~~~

## \ + Enter

> Quick escape — Works in all terminals

### Description

Multiline input

### Method

Quick escape

### Context

Works in all terminals

### Usage

~~~text
\ + Enter
~~~

## Paste directly

> Paste mode — For code blocks, logs

### Description

Multiline input

### Method

Paste mode

### Context

For code blocks, logs

### Usage

~~~text
Paste directly
~~~

## ! at start

> Run shell command directly

### Description

Shell mode

### Notes

Run commands directly and add execution output to the session

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

> Jump between user prompts

### Description

Jump to the previous or next user prompt, like vim paragraph motion. Requires fullscreen rendering

### Usage

~~~text
{ / }
~~~

## [

> Write conversation to terminal scrollback

### Description

Write the full conversation to your terminal's native scrollback so Cmd+F, tmux copy mode, and other native tools can search it. Requires fullscreen rendering

### Usage

~~~text
[
~~~

## v

> Open conversation in editor

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

> Hold to record voice dictation

### Description

Voice dictation

### Notes

Requires voice dictation to be enabled. Hold to record, or run /voice tap for tap-to-toggle. Rebindable

### Usage

~~~text
Hold
~~~
