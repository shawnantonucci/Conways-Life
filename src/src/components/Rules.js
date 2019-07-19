import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <div>
      <h2 style={{ textDecorationLine: "underline" }}>Rules</h2>
      <ul>
        <li className="list">
          Any live cell with fewer than two live neighbors dies, as if by
          underpopulation.
        </li>
        <li className="list">
          Any live cell with two or three live neighbors lives on to the next
          generation.
        </li>
        <li className="list">
          Any live cell with more than three live neighbors dies, as if by
          overpopulation.
        </li>
        <li className="list">
          Any dead cell with three live neighbors becomes a live cell, as if by
          reproduction.
        </li>
      </ul>
    </div>
  );
};

export default Rules;
