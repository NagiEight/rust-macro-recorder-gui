import React, { useState, useEffect } from "react";

const HalftoneDonutClickEased = ({
  w = 800,
  h = 600,
  gridSize = 7,
  initialInner = 1,
  initialOuter = 5,
  maxOuter = 200,
  bg = "#0D0D0D",
  baseStep = 10,
  innerStep = 7,
  interval = 30,
}) => {
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setBursts([
      ...bursts,
      { x, y, id, inner: initialInner, outer: initialOuter },
    ]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBursts((prev) =>
        prev
          .map((b) => {
            const outerStep = baseStep * (1 - b.outer / maxOuter);
            return {
              ...b,
              inner: b.inner + innerStep,
              outer: b.outer + outerStep,
            };
          })
          .filter((b) => b.inner < b.outer)
      );
    }, interval);
    return () => clearInterval(timer);
  }, [baseStep, innerStep, interval, maxOuter]);

  const renderBurst = ({ x, y, id, inner, outer }) => {
    const dots = [];
    const cols = Math.ceil((outer * 2) / gridSize);
    const rows = cols;

    for (let i = -cols / 2; i < cols / 2; i++) {
      for (let j = -rows / 2; j < rows / 2; j++) {
        const dx = i * gridSize;
        const dy = j * gridSize;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist >= inner && dist <= outer) {
          const size = 1 + (1 - (dist - inner) / (outer - inner)) * 4;
          dots.push(
            <circle
              key={`${id}-${i}-${j}`}
              cx={x + dx}
              cy={y + dy}
              r={size}
              fill="#ffffff"
            />
          );
        }
      }
    }

    return dots;
  };

  return (
    <div
      style={{
        width: w,
        height: h,
        background: bg,
        position: "relative",
        overflow: "hidden",
        cursor: "crosshair",
      }}
      onClick={handleClick}
    >
      <svg
        width={w}
        height={h}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {bursts.map((burst) => renderBurst(burst))}
      </svg>
    </div>
  );
};

export default HalftoneDonutClickEased;
