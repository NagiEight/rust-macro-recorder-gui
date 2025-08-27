import React from "react";
import "./ModernNode.css";

const ModernNode = ({
  label = "Action Node",
  variable = "value",
  x = 100,
  y = 100,
}) => {
  return (
    <div className="modern-node" style={{ left: x, top: y }}>
      <div className="connector input" />
      <div className="node-content">
        <div className="node-title">{label}</div>
        <div className="node-variable">
          <label>Variable</label>
          <input type="text" defaultValue={variable} />
        </div>
      </div>
      <div className="connector output" />
    </div>
  );
};

export default ModernNode;
