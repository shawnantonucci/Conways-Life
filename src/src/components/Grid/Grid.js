import React, { useState, useEffect } from "react";
import "./Grid.css";

function DisplayGrid({ grid, setGrid, changeCell }) {
  // function changeCell(e) {
  //     e.preventDefault()
  //     const row = e.target.dataset.row;
  //     const col = e.target.dataset.col;
  //     let newGrid = grid;
  //     newGrid[row][col] == 0 ? newGrid[row][col] = 1 : newGrid[row][col] = 0
  //     console.log("CELL: ", newGrid[row][col])
  //     setGrid(newGrid)
  // }

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
