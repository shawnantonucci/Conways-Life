import React, { useState } from "react";
import "./Grid.css";

const Grid = ({ grid, setGrid }) => {
  return (
    <div className="Grid-container">
      {grid.map(row => {
        return (
          <div className="Grid-row">
            {row.map(col => {
              return (
                <div className={`Grid-column ${col === 1 ? "alive" : null}`} />
              );
            })}
          </div>
        );
        return <div className="Grid-column" />;
      })}
    </div>
  );
};

export default Grid;
