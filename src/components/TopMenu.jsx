// components/TopMenu.jsx
import React, { useState } from "react";

/**
 * The TopMenu component renders the application's main menu bar with dropdown functionality.
 */
const TopMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  // Define the menu structure, including submenus.
  const topMenuItems = [
    {
      label: "File",
      submenu: [
        { label: "New File", action: "new-file" },
        { label: "Open File...", action: "open-file" },
        { label: "Save", action: "save" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", action: "undo" },
        { label: "Redo", action: "redo" },
        { label: "Cut", action: "cut" },
        { label: "Copy", action: "copy" },
      ],
    },
    { label: "Selection" },
    {
      label: "View",
      submenu: [
        { label: "Explorer", action: "show-explorer" },
        { label: "Search", action: "show-search" },
      ],
    },
    { label: "Go" },
    { label: "Run" },
    { label: "Terminal" },
    { label: "Help" },
  ];

  const handleMenuItemClick = (menuItem) => {
    // Toggle the open menu. If the same menu is clicked, close it.
    // Otherwise, open the new one.
    setOpenMenu(openMenu === menuItem.label ? null : menuItem.label);
  };

  const handleSubmenuItemClick = (action) => {
    console.log(`Action: ${action}`);
    setOpenMenu(null); // Close the menu after an item is clicked.
  };

  return (
    <div className="flex items-center space-x-4 text-xs font-semibold relative">
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
      {topMenuItems.map((item, index) => (
        <div key={index} className="relative">
          <span
            className="text-gray-400 cursor-pointer hover:text-white transition-colors"
            onClick={() => handleMenuItemClick(item)}
          >
            {item.label}
          </span>
          {item.submenu && openMenu === item.label && (
            <div
              className="absolute top-full left-0 mt-1 bg-zinc-800 rounded shadow-md z-10"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.submenu.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="px-3 py-1 text-gray-400 hover:bg-blue-600 hover:text-white cursor-pointer"
                  onClick={() => handleSubmenuItemClick(subItem.action)}
                >
                  {subItem.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopMenu;
