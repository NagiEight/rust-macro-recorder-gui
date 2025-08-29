import React, { useState } from "react";
import {
  File,
  Folder,
  ChevronRight,
  ChevronDown,
  Loader2,
  XCircle,
} from "lucide-react";
import { invoke } from "@tauri-apps/api/core";

// Helper component for recursive file tree rendering
const FileTree = ({ tree, handleFileClick }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const handleFolderToggle = (file) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [file.id]: !prev[file.id],
    }));
  };

  return (
    <div className="flex flex-col">
      {tree.children &&
        tree.children.map((file) => (
          <div key={file.id}>
            <div
              className="flex items-center space-x-1 cursor-pointer py-1 px-2 rounded-md transition-colors hover:bg-zinc-700"
              onClick={() => {
                if (file.is_dir) {
                  handleFolderToggle(file);
                } else {
                  handleFileClick(file);
                }
              }}
            >
              <div className="w-4 flex-shrink-0">
                {file.is_dir ? (
                  expandedFolders[file.id] ? (
                    <ChevronDown size={14} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-500" />
                  )
                ) : (
                  <div className="w-4"></div>
                )}
              </div>
              {file.is_dir ? (
                <Folder size={16} className="text-yellow-400 flex-shrink-0" />
              ) : (
                <File size={16} className="text-blue-400 flex-shrink-0" />
              )}
              <span className="truncate">{file.name}</span>
            </div>
            {file.is_dir && expandedFolders[file.id] && file.children && (
              <div className="pl-6">
                <FileTree tree={file} handleFileClick={handleFileClick} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

const ExplorerPage = () => {
  const [fileTree, setFileTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  const handleFileClick = (file) => {
    setActiveFile(file);
    console.log(`File selected: ${file.name}`);
    // Add your logic for opening or handling the file here.
  };

  const openFolder = async () => {
    try {
      setLoading(true);
      setError(null);
      const treeJson = await invoke("get_file_tree_as_json");
      const parsedTree = JSON.parse(treeJson);

      // Check if the parsed tree is valid (not empty from a user-cancelecd dialog)
      if (parsedTree && parsedTree.children) {
        setFileTree(parsedTree);
      } else {
        setFileTree(null); // Clear the tree if no folder was selected
      }
    } catch (e) {
      setError(
        "Failed to fetch file tree. Please check the Tauri command and permissions."
      );
      console.error("Error fetching file tree:", e);
    } finally {
      setLoading(false);
    }
  };

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
  } else if (fileTree) {
    content = (
      <div className="flex flex-col">
        <FileTree tree={fileTree} handleFileClick={handleFileClick} />
      </div>
    );
  } else {
    content = (
      <div className="flex justify-center items-center text-gray-500">
        <span>Click "Open Folder" to get started.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 text-sm">
      <div className="flex items-center justify-between font-bold text-xs text-gray-500 mb-2">
        <span>EXPLORER</span>
        <button
          onClick={openFolder}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-md transition-colors text-xs"
        >
          Open Folder
        </button>
      </div>
      {content}
    </div>
  );
};

export default ExplorerPage;
