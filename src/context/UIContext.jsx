// context/UIContext.jsx
import React, { useState, createContext, useContext } from "react";
import { fileTree } from "../data/fileTree.js";
import { syntaxData } from "../data/syntaxData.js";
import { sidePageIndex } from "../data/sidePageIndex.js";

// 1. Define and export a Context for global state.
const UIContext = createContext();

// 2. Create and export a provider component.
export const UIProvider = ({ children }) => {
  const [activeFile, setActiveFile] = useState({
    name: "App.jsx",
    content: fileTree["my-vscode-app"]["src"]["App.jsx"],
  });
  // 'Explorer' or 'Syntax'
  const [activeView, setActiveView] = useState("Explorer");
  const [activeFolder, setActiveFolder] = useState("src");

  // Helper function to get file content based on file name.
  // This is a recursive function that searches the file tree.
  const getFileContent = (fileName) => {
    const findFile = (items) => {
      for (const [name, content] of Object.entries(items)) {
        if (name === fileName && typeof content === "string") {
          return content;
        }
        if (typeof content === "object") {
          const found = findFile(content);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };
    return findFile(fileTree);
  };

  // The value object contains all the state and functions to be shared.
  const value = {
    activeFile,
    activeView,
    activeFolder,
    setActiveFile,
    setActiveView,
    setActiveFolder,
    fileTree,
    syntaxData,
    sidePageIndex,
    getFileContent,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// 3. Export a custom hook for easy access to the context.
export const useUI = () => {
  return useContext(UIContext);
};
