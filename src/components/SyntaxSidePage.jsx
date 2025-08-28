// components/syntaxSidePage.jsx
import React, { useState } from "react";
import { useUI } from "../context/UIContext.jsx";
import {
  FlaskConical,
  MousePointer2,
  Clock,
  Folder,
  Layout,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

/**
 * A page component that displays a collapsible list of syntax examples.
 * It dynamically renders icons and syntax items based on data from the UIContext.
 */
const SyntaxSidePage = () => {
  // Access the syntax data from the global UI context.
  const { syntaxData } = useUI();
  // State to track which syntax category is currently open.
  const [openCategory, setOpenCategory] = useState(null);

  /**
   * Toggles the visibility of a syntax category.
   * @param {string} category The name of the category to toggle.
   */
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  /**
   * Returns the appropriate Lucide React icon for a given category.
   * @param {string} category The name of the category.
   * @returns {React.Component|null} The icon component.
   */
  const getIcon = (category) => {
    switch (category) {
      case "Logic & Flow Control":
        return <FlaskConical size={14} className="flex-shrink-0" />;
      case "Mouse & Keyboard Actions":
        return <MousePointer2 size={14} className="flex-shrink-0" />;
      case "Timing & Delays":
        return <Clock size={14} className="flex-shrink-0" />;
      case "File & System Operations":
        return <Folder size={14} className="flex-shrink-0" />;
      case "UI & Screen Interaction":
        return <Layout size={14} className="flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 text-gray-300">
      <h2 className="text-xs font-bold text-gray-500 uppercase mb-2">
        Syntax Reference
      </h2>
      {/* Map over the syntax data to create collapsible categories. */}
      {Object.entries(syntaxData).map(([category, items]) => (
        <div key={category} className="my-2">
          <div
            className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-zinc-700 rounded-md transition-colors"
            onClick={() => toggleCategory(category)}
          >
            {/* Show different chevron icons based on the open state. */}
            {openCategory === category ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
            {getIcon(category)}
            <span className="text-sm font-medium">{category}</span>
          </div>
          {/* Only render the list if the category is open. */}
          {openCategory === category && (
            <ul className="pl-6 pt-1">
              {items.map((item, index) => (
                <li key={index} className="text-xs py-0.5 text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SyntaxSidePage;
