// components/ExplorerPage.jsx
import React from "react";
import { useUI } from "../context/UIContext.jsx";
import { File, ChevronRight, ChevronDown } from "lucide-react";

/**
 * The Explorer page component, responsible for displaying the file tree.
 * This component was moved here to keep the main Sidebar component clean
 * and to centralize all view components in one place for dynamic rendering.
 */
const ExplorerPage = () => {
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
    <>
      <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase">
        Explorer
      </h2>
      <div className="text-gray-400 text-sm">{renderFileTree(fileTree)}</div>
    </>
  );
};

export default ExplorerPage;
