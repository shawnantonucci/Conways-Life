import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import DisplayGrid from "./components/Grid/Grid";

let running = false;

function App() {
  // ============== Hooks ============== //
  const [grid, setGrid] = useState([]);
  const [changeState, setChangeState] = useState(false); // forces change state, grid is too nested to trigger a change
  const [generation, setGenerations] = useState(-1);
  // const [running, setRunning] = useState(false);

  const refGeneration = useRef();
  refGeneration.current = generation;

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
    newGrid[row][col] == 0 ? (newGrid[row][col] = 1) : (newGrid[row][col] = 0);
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
  let timerId;

  const runGame = e => {
    running = true;
    timerId = requestAnimationFrame(rulesOfLife);
  };

  // ===== Stop Game ===== //
  const stopGameOfLife = () => {
    running = false;
    cancelAnimationFrame(timerId);
    console.log("Stopped");
  };

  const checkGeneration = () => {
    setGenerations(refGeneration.current + 1);
  };

  useEffect(() => {
    checkGeneration();
  }, [refGeneration]);

  // ===== Algorithm for game ===== //
  const rulesOfLife = () => {
    // rule1: any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // rule2: any live cell with two or three live neighbors lives on to the next generation.
    // rule3: any live cell with more than three live neighbors dies, as if by overpopulation
    // rule4: any dead cell with three live neighbors becomes a live cell, as if by reproduction.
    if (running) {
      console.log("Running");
      checkGeneration();

      for (let row = 0; row < grid.length; row++) {
        // setGenerations(generation + 1);
        // column loop
        for (let col = 0; col < grid[row].length; col++) {
          let count = numNeighbors(row, col);
          console.log("Row: ", row, "Col: ", col);
        }
      }
      requestAnimationFrame(rulesOfLife);
    } else {
      console.log("Not Running");
    }
    if (running == false) {
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
    if (row !== 0 && col === grid.length) {
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
          <button onClick={runGame}>Start!</button>
          <button onClick={stopGameOfLife}>STOP!!!</button>
        </div>
        <h2>Generations: {generation}</h2>
        {/* TODO: Make reset button */}
      </div>
    </div>
  );
}

export default App;
