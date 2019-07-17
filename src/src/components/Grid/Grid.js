import React, { useState } from "react";
import "./Grid.css";

const Grid = ({ grid, setGrid, changeState, setChangeState }) => {
  const changeCell = e => {
    e.preventDefault();
    let col = e.target.dataset.col;
    let row = e.target.dataset.row;
    // console.log(col, "From col");
    // console.log(row, "From row");
    let newGrid = grid;
    // newGrid[row][col];
    console.log(newGrid[row][col], "Old Grid");
    newGrid[row][col] == 0 ? (newGrid[row][col] = 1) : (newGrid[row][col] = 0);
    console.log(newGrid[row][col], "New Grid");
    setGrid(newGrid);
    if (changeState === false) {
      setChangeState(true);
    } else {
      setChangeState(false);
    }
  };

  return (
    <div className="Grid-container">
      {grid.map((row, rowIndex) => {
        return (
          <div key={`${rowIndex}`} className="Grid-row">
            {row.map((col, colIndex) => {
              return (
                <div
                  onClick={e => changeCell(e)}
                  className={`Grid-column ${col === 1 ? "alive" : null}`}
                  data-col={`${colIndex}`}
                  data-row={`${rowIndex}`}
                  key={`${colIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
