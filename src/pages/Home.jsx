// App.jsx
import React from "react";
import { UIProvider, useUI } from "../context/UIContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Editor from "../components/Editor.jsx";
import { Settings } from "lucide-react";
import { sidePageIndex } from "../data/sidePageIndex.js";
import { getIconComponent } from "../utils/componentMappings.jsx";
import TopMenu from "../components/TopMenu.jsx";
import SearchBar from "../components/SearchBar.jsx"; // Import the new SearchBar component
import StatusBar from "../components/StatusBar.jsx";

const MainApp = () => {
  const { activeFile, activeView, setActiveView } = useUI();

  return (
    <div className="bg-zinc-900 text-gray-300 w-full h-screen font-inter overflow-hidden">
      {/* Top Bar */}
      <header className="bg-zinc-800 flex items-center justify-between px-3 py-1.5 shadow-md">
        <TopMenu />

        {/* Search Bar */}
        <SearchBar />

        <div className="text-white text-sm font-semibold flex-shrink-0">
          {activeFile.name} - my-vscode-app - Visual Studio Code
        </div>
        <div className="flex space-x-2 flex-shrink-0 ml-4">
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
      <StatusBar></StatusBar>
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
