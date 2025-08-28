// utils/iconMappings.js
import React from "react";
import { Folder, Sparkles, Code, Settings } from "lucide-react";

// A mapping of icon names to their corresponding Lucide React components.
// This list is limited to only the icons used in the app to reduce clutter.
const iconComponents = {
  Folder,
  Sparkles,
  Code,
  Settings,
};

/**
 * Retrieves the appropriate Lucide React icon component based on its name.
 * @param {string} iconName The name of the icon to retrieve.
 * @returns {React.Component|null} The icon component or null if not found.
 */
export const getIconComponent = (iconName) => {
  const Icon = iconComponents[iconName];
  // We return the component here, and the parent component will handle the size.
  return Icon ? <Icon size={24} /> : null;
};
