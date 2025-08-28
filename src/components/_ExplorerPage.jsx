// components/ExplorerPage.jsx
import React, { useState, useEffect } from "react";
import { useUI } from "../context/UIContext.jsx";
import { ChevronRight, File, Loader2, XCircle } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
/**
 * The ExplorerPage component fetches the file tree from a standalone Rust backend
 * and displays it. It handles loading and error states and allows the user
 * to select files.
 */
const ExplorerPage = () => {
  const { activeFile, setActiveFile } = useUI();
  const [fileTree, setFileTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the file tree from the Rust backend using a standard fetch API call.
   * This assumes a Rust server is running and serving a JSON file tree at
   * a specific endpoint (e.g., http://localhost:8080/file-tree).
   */
  // useEffect hook to call the Tauri command when the component mounts.
  // useEffect hook to call the Tauri command when the component mounts.
  useEffect(() => {
    async function fetchFileTree() {
      try {
        setLoading(true);
        // The invoke function calls the Rust command by its name.
        // The return value is the JSON string which is then parsed.
        const treeJson = await invoke("get_file_tree_as_json");
        const parsedTree = JSON.parse(treeJson);
        setFileTree(parsedTree);
      } catch (e) {
        // Handle any errors from the Rust command or JSON parsing.
        setError(
          "Failed to fetch file tree. Please check the Tauri command and permissions."
        );
        console.error("Error fetching file tree:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchFileTree();
  }, []); // Empty dependency array ensures this runs only once on mount.

  /**
   * Handles the click event on a file.
   * Sets the clicked file as the active file in the global state.
   * @param {object} file The file object that was clicked.
   */
  const handleFileClick = (file) => {
    setActiveFile(file);
  };

  // Render different content based on the state.
  let content;
  if (loading) {
    content = (
      <div className="flex justify-center items-center h-full text-gray-500">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading files...</span>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-col justify-center items-center h-full text-red-400">
        <XCircle className="mb-2" size={24} />
        <span>{error}</span>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col">
        {fileTree.map((file) => (
          <div
            key={file.id}
            className={`flex items-center space-x-1 cursor-pointer py-1 px-2 rounded-md transition-colors
                        ${
                          activeFile && activeFile.id === file.id
                            ? "bg-zinc-700 text-white"
                            : "hover:bg-zinc-700"
                        }`}
            onClick={() => handleFileClick(file)}
          >
            <ChevronRight size={14} className="text-gray-500" />
            <File size={16} className="text-blue-400 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 text-sm">
      <div className="flex items-center justify-between font-bold text-xs text-gray-500 mb-2">
        <span>EXPLORER</span>
      </div>
      {content}
    </div>
  );
};

export default ExplorerPage;
