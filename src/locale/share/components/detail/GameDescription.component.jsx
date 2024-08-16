import React, { useState } from "react";

const GameDescription = ({ description = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMoreClick = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`game-description ${isExpanded ? "expanded" : ""}`}>
      <p className="text-gray-400">
        {isExpanded ? description : `${description.slice(0, 180)}...`}
      </p>
      <a href="#" className="show-more-link" onClick={handleShowMoreClick}>
        {isExpanded ? "Show Less" : "Show More"}
      </a>
    </div>
  );
};

export default GameDescription;
