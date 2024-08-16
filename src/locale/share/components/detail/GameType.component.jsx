import React from "react";

const GameTypeButton = ({ gameType, onClick }) => {
  return (
    <span
      className="bg-blue-600 text-white py-1 px-3 rounded-lg cursor-pointer hover:bg-blue-700 transition"
      onClick={() => onClick(gameType)}
    >
      {gameType.name}
    </span>
  );
};

export default GameTypeButton;
