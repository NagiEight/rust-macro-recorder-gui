// components/Sidebar.jsx
import React from "react";
import { useUI } from "../context/UIContext";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

// The Sidebar component is responsible for rendering the file tree.
// It now gets all its state and handlers from the custom useUI hook.
const Sidebar = () => {
  const { activeFile, activeFolder, setActiveFile, setActiveFolder, fileTree } =
    useUI();

  // Recursive function to render the file tree.
  const renderFileTree = (items, path = "") => {
    return Object.entries(items).map(([name, content]) => {
      const fullPath = `${path}/${name}`;
      const isFolder = typeof content === "object";
      const isOpen = isFolder && activeFolder.startsWith(fullPath);
      const isActive = !isFolder && activeFile.name === name;

      const handleFolderClick = () => {
        setActiveFolder(isOpen ? "" : fullPath);
      };

      const handleFileClick = () => {
        setActiveFile({ name: name, content: content });
      };

      return (
        <div key={fullPath} className="pl-4">
          <div
            className={`flex items-center space-x-2 py-1 cursor-pointer transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white font-medium"
                : "hover:bg-zinc-700"
            }`}
            onClick={isFolder ? handleFolderClick : handleFileClick}
          >
            {isFolder ? (
              isOpen ? (
                <ChevronDown size={14} className="flex-shrink-0" />
              ) : (
                <ChevronRight size={14} className="flex-shrink-0" />
              )
            ) : (
              <File size={14} className="flex-shrink-0" />
            )}
            <span
              className={`text-sm select-none ${isFolder ? "font-medium" : ""}`}
            >
              {name}
            </span>
          </div>
          {isFolder && isOpen && (
            <div className="border-l border-zinc-700 ml-2">
              {renderFileTree(content, fullPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <section className="bg-zinc-800 w-64 p-4 flex flex-col shadow-lg overflow-y-auto">
      <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase">
        Explorer
      </h2>
      <div className="text-gray-400 text-sm">{renderFileTree(fileTree)}</div>
    </section>
  );
};

export default Sidebar;
