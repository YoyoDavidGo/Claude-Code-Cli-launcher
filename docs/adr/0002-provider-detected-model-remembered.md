# Provider is always auto-detected; only the model within it is remembered

The model Provider (Claude, DeepSeek, …) is always inferred fresh from the project's own `.claude/settings.json` and is never restored from launcher memory — the project file is the source of truth. Only the specific model *within* the detected provider is remembered per (Project, Launch Type), and on restore it is validated against the detected provider's model list, falling back to the provider default if the remembered model no longer fits. The free-text custom model is remembered verbatim (it belongs to no provider list).

This is surprising — a reader would expect Provider to be remembered like everything else. Recording it here: remembering the Provider would let it drift out of sync with the project's actual config, so we deliberately don't.
