// A file manager that uses Tauri to open folders and manage files.

// To fix the "unresolved import" error, you need to add the `rfd`, `serde`, and `serde_json` crates to your project's
// `Cargo.toml` file. You can do this by running the following commands in your terminal:
// cargo add rfd
// cargo add serde --features derive
// cargo add serde_json
use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use uuid::Uuid;

// This struct defines the data model for the file object.
// It matches the JSON structure expected by the React frontend.
#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    pub id: String,
    pub name: String,
    pub is_dir: bool,
    pub path: String,
    pub children: Option<Vec<File>>,
}

// This function is now a private helper function.
fn open_folder_dialog() -> Option<String> {
    println!("Opening folder selection dialog...");
    let result = FileDialog::new().pick_folder();
    if let Some(path_buf) = result {
        if let Some(path_str) = path_buf.to_str() {
            return Some(path_str.to_string());
        }
    }
    None
}

// A function to open a folder using platform-specific commands.
fn execute_open_command(path: &Path) {
    let result = if cfg!(target_os = "windows") {
        Command::new("explorer").arg(path).spawn()
    } else if cfg!(target_os = "macos") {
        Command::new("open").arg(path).spawn()
    } else if cfg!(target_os = "linux") {
        Command::new("xdg-open").arg(path).spawn()
    } else {
        println!("Unsupported operating system for opening folders.");
        return;
    };

    match result {
        Ok(_) => println!("Successfully opened folder: {}", path.display()),
        Err(e) => println!("Failed to open folder: {} - {:?}", path.display(), e),
    }
}

// A new Tauri command that selects and opens a folder.
#[tauri::command]
fn select_and_open_folder() -> Option<String> {
    // We get an Option<String> from the dialog.
    let selected_path_option = open_folder_dialog();

    // Use `if let` to safely unwrap the `Option`.
    if let Some(path_str) = selected_path_option {
        let path_buf = PathBuf::from(&path_str);
        execute_open_command(&path_buf);
        return Some(path_str.to_string());
    }

    // If no path was selected or there was an issue, return None.
    None
}

// Recursive function to build the file tree.
fn build_file_tree(path: &Path) -> std::io::Result<File> {
    let metadata = fs::metadata(path)?;
    let is_dir = metadata.is_dir();
    let name = path
        .file_name()
        .unwrap_or_else(|| path.as_os_str())
        .to_string_lossy()
        .to_string();

    let mut children = None;
    if is_dir {
        let mut child_nodes = Vec::new();
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let child_path = entry.path();
            // Recurse into subdirectories.
            if child_path.is_dir() {
                if let Ok(child_node) = build_file_tree(&child_path) {
                    child_nodes.push(child_node);
                }
            } else {
                // If it's a file, add it to the list.
                let file_name = child_path
                    .file_name()
                    .unwrap_or_else(|| child_path.as_os_str())
                    .to_string_lossy()
                    .to_string();
                child_nodes.push(File {
                    id: Uuid::new_v4().to_string(),
                    name: file_name,
                    is_dir: false,
                    path: child_path.to_string_lossy().to_string(),
                    children: None,
                });
            }
        }
        children = Some(child_nodes);
    }

    Ok(File {
        id: Uuid::new_v4().to_string(),
        name,
        is_dir,
        path: path.to_string_lossy().to_string(),
        children,
    })
}

// A new Tauri command to get the file tree as a JSON string.
#[tauri::command]
pub async fn get_file_tree_as_json() -> String {
    // Call the dialog to get the path.
    let path_option = open_folder_dialog();

    // Safely handle the Option<String> result.
    if let Some(path_str) = path_option {
        let path = PathBuf::from(&path_str);
        match build_file_tree(&path) {
            Ok(tree) => serde_json::to_string_pretty(&tree).unwrap_or_else(|e| {
                eprintln!("Failed to serialize to JSON: {}", e);
                "[]".to_string()
            }),
            Err(e) => {
                eprintln!("Error reading directory: {}", e);
                "[]".to_string()
            }
        }
    } else {
        // Return an empty JSON array if the user cancels the dialog.
        "[]".to_string()
    }
}
