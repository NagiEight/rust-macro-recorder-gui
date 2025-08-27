import React, { useState } from "react";
import Sidebar from "./Sidebar";
import PanelSwitcher from "./PanelSwitcher";

const MacroEditorPage = () => {
  const [activePanel, setActivePanel] = useState("syntax");
  const [code, setCode] = useState("");

  const insertText = (text) => {
    setCode((prev) => prev + (prev ? "\n" : "") + text);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <PanelSwitcher activePanel={activePanel} insertText={insertText} />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          flex: 1,
          backgroundColor: "#111",
          color: "#00ff00",
          fontFamily: "monospace",
          padding: "16px",
          border: "none",
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default MacroEditorPage;
