// components/Editor.jsx
import React, { useState, useEffect } from "react";
import { useUI } from "../context/UIContext.jsx";
import SyntaxPage from "./SyntaxPage.jsx";
import { X, Save } from "lucide-react";

/**
 * The Editor component displays and allows editing of the currently active file.
 * It also includes a tab bar for the open file and a placeholder if no file is selected.
 */
const Editor = () => {
  // Use the UIContext to access the global state.
  const { activeFile, activeView, updateFileContent } = useUI();
  const [editorContent, setEditorContent] = useState("");

  // Update the editor content state whenever the active file changes.
  useEffect(() => {
    if (activeFile) {
      setEditorContent(activeFile.content);
    }
  }, [activeFile]);

  // Handle changes in the textarea content.
  const handleContentChange = (event) => {
    setEditorContent(event.target.value);
  };

  // Handle saving the file.
  const handleSave = () => {
    if (activeFile) {
      updateFileContent(activeFile.name, editorContent);
      console.log(`File '${activeFile.name}' saved.`);
    }
  };

  // Conditional rendering for the editor content area.
  let contentArea;
  let tabName;

  if (activeView === "Explorer" && activeFile) {
    // If the active view is the file explorer, display the editable content of the active file.
    contentArea = (
      <textarea
        value={editorContent}
        onChange={handleContentChange}
        className="flex-grow w-full bg-zinc-900 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
        spellCheck="false"
      />
    );
    tabName = activeFile.name;
  } else if (activeView === "Syntax") {
    // If the active view is the syntax guide, display the SyntaxPage component.
    contentArea = <SyntaxPage />;
    tabName = "Syntax Guide";
  } else {
    // Default placeholder for other views.
    contentArea = (
      <div className="flex justify-center items-center h-full text-gray-500 text-lg font-light">
        <p>No editor selected.</p>
      </div>
    );
    tabName = "No File Selected";
  }

  return (
    <div className="flex-grow flex flex-col bg-zinc-900 overflow-hidden">
      {/* Tab Bar */}
      <div className="flex bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center space-x-2 px-4 py-2 text-xs text-gray-400 border-r border-zinc-700">
          <span className="flex-grow">{tabName}</span>
          {activeFile && activeView === "Explorer" && (
            <Save
              size={14}
              className="text-gray-500 hover:text-white cursor-pointer transition-colors"
              onClick={handleSave}
            />
          )}
          <X
            size={14}
            className="text-gray-500 hover:text-white cursor-pointer transition-colors"
          />
        </div>
      </div>
      {/* Editor Content Area */}
      <div className="flex-grow overflow-y-auto">{contentArea}</div>
    </div>
  );
};

export default Editor;
