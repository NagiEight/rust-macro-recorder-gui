import React, { useState } from "react";
import "./ClickOutline.css";

const ClickWhiteCircle = () => {
  const [circles, setCircles] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setCircles([...circles, { x, y, id }]);

    setTimeout(() => {
      setCircles((prev) => prev.filter((c) => c.id !== id));
    }, 1000); // Fade out after 1s
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 w-screen h-screen absolute"
    >
      <svg width="100%" height="100%">
        {circles.map((circle) => (
          <circle
            key={circle.id}
            cx={circle.x}
            cy={circle.y}
            r="0"
            className="white-circle"
          />
        ))}
      </svg>
    </div>
  );
};

export default ClickWhiteCircle;
