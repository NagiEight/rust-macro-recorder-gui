// utils/componentMappings.jsx
import React from "react";
import {
  Folder,
  Sparkles,
  Code,
  Settings,
  Search,
  GitPullRequest,
  Bug,
  MonitorCheck,
  FlaskConical,
  MousePointer2,
  Clock,
  Layout,
} from "lucide-react";
import ExplorerPage from "../components/ExplorerPage.jsx";
import SyntaxSidePage from "../components/SyntaxSidePage.jsx";
import GraphSidePage from "../components/GraphSidePage.jsx";

/**
 * A centralized mapping of icon names to their Lucide React components.
 * This makes it easy to add or remove icons without changing core components.
 */
export const iconComponents = {
  Search,
  Code,
  GitPullRequest,
  Bug,
  MonitorCheck,
  Folder,
  Sparkles,
  Settings,
  FlaskConical,
  MousePointer2,
  Clock,
  Layout,
};

/**
 * A centralized mapping of view names to their corresponding components.
 * This allows the Sidebar to dynamically render the correct page based on the
 * active view, without needing to be manually updated.
 */
export const viewComponents = {
  Explorer: ExplorerPage,
  Syntax: SyntaxSidePage,
  Graph: GraphSidePage,
};

/**
 * Retrieves the appropriate Lucide React icon component based on its name.
 * @param {string} iconName The name of the icon to retrieve.
 * @returns {React.Component|null} The icon component or null if not found.
 */
export const getIconComponent = (iconName) => {
  const Icon = iconComponents[iconName];
  return Icon ? <Icon size={24} /> : null;
};
