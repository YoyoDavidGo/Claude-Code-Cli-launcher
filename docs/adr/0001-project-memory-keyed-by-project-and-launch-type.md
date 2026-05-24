# Project Memory is keyed by (Launch Type, Project), not by Launch Type alone

Launcher choices (launch mode, model, bypass, git branch) are remembered per individual Project **and** per Launch Type (Normal vs Agent View) — a two-level key. We rejected the simpler per-Launch-Type model (one shared set of choices across all projects) because users configure each project differently and expect those choices to stick to the project.

Consequences: storage is a nested `launchType → projectPath → memory` map; a project's memory is cascade-deleted when it leaves that mode's list; a brand-new project (no memory) is born at selection-time by inheriting launch-mode/bypass from the previously-open project and snapshotting immediately, so it stays frozen independently thereafter.
