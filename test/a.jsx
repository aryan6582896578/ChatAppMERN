import React, { useState, useEffect } from "react";

// This is a comment to test comment coloring
const SampleComponent = ({ title, isActive }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={isActive ? "active-container" : "container"}>
      {/* JSX Comment Example */}
      <h1>{title}</h1>
      <p style={{ color: "blue", fontSize: "16px" }}>This is a paragraph.</p>
      <button onClick={handleClick}>Click me ({count})</button>
      <span data-testid="sample-span">Span Text</span>
      {isActive && <strong>Active!</strong>}
    </div>
  );
};

export default SampleComponent;