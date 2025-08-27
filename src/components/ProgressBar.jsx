import React from "react";

const AsciiProgressBar = ({
  progress = 0,
  totalBlocks = 20,
  label = "Progress",
}) => {
  const clamped = Math.max(0, Math.min(progress, 100));
  const filled = Math.round((clamped / 100) * totalBlocks);
  const empty = totalBlocks - filled;

  const bar = "■".repeat(filled) + "/".repeat(empty);

  return (
    <div
      style={{
        fontFamily: "monospace",
        color: "#ffffffff",
        backgroundColor: "#000",
        padding: "8px",
        fontSize: "16px",
        letterSpacing: "1px",
      }}
    >
      {label}: [{bar}] {clamped}%
    </div>
  );
};

export default AsciiProgressBar;
