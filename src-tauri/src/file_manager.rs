// fileManager.rs

use serde::Serialize;
use std::fs;
use std::path::{Path, PathBuf};

// This struct defines the data model for the file object.
// It matches the JSON structure expected by the React frontend.
#[derive(Serialize)]
pub struct File {
    pub id: String,
    pub name: String,
    pub is_dir: bool,
    pub path: String,
}

// A simple recursive function to build the file tree.
// It traverses the directory and collects file and directory information.
fn build_file_tree(path: &Path) -> Result<Vec<File>, std::io::Error> {
    let mut file_tree = Vec::new();
    let entries = fs::read_dir(path)?;

    for entry in entries {
        let entry = entry?;
        let file_path = entry.path();
        let file_name = file_path
            .file_name()
            .and_then(|os_str| os_str.to_str())
            .unwrap_or("unknown")
            .to_string();

        // Skip hidden files/directories starting with '.'
        if file_name.starts_with('.') {
            continue;
        }

        let is_dir = file_path.is_dir();
        let id = format!("{}", file_path.display());

        file_tree.push(File {
            id,
            name: file_name,
            is_dir,
            path: file_path.to_str().unwrap_or("").to_string(),
        });
    }

    Ok(file_tree)
}

/// A public function that reads the directory and returns a JSON string
/// representing the file tree. This function can be called from a frontend.
#[tauri::command]
pub async fn get_file_tree_as_json() -> String {
    let path = PathBuf::from("./");
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
}
