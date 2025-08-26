import React, { useState } from "react";
import '../styles/expandable-text.css';

export const ExpandableText = ({ text, limit = 50 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const visibleText = expanded || !isLong ? text : text.slice(0, limit) + "…";

  return (
    <div className="expandable-text">
      <p>{visibleText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="expandable-text__btn"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};
