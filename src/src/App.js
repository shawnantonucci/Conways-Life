import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";

import DisplayGrid from "./components/Grid/Grid";

let running = false;

function App() {
  // ============== Hooks ============== //
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(30);
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

  useEffect(() => {
    let arr = emptyGrid();
    setGrid(arr);
  }, [gridSize]);

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
    for (let i = 0; i < gridSize; i++) {
      testArr[i] = [];
      // Columns
      for (let j = 0; j < gridSize; j++) {
        // Cells
        testArr[i][j] = 0;
      }
    }
    return testArr;
  };

  const presetLine = () => {
    let tempArr = emptyGrid();
    const center = parseInt(tempArr.length / 2);
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][parseInt(tempArr.length / 2)] = 1;
    }
    tempArr[center][center - 1] = 1;
    tempArr[center][center + 1] = 1;

    tempArr[center][center - 1] = 1;
    tempArr[center][center + 1] = 1;

    setGrid(tempArr);
  };

  const presetCross = () => {
    let tempArr = emptyGrid();
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][parseInt(tempArr.length / 2)] = 1;
      tempArr[parseInt(tempArr.length / 2)][i] = 1;
    }
    setGrid(tempArr);
  };

  const presetFlower = () => {
    let tempArr = emptyGrid();
    const center = parseInt(tempArr.length / 2);

    tempArr[center][center] = 1;
    // change above
    tempArr[center - 2][center] = 1;
    tempArr[center - 2][center - 1] = 1;
    tempArr[center - 2][center + 1] = 1;
    // change below
    tempArr[center + 2][center] = 1;
    tempArr[center + 2][center - 1] = 1;
    tempArr[center + 2][center + 1] = 1;
    setGrid(tempArr);
  };

  const presetPlus = () => {
    let tempArr = emptyGrid();
    const center = parseInt(tempArr.length / 2);

    tempArr[center][center] = 1;
    // change above
    tempArr[center - 1][center] = 1;
    tempArr[center][center + 1] = 1;
    tempArr[center][center - 1] = 1;
    // change below
    tempArr[center + 1][center] = 1;
    setGrid(tempArr);
  };

  const clear = () => {
    let tempArr = emptyGrid();
    setGrid(tempArr);
    setGeneration(0);
    setInterval(null);
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
    if (row !== 0 && col !== 0) {
      // check top left
      count += grid[row - 1][col - 1];
    }

    if (row !== 0) {
      // check top
      count += grid[row - 1][col];
    }

    if (row !== 0 && col !== grid.length - 1) {
      // check top right
      count += grid[row - 1][col + 1];
    }

    if (col !== 0) {
      // check left
      count += grid[row][col - 1];
    }

    if (col !== grid.length - 1) {
      // check right
      count += grid[row][col + 1];
    }

    if (row !== grid.length - 1 && col !== 0) {
      // check bottom left
      count += grid[row + 1][col - 1];
    }
    // check bottom
    if (row !== grid.length - 1) {
      count += grid[row + 1][col];
    }
    // check bottom right
    if (row !== grid.length - 1 && col !== grid.length - 1) {
      count += grid[row + 1][col + 1];
    }
    return count;
  };

  const handleOnChange = e => {
    setSpeed(e.target.value);
  };

  const handleGridSize = e => {
    setGridSize(e.target.value);
  };

  return (
    <div className="App">
      <div className="App-header">
        <DisplayGrid grid={grid} setGrid={setGrid} changeCell={changeCell} />
        <div>
          <button onClick={playButton}>Start</button>
          <button onClick={pauseButton}>Pause</button>
          <button onClick={clear}>Clear</button>
          <input type="number" value={speed} onChange={handleOnChange} />
          <input type="number" value={gridSize} onChange={handleGridSize} />
        </div>
        <div>
          <button onClick={presetLine}>Center Line</button>
          <button onClick={presetFlower}>Flower</button>
          <button onClick={presetCross}>Cross</button>
          <button onClick={presetPlus}>Plus</button>
        </div>
        <h2>Generations: {generation}</h2>
      </div>
    </div>
  );
}

export default App;
