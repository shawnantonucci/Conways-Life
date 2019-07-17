import React from "react";
import "./Grid.css";

function DisplayGrid({ grid, setGrid, changeCell }) {
  return (
    <div className="Grid-container">
      {grid.map((row, rowIndex) => {
        return (
          <div className="Grid-row" key={`${rowIndex}`}>
            {row.map((col, colIndex) => {
              return (
                <div
                  onClick={e => changeCell(e)}
                  className={`Grid-column ${col === 1 ? "alive" : ""}`}
                  data-col={`${colIndex}`}
                  data-row={`${rowIndex}`}
                  key={`${colIndex}${rowIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayGrid;
