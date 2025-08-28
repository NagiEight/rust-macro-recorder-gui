// App.jsx
import React from "react";
import { UIProvider, useUI } from "../context/UIContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Editor from "../components/Editor.jsx";
import { Code, X, GitPullRequest, Settings } from "lucide-react";
import { sidePageIndex } from "../data/sidePageIndex.js";
import { getIconComponent } from "../utils/componentMappings.jsx";

const MainApp = () => {
  const { activeFile, activeView, setActiveView } = useUI();

  return (
    <div className="bg-zinc-900 text-gray-300 w-full h-screen font-inter overflow-hidden">
      {/* Top Bar */}
      <header className="bg-zinc-800 flex items-center justify-between px-3 py-1.5 shadow-md">
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <span className="text-blue-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2ZM2 3V13H14V3H2Z"
                fill="currentColor"
              ></path>
              <path
                d="M3 5H13V6H3V5ZM3 8H13V9H3V8ZM3 11H13V12H3V11Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span className="text-gray-400">File</span>
          <span className="text-gray-400">Edit</span>
          <span className="text-gray-400">Selection</span>
          <span className="text-gray-400">View</span>
          <span className="text-gray-400">Go</span>
          <span className="text-gray-400">Run</span>
          <span className="text-gray-400">Terminal</span>
          <span className="text-gray-400">Help</span>
        </div>
        <div className="text-white text-sm font-semibold">
          {activeFile.name} - my-vscode-app - Visual Studio Code
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex h-[calc(100vh-3rem)]">
        {/* Activity Bar */}
        <aside className="bg-zinc-800 w-12 flex flex-col justify-between items-center py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {sidePageIndex.map((page, index) => {
              const IconComponent = getIconComponent(page.icon);
              return (
                <div
                  key={index}
                  className={`cursor-pointer transition-colors ${
                    activeView === page.view
                      ? "text-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveView(page.view)}
                >
                  {IconComponent}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col space-y-4">
            <Settings
              size={24}
              className="text-gray-400 cursor-pointer hover:text-white transition-colors"
            />
          </div>
        </aside>

        {/* Sidebar and Editor Area */}
        <main className="flex flex-grow overflow-hidden">
          <Sidebar />
          <Editor />
        </main>
      </div>

      {/* Status Bar */}
      <footer className="bg-blue-600 text-white flex items-center justify-between px-4 py-1.5 shadow-inner">
        <div className="flex items-center space-x-4">
          <span className="text-sm">
            <Code size={16} className="inline-block mr-1" />
            main
          </span>
          <span className="text-sm">
            <GitPullRequest size={16} className="inline-block mr-1" />
            Git
          </span>
          <span className="text-sm">
            <X size={16} className="inline-block mr-1" />0 errors, 0 warnings
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Ln 1, Col 1</span>
          <span className="text-sm">Spaces: 2</span>
          <span className="text-sm">UTF-8</span>
          <span className="text-sm">LF</span>
          <span className="text-sm">React JSX</span>
        </div>
      </footer>
    </div>
  );
};

// The main component wrapped in the provider
const App = () => (
  <UIProvider>
    <MainApp />
  </UIProvider>
);

export default App;
