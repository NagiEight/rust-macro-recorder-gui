// NodeEditor.jsx
import React, { useState, useRef, useEffect } from "react";

const NodeEditor = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 100, y: 100, label: "Start" },
    { id: 2, x: 300, y: 200, label: "Click" },
  ]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw nodes
    nodes.forEach((node) => {
      ctx.fillStyle = "#222";
      ctx.fillRect(node.x, node.y, 100, 50);
      ctx.fillStyle = "#fff";
      ctx.fillText(node.label, node.x + 10, node.y + 30);
    });

    // Draw connection (hardcoded for demo)
    ctx.beginPath();
    ctx.moveTo(nodes[0].x + 100, nodes[0].y + 25);
    ctx.lineTo(nodes[1].x, nodes[1].y + 25);
    ctx.strokeStyle = "#0f0";
    ctx.stroke();
  }, [nodes]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default NodeEditor;
