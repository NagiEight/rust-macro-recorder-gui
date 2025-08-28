// components/Sidebar.jsx
import React from "react";
import { useUI } from "../context/UIContext.jsx";
import { viewComponents } from "../utils/componentMappings.jsx";

/**
 * The main Sidebar component is responsible for rendering the correct page.
 * It dynamically selects and renders a component based on the active view
 * stored in the global UI context.
 */
const Sidebar = () => {
  const { activeView } = useUI();
  // Get the component from our mapping, defaulting to null if not found.
  const CurrentPage = viewComponents[activeView] || null;

  return (
    <section className="bg-zinc-800 w-64 p-4 flex flex-col shadow-lg overflow-y-auto">
      {/* Conditionally render the selected page. */}
      {CurrentPage ? (
        <CurrentPage />
      ) : (
        <div className="text-gray-400 text-sm p-4">
          Select a view from the activity bar.
        </div>
      )}
    </section>
  );
};

export default Sidebar;
