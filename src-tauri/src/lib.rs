mod commands;

use tauri::Manager;
use commands::{
    check_claude_available, checkout_git_branch, get_current_git_branch, get_git_branches,
    get_subdirs_git_branches, launch_claude, load_config, open_in_explorer, open_terminal, read_claude_settings,
    read_cheatsheet, restore_cheatsheet_default, save_config,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.show();
                let _ = w.set_focus();
            }
        }))
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            check_claude_available,
            get_git_branches,
            get_current_git_branch,
            get_subdirs_git_branches,
            checkout_git_branch,
            launch_claude,
            load_config,
            open_in_explorer,
            open_terminal,
            save_config,
            read_claude_settings,
            read_cheatsheet,
            restore_cheatsheet_default,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
