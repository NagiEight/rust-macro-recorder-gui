import React from "react";
import SyntaxPanel from "./SyntaxPanel";
import VariablePanel from "./VariablePanel";
import ClipboardPanel from "./ClipboardPanel";

const PanelSwitcher = ({ activePanel }) => {
  switch (activePanel) {
    case "syntax":
      return <SyntaxPanel />;
    case "variables":
      return <VariablePanel />;
    case "clipboard":
      return <ClipboardPanel />;
    default:
      return null;
  }
};

export default PanelSwitcher;
