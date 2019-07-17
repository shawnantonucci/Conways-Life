import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";

import DisplayGrid from "./components/Grid/Grid";

let running = false;

function App() {
  // ============== Hooks ============== //
  const [grid, setGrid] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [generation, setGeneration] = useState(-1);
  const [interval, setInterval] = useState(null);
  const [speed, setSpeed] = useState(100);

  const refGeneration = useRef();
  refGeneration.current = generation;

  const refGrid = useRef();
  refGrid.current = grid;

  // ============== Create empty grid ============== //
  useEffect(() => {
    let arr = emptyGrid();
    setGrid(arr);
  }, []);

  // ============== Click handler to change individual cells ============== //
  const changeCell = e => {
    e.preventDefault();
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    let newGrid = grid;
    newGrid[row][col] === 0 ? (newGrid[row][col] = 1) : (newGrid[row][col] = 0);
    // console.log("CELL: ", newGrid[row][col])
    setGrid(newGrid);
    // console.log(grid)
    changeState === false ? setChangeState(true) : setChangeState(false);
  };

  const emptyGrid = (rows, col) => {
    let testArr = [];
    // Rows
    for (let i = 0; i < 15; i++) {
      testArr[i] = [];
      // Columns
      for (let j = 0; j < 15; j++) {
        // Cells
        testArr[i][j] = 0;
      }
    }
    return testArr;
  };

  // ============== Algorithm for conway's rules of life ============== //
  // ===== Start Game ===== //
  const playButton = () => {
    setInterval(speed);
  };

  // ===== Stop Game ===== //
  const pauseButton = () => {
    setInterval(null);
  };

  useInterval(() => {
    rulesOfLife();
  }, interval);

  const checkGeneration = () => {
    setGeneration(refGeneration.current + 1);
  };

  useEffect(() => {
    checkGeneration();
  }, [refGeneration]);

  // ===== Algorithm for game ===== //
  const rulesOfLife = () => {
    let tempArr = emptyGrid();
    checkGeneration();
    console.log("Running");

    if (!running) {
      for (let row = 0; row < grid.length; row++) {
        // column loop
        for (let col = 0; col < grid[row].length; col++) {
          let count = numNeighbors(row, col);

          // cell logic
          if (count < 2) {
            tempArr[row][col] = 0;
          } else if (count === 2) {
            tempArr[row][col] = grid[row][col];
          } else if (count === 3) {
            tempArr[row][col] = 1;
          } else {
            tempArr[row][col] = 0;
          }
        }
      }
      setGrid(tempArr);
      console.log(running);
      if (running) {
        return null;
      }
    }
  };

  const numNeighbors = (row, col) => {
    let count = 0;
    // top left
    if (row !== 0 && col !== 0) {
      count += grid[row - 1][col - 1];
    }
    // top
    if (row !== 0) {
      count += grid[row - 1][col];
    }
    // top right
    if (row !== 0 && col !== grid.length) {
      count += grid[row - 1][col + 1];
    }
    // left
    if (col !== 0) {
      count += grid[row][col - 1];
    }
    // right
    if (col !== grid.length) {
      count += grid[row][col + 1];
    }
    // bottom left
    if (row !== grid.length - 1 && col !== 0) {
      count += grid[row + 1][col - 1];
    }
    // bottom
    if (row !== grid.length - 1) {
      count += grid[row + 1][col];
    }
    // bottom right
    if (row !== grid.length - 1 && col !== grid.length) {
      count += grid[row + 1][col + 1];
    }
    return count;
  };

  return (
    <div className="App">
      <div className="App-header">
        <DisplayGrid grid={grid} setGrid={setGrid} changeCell={changeCell} />
        <div>
          <button onClick={playButton}>Start</button>
          <button onClick={pauseButton}>Pause</button>
        </div>
        <h2>Generations: {generation}</h2>
      </div>
    </div>
  );
}

export default App;
