import React from "react";
import "./Sidebar.css";

const Sidebar = ({ activePanel, setActivePanel }) => {
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${activePanel === "syntax" ? "active" : ""}`}
        onClick={() => setActivePanel("syntax")}
      >
        🧩
      </div>
      <div
        className={`sidebar-item ${
          activePanel === "variables" ? "active" : ""
        }`}
        onClick={() => setActivePanel("variables")}
      >
        🧠
      </div>
      <div
        className={`sidebar-item ${
          activePanel === "clipboard" ? "active" : ""
        }`}
        onClick={() => setActivePanel("clipboard")}
      >
        📋
      </div>
    </div>
  );
};

export default Sidebar;
