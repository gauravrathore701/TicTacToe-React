import React from "react";

const Square = ({ value, onClick, isWinning, isRemoved, disabled }) => {
  return (
    <div
      onClick={disabled && !value ? undefined : onClick}
      className={`square ${value ? "filled" : "empty"} ${isWinning ? "winning" : ""} ${isRemoved ? "removed" : ""} ${value === "X" ? "x-val" : value === "O" ? "o-val" : ""}`}
    >
      <span className="square-text">{value}</span>
    </div>
  );
};

export default Square;
