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
