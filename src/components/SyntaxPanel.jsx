import React from "react";

const syntaxTags = [
  'onKeyPress "Ctrl+Shift+M"',
  'openApp "Notepad"',
  'typeText "Hello, world!"',
  "wait 500ms",
];

const SyntaxPanel = ({ insertText }) => (
  <div style={{ padding: "16px" }}>
    <h3>Syntax Tags</h3>
    {syntaxTags.map((tag, i) => (
      <div
        key={i}
        onClick={() => insertText(tag)}
        style={{ cursor: "pointer", marginBottom: "8px" }}
      >
        {tag}
      </div>
    ))}
  </div>
);

export default SyntaxPanel;
