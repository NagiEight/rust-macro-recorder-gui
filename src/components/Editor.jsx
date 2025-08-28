// components/Editor.jsx
import React from "react";
import { useUI } from "../context/UIContext";
import { X } from "lucide-react";

// The Editor component displays the content of the active file.
// It uses the useUI hook to get the activeFile and the getFileContent function.
const Editor = () => {
  const { activeFile, getFileContent } = useUI();

  return (
    <div className="flex flex-col flex-grow bg-zinc-900">
      {/* Tab Bar */}
      <div className="flex items-center bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center px-4 py-2 border-r border-zinc-700 bg-zinc-900 text-white rounded-tr-md">
          <span className="text-sm font-medium">{activeFile.name}</span>
          <X
            size={14}
            className="ml-2 text-gray-400 hover:text-white cursor-pointer"
          />
        </div>
        <div className="flex-grow"></div>
      </div>

      {/* Code Editor */}
      <div className="flex-grow p-4 overflow-auto">
        <pre className="text-sm font-mono leading-relaxed select-none">
          <code className="whitespace-pre-wrap">
            {getFileContent(activeFile.name)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Editor;
