use serde::{Deserialize, Serialize};
use std::path::Path;
use std::process::Command;
use tauri::Manager;

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

#[cfg(target_os = "windows")]
const CREATE_NO_WINDOW: u32 = 0x08000000;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ProjectItem {
    pub id: String,
    #[serde(rename = "folderName")]
    pub folder_name: String,
    pub alias: String,
    pub path: String,
    #[serde(rename = "isFavorite")]
    pub is_favorite: bool,
    #[serde(rename = "lastUsedAt")]
    pub last_used_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub projects: Vec<ProjectItem>,
    #[serde(rename = "defaultLaunchMode")]
    pub default_launch_mode: String,
    #[serde(rename = "defaultProvider")]
    pub default_provider: String,
    #[serde(rename = "defaultModel")]
    pub default_model: String,
    #[serde(rename = "defaultBypass")]
    pub default_bypass: bool,
    #[serde(rename = "defaultLanguage")]
    pub default_language: String,
    #[serde(rename = "defaultTheme")]
    pub default_theme: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        AppConfig {
            projects: vec![],
            default_launch_mode: "continue".into(),
            default_provider: "Claude".into(),
            default_model: "sonnet".into(),
            default_bypass: false,
            default_language: "zh-CN".into(),
            default_theme: "light".into(),
        }
    }
}

#[tauri::command]
pub fn check_claude_available() -> bool {
    #[cfg(target_os = "windows")]
    {
        // On Windows, npm CLI tools are .cmd files, must use cmd /c to resolve them
        Command::new("cmd")
            .args(["/c", "claude", "--version"])
            .creation_flags(CREATE_NO_WINDOW)
            .output()
            .map(|o| o.status.success())
            .unwrap_or(false)
    }
    #[cfg(not(target_os = "windows"))]
    {
        Command::new("claude")
            .arg("--version")
            .output()
            .map(|o| o.status.success())
            .unwrap_or(false)
    }
}

fn git_command(path: &str) -> Command {
    #[cfg(target_os = "windows")]
    {
        let mut cmd = Command::new("git");
        cmd.creation_flags(CREATE_NO_WINDOW);
        cmd.args(["-C", path]);
        // Prepend common Git for Windows install paths in case Tauri process PATH is stripped
        let extras = r"C:\Program Files\Git\cmd;C:\Program Files\Git\bin;C:\Program Files (x86)\Git\cmd";
        let current = std::env::var("PATH").unwrap_or_default();
        cmd.env("PATH", format!("{};{}", extras, current));
        cmd
    }
    #[cfg(not(target_os = "windows"))]
    {
        let mut cmd = Command::new("git");
        cmd.args(["-C", path]);
        cmd
    }
}

#[tauri::command]
pub fn get_git_branches(path: String) -> Result<Vec<String>, String> {
    let output = git_command(&path)
        .args(["branch", "--no-color"])
        .output()
        .map_err(|e| e.to_string())?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    let branches: Vec<String> = String::from_utf8_lossy(&output.stdout)
        .lines()
        .map(|l| {
            let s = l.trim();
            if s.starts_with("* ") { s[2..].trim().to_string() } else { s.to_string() }
        })
        .filter(|l| !l.is_empty() && !l.starts_with('('))
        .collect();

    Ok(branches)
}

#[tauri::command]
pub fn get_current_git_branch(path: String) -> Result<Option<String>, String> {
    // Try --show-current (Git 2.22+)
    let output = git_command(&path)
        .args(["branch", "--show-current"])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        let branch = String::from_utf8_lossy(&output.stdout).trim().to_string();
        if !branch.is_empty() {
            return Ok(Some(branch));
        }
    }

    // Fallback: parse * prefix from branch list (handles older Git)
    let output = git_command(&path)
        .args(["branch", "--no-color"])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        for line in String::from_utf8_lossy(&output.stdout).lines() {
            let s = line.trim();
            if s.starts_with("* ") && !s[2..].trim().starts_with('(') {
                return Ok(Some(s[2..].trim().to_string()));
            }
        }
    }

    Ok(None)
}

#[derive(Debug, Serialize)]
pub struct SubdirGitInfo {
    pub subdir: String,
    pub current: String,
    pub branches: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct ClaudeSettingsInfo {
    pub base_url: Option<String>,
    pub model: Option<String>,
    pub default_sonnet: Option<String>,
    pub default_opus: Option<String>,
    pub default_haiku: Option<String>,
    pub all_models: Vec<String>,
    pub gateway_models: Vec<String>,
    pub source: String,
}

fn home_dir() -> Option<std::path::PathBuf> {
    #[cfg(target_os = "windows")]
    { std::env::var("USERPROFILE").ok().map(std::path::PathBuf::from) }
    #[cfg(not(target_os = "windows"))]
    { std::env::var("HOME").ok().map(std::path::PathBuf::from) }
}

fn strip_model_suffix(name: &str) -> String {
    if let Some(idx) = name.find('[') {
        name[..idx].trim_end().to_string()
    } else {
        name.to_string()
    }
}

// Simple text-based extraction: find "KEY": "VALUE" in file content without JSON parsing
fn extract_env_str(text: &str, key: &str) -> Option<String> {
    let needle = format!("\"{}\"", key);
    let start = text.find(&needle)?;
    let rest = text[start + needle.len()..].trim_start();
    let rest = rest.strip_prefix(':')?.trim_start();
    let rest = rest.strip_prefix('"')?;
    let end = rest.find('"')?;
    let val = &rest[..end];
    if val.is_empty() { None } else { Some(val.to_string()) }
}

fn read_gateway_models() -> Vec<String> {
    home_dir()
        .map(|h| h.join(".claude").join("cache").join("gateway-models.json"))
        .and_then(|p| std::fs::read_to_string(p).ok())
        .and_then(|s| serde_json::from_str::<serde_json::Value>(&s).ok())
        .and_then(|v| v.get("models").and_then(|m| m.as_array()).cloned())
        .map(|arr| {
            arr.iter()
                .filter_map(|m| m.get("id").and_then(|id| id.as_str()).map(String::from))
                .collect()
        })
        .unwrap_or_default()
}

#[tauri::command]
pub fn read_claude_settings(project_path: String) -> ClaudeSettingsInfo {
    // When project_path is empty, skip project-level files and only check global.
    let mut candidates: Vec<(std::path::PathBuf, &str)> = vec![];
    if !project_path.is_empty() {
        candidates.push((Path::new(&project_path).join(".claude").join("settings.local.json"), "project"));
        candidates.push((Path::new(&project_path).join(".claude").join("settings.json"), "project"));
    }
    if let Some(h) = home_dir() {
        candidates.push((h.join(".claude").join("settings.json"), "global"));
    }

    for (path, src) in &candidates {
        if !path.exists() { continue; }
        let Ok(text) = std::fs::read_to_string(path) else { continue };

        let base_url = extract_env_str(&text, "ANTHROPIC_BASE_URL");
        let model = extract_env_str(&text, "ANTHROPIC_MODEL").map(|s| strip_model_suffix(&s));
        if base_url.is_none() && model.is_none() { continue; }

        let default_sonnet = extract_env_str(&text, "ANTHROPIC_DEFAULT_SONNET_MODEL").map(|s| strip_model_suffix(&s));
        let default_opus  = extract_env_str(&text, "ANTHROPIC_DEFAULT_OPUS_MODEL").map(|s| strip_model_suffix(&s));
        let default_haiku = extract_env_str(&text, "ANTHROPIC_DEFAULT_HAIKU_MODEL").map(|s| strip_model_suffix(&s));
        let reasoning     = extract_env_str(&text, "ANTHROPIC_REASONING_MODEL").map(|s| strip_model_suffix(&s));

        let mut all_models: Vec<String> = vec![];
        for m in [&model, &default_sonnet, &default_opus, &default_haiku, &reasoning].into_iter().flatten() {
            if !all_models.contains(m) { all_models.push(m.clone()); }
        }

        return ClaudeSettingsInfo {
            base_url, model,
            default_sonnet, default_opus, default_haiku,
            all_models,
            gateway_models: read_gateway_models(),
            source: src.to_string(),
        };
    }

    ClaudeSettingsInfo {
        base_url: None, model: None,
        default_sonnet: None, default_opus: None, default_haiku: None,
        all_models: vec![],
        gateway_models: read_gateway_models(),
        source: "none".to_string(),
    }
}

#[tauri::command]
pub fn get_subdirs_git_branches(path: String) -> Vec<SubdirGitInfo> {
    let entries = match std::fs::read_dir(Path::new(&path)) {
        Ok(e) => e,
        Err(_) => return vec![],
    };

    let mut result = vec![];

    for entry in entries.flatten() {
        let entry_path = entry.path();
        if !entry_path.is_dir() {
            continue;
        }
        let name = match entry.file_name().into_string() {
            Ok(n) => n,
            Err(_) => continue,
        };
        if name.starts_with('.') || name == "node_modules" {
            continue;
        }

        let subdir_str = entry_path.to_string_lossy().to_string();

        let branches_out = match git_command(&subdir_str)
            .args(["branch", "--no-color"])
            .output()
        {
            Ok(o) if o.status.success() => o,
            _ => continue,
        };

        let branches: Vec<String> = String::from_utf8_lossy(&branches_out.stdout)
            .lines()
            .map(|l| {
                let s = l.trim();
                if s.starts_with("* ") { s[2..].trim().to_string() } else { s.to_string() }
            })
            .filter(|l| !l.is_empty() && !l.starts_with('('))
            .collect();

        if branches.is_empty() {
            continue;
        }

        let current = git_command(&subdir_str)
            .args(["branch", "--show-current"])
            .output()
            .ok()
            .filter(|o| o.status.success())
            .and_then(|o| {
                let s = String::from_utf8_lossy(&o.stdout).trim().to_string();
                if s.is_empty() { None } else { Some(s) }
            })
            .unwrap_or_default();

        result.push(SubdirGitInfo { subdir: name, current, branches });
    }

    result.sort_by(|a, b| a.subdir.cmp(&b.subdir));
    result
}

#[tauri::command]
pub fn checkout_git_branch(path: String, branch: String) -> Result<String, String> {
    let output = git_command(&path)
        .args(["checkout", &branch])
        .output()
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).trim().to_string())
    }
}

#[tauri::command]
pub fn open_in_explorer(path: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .arg(&path)
            .spawn()
            .map(|_| ())
            .map_err(|e| e.to_string())
    }
    #[cfg(target_os = "macos")]
    {
        Command::new("open").arg(&path).spawn().map(|_| ()).map_err(|e| e.to_string())
    }
    #[cfg(target_os = "linux")]
    {
        Command::new("xdg-open").arg(&path).spawn().map(|_| ()).map_err(|e| e.to_string())
    }
}

#[tauri::command]
pub fn launch_claude(project_path: String, args: Vec<String>) -> Result<(), String> {
    if !Path::new(&project_path).exists() {
        return Err(format!("directory '{}' does not exist", project_path));
    }

    let claude_cmd = build_claude_command(&args);

    #[cfg(target_os = "windows")]
    return launch_windows(&project_path, &claude_cmd);
    #[cfg(target_os = "macos")]
    return launch_macos(&project_path, &claude_cmd);
    #[cfg(target_os = "linux")]
    return launch_linux(&project_path, &claude_cmd);
}

fn build_claude_command(args: &[String]) -> String {
    let mut parts = vec!["claude".to_string()];
    parts.extend(args.iter().cloned());
    parts.join(" ")
}

#[cfg(target_os = "windows")]
fn launch_windows(project_path: &str, claude_cmd: &str) -> Result<(), String> {
    // Try Windows Terminal
    if Command::new("wt")
        .args(["-d", project_path, "cmd", "/k", claude_cmd])
        .spawn()
        .is_ok()
    {
        return Ok(());
    }

    // Try PowerShell
    let ps_cmd = format!(
        "Set-Location '{}'; {}",
        project_path.replace('\'', "''"),
        claude_cmd
    );
    if Command::new("powershell")
        .args(["-NoExit", "-Command", &ps_cmd])
        .spawn()
        .is_ok()
    {
        return Ok(());
    }

    // Fallback: cmd
    Command::new("cmd")
        .args(["/c", "start", "cmd", "/k",
               &format!("cd /d \"{}\" && {}", project_path, claude_cmd)])
        .spawn()
        .map(|_| ())
        .map_err(|e| e.to_string())
}

#[cfg(target_os = "macos")]
fn launch_macos(project_path: &str, claude_cmd: &str) -> Result<(), String> {
    let script = format!(
        "tell application \"Terminal\" to do script \"cd '{}' && {}\"",
        project_path.replace('\'', "\\'"),
        claude_cmd
    );
    Command::new("osascript")
        .args(["-e", &script])
        .spawn()
        .map(|_| ())
        .map_err(|e| e.to_string())
}

#[cfg(target_os = "linux")]
fn launch_linux(project_path: &str, claude_cmd: &str) -> Result<(), String> {
    let shell_cmd = format!("cd '{}' && {}; exec bash", project_path, claude_cmd);
    for term in &["gnome-terminal", "konsole", "xfce4-terminal", "xterm"] {
        let args: Vec<&str> = match *term {
            "gnome-terminal" => vec!["--", "bash", "-c", &shell_cmd],
            _ => vec!["-e", "bash", "-c", &shell_cmd],
        };
        if Command::new(term).args(&args).spawn().is_ok() {
            return Ok(());
        }
    }
    Err("No supported terminal emulator found".to_string())
}

#[tauri::command]
pub fn load_config(app: tauri::AppHandle) -> Result<AppConfig, String> {
    let config_path = get_config_path(&app)?;
    if !config_path.exists() {
        return Ok(AppConfig::default());
    }
    let content = std::fs::read_to_string(&config_path).map_err(|e| e.to_string())?;
    serde_json::from_str(&content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_config(app: tauri::AppHandle, config: AppConfig) -> Result<(), String> {
    let config_path = get_config_path(&app)?;
    if let Some(parent) = config_path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;
    std::fs::write(config_path, json).map_err(|e| e.to_string())
}

fn get_config_path(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    app.path()
        .app_data_dir()
        .map(|d| d.join("config.json"))
        .map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    const SAMPLE: &str = r#"{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-09158887107547ce875c8857198a3e74",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "DeepSeek-V4-pro[1M]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "DeepSeek-V4-pro[1M]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "DeepSeek-V4-flash[1M]",
    "ANTHROPIC_MODEL": "DeepSeek-V4-pro[1M]",
    "ANTHROPIC_REASONING_MODEL": "DeepSeek-V4-pro[1M]"
  },
  "model": "sonnet"
}"#;

    #[test]
    fn extract_base_url() {
        assert_eq!(
            extract_env_str(SAMPLE, "ANTHROPIC_BASE_URL"),
            Some("https://api.deepseek.com/anthropic".to_string())
        );
    }

    #[test]
    fn extract_model_not_confused_by_other_keys() {
        // "ANTHROPIC_MODEL" must not match ANTHROPIC_DEFAULT_*_MODEL
        assert_eq!(
            extract_env_str(SAMPLE, "ANTHROPIC_MODEL"),
            Some("DeepSeek-V4-pro[1M]".to_string())
        );
    }

    #[test]
    fn strips_suffix() {
        assert_eq!(strip_model_suffix("DeepSeek-V4-pro[1M]"), "DeepSeek-V4-pro");
    }

    #[test]
    fn read_settings_from_project_dir() {
        let dir = std::env::temp_dir().join(format!("ccl_test_{}", std::process::id()));
        let claude = dir.join(".claude");
        std::fs::create_dir_all(&claude).unwrap();
        std::fs::write(claude.join("settings.json"), SAMPLE).unwrap();

        let info = read_claude_settings(dir.to_string_lossy().to_string());
        std::fs::remove_dir_all(&dir).ok();

        assert_eq!(info.source, "project");
        assert_eq!(info.base_url.as_deref(), Some("https://api.deepseek.com/anthropic"));
        assert_eq!(info.model.as_deref(), Some("DeepSeek-V4-pro"));
        assert!(info.all_models.contains(&"DeepSeek-V4-pro".to_string()));
        assert!(info.all_models.contains(&"DeepSeek-V4-flash".to_string()));
    }

    // Real-world scenario: project has its own settings.json WITHOUT provider config,
    // DeepSeek config lives only in global ~/.claude/settings.json.
    // Detection must fall through the project file and pick up global.
    // Uses a faked HOME/USERPROFILE so the real global settings is never touched.
    #[test]
    fn falls_through_project_to_global() {
        let base = std::env::temp_dir().join(format!("ccl_global_{}", std::process::id()));
        let fake_home = base.join("home");
        let project = base.join("project");
        std::fs::create_dir_all(fake_home.join(".claude")).unwrap();
        std::fs::create_dir_all(project.join(".claude")).unwrap();
        // Global has DeepSeek
        std::fs::write(fake_home.join(".claude").join("settings.json"), SAMPLE).unwrap();
        // Project has a settings.json with NO ANTHROPIC keys (permissions only)
        std::fs::write(
            project.join(".claude").join("settings.json"),
            r#"{ "permissions": { "allow": ["Bash(gh api *)"] } }"#,
        ).unwrap();

        let key = if cfg!(windows) { "USERPROFILE" } else { "HOME" };
        let saved = std::env::var(key).ok();
        std::env::set_var(key, &fake_home);
        let info = read_claude_settings(project.to_string_lossy().to_string());
        match saved {
            Some(v) => std::env::set_var(key, v),
            None => std::env::remove_var(key),
        }
        std::fs::remove_dir_all(&base).ok();

        assert_eq!(info.source, "global", "should fall through project file to global");
        assert_eq!(info.base_url.as_deref(), Some("https://api.deepseek.com/anthropic"));
        assert_eq!(info.model.as_deref(), Some("DeepSeek-V4-pro"));
    }
}
